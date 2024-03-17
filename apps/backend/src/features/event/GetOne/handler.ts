import { MyRoute } from '../../../fastify'

import { Interface } from './schema'

import prisma from '../../../utils/prisma'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.findUnique({
    where: {
      id: request.params.eventId,
      OR: [
        {
          authorId: identity.user,
        },
        {
          participants: {
            some: {
              userId: identity.user,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      slots: true,
      endDate: true,
      authorId: true,
      startDate: true,
      participants: {
        select: {
          userId: true,
        },
      },
    },
  })

  if (event) {
    return response.send({
      id: event.id,
      name: event.name,
      slots: event.slots,
      authorId: event.authorId,
      endDate: event.endDate.getTime(),
      startDate: event.startDate.getTime(),
      participants: event.participants.map((participant) => participant.userId),
    })
  }

  return response.notFound()
}
