import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const ingredients = await prisma.ingredient.findMany({
    select: {
      name: true,
      id: true,
    },
  })

  return await response.send({
    ingredients: ingredients.map(({ name, id }) => ({
      name: name,
      id: id,
    })),
  })
}
