import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const menu = await prisma.menu.findUnique({
    where: {
      id: request.params.menuId,
      OR: [
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
      eventId: true,
    },
  })

  if (menu === null) return response.notFound()

  await prisma.participant.update({
    data: {
      menuId: request.params.menuId,
    },
    where: {
      eventId_userId: {
        userId: identity.user,
        eventId: menu.eventId,
      },
    },
  })
}
