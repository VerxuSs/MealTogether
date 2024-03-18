import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const dietToUser = await prisma.user.findUnique({
    where: {
      id: identity.user,
    },
    include: {
      diets: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  if (!dietToUser) throw new Error('Unrecognized User')

  return response.send(dietToUser.diets)
}
