import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const menu = await prisma.participant.findUnique({
    where: {
      eventId_userId: {
        userId: identity.user,
        eventId: request.params.eventId,
      },
    },
    select: {
      menuId: true,
    },
  })

  if (menu === null) return response.notFound()

  return response.send({
    id: menu.menuId ?? undefined,
  })
}
