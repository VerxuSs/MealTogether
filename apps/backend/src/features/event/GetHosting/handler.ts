import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const events = await prisma.event.findMany({
    where: {
      author: {
        id: identity.user,
      },
    },
    select: {
      id: true,
      name: true,
      slots: true,
      participants: {
        select: {
          userId: true,
        },
      },
    },
  })

  return response.send(events)
}
