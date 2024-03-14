import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const participation = await prisma.participant.update({
    data: {
      menuId: request.body.menuId,
    },
    where: {
      eventId_userId: {
        eventId: request.params.eventId,
        userId: identity.user,
      },
    },
    select: {
      eventId: true,
      menuId: true,
    },
  })

  return response.send({
    eventId: participation.eventId,
    menuId: participation.menuId,
  })
}
