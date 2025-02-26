import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  await prisma.participant.delete({
    where: {
      eventId_userId: {
        userId: identity.user,
        eventId: request.params.eventId,
      },
    },
  })
}
