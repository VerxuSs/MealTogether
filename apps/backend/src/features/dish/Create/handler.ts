import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const menu = await prisma.menu.findFirst({
    where: {
      id: request.params.menuId,
      event: {
        authorId: identity.user,
      },
    },
    select: {
      id: true,
    },
  })

  if (menu === null) return response.notFound()

  const dish = await prisma.dish.create({
    data: {
      name: request.body.name,
      description: request.body.description,
      menu: {
        connect: {
          id: menu.id,
        },
      },
    },
    select: {
      id: true,
    },
  })

  await prisma.ingredientInDish.createMany({
    data: request.body.ingredients.map(({ id, quantity, unitPrice }) => ({
      quantity,
      unitPrice,
      dishId: dish.id,
      ingredientId: id,
    })),
  })

  return await response.send({
    id: dish.id,
  })
}
