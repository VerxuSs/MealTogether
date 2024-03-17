import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const events = await prisma.event.findMany({
    where: {
      participants: {
        some: {
          user: {
            id: identity.user,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      slots: true,
      authorId: true,
      startDate: true,
      _count: {
        select: {
          participants: true,
        },
      },
    },
  })

  return response.send(
    events.map((event) => ({
      id: event.id,
      name: event.name,
      slots: event.slots,
      authorId: event.authorId,
      startDate: event.startDate.getTime(),
      participants: event._count.participants,
    })),
  )
}
