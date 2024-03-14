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
          event: {
            authorId: identity.user,
          },
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
    include: {
      diets: {
        select: {
          id: true,
          name: true,
        },
      },
      dishes: {
        include: {
          ingredients: {
            select: {
              ingredient: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (menu === null) return response.notFound()

  return await response.send({
    name: menu.name,
    diets: menu.diets,
    description: menu.description ?? undefined,
    dishes: menu.dishes.map((dish) => ({
      name: dish.name,
      description: dish.description ?? undefined,
      ingredients: dish.ingredients.map(({ ingredient }) => ({
        id: ingredient.id,
        name: ingredient.name,
        description: ingredient.description ?? undefined,
      })),
    })),
  })
}
