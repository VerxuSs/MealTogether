import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const menu = await prisma.menu.findUnique({
    where: {
      id: request.params.menuId,
    },
    include: {
      participants: true,
      event: true,
      diets: true,
      dishes: {
        include: {
          ingredients: {
            include: {
              ingredient: true,
            },
          },
        },
      },
    },
  })

  if (menu === null) return response.notFound()

  if (
    !menu.participants.some((obj) => obj.userId === identity.user) &&
    menu.event.userId != identity.user
  )
    return response.unauthorized()

  return await response.send({
    name: 'MENU',
    description: menu.description ?? 'A description', // make it nullable in the
    diets: menu.diets,
    dishes: menu.dishes.map((dish) => ({
      description: dish.description ?? 'A description',
      name: 'DISH',
      ingredients: dish.ingredients.map((obj) => ({
        id: obj.ingredient.id,
        name: obj.ingredient.name,
      })),
    })),
  })
}
