import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.findFirst({
    where: {
      id: request.params.eventId,
      author: {
        id: identity.user,
      },
    },
    select: {
      id: true,
    },
  })

  if (event === null) return response.unauthorized()

  const menu = await prisma.menu.create({
    data: {
      description: request.body.description,
      event: {
        connect: {
          id: event.id,
        },
      },
      // Diets are specified upon the menu's creation !!!!
      diets: {
        connect: request.body.diets.map((diet) => ({ id: diet })), // map retourne un array tq chaque élément de la liste est associée à une entité ( par les ids )
      },
    },
    select: {
      id: true,
    },
  })

  return await response.send({
    id: menu.id,
  })
}
