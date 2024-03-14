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
    select: {
      diets: true,
    },
  })

  const dietToSearch = await prisma.diet.findUnique({
    where: {
      id: request.params.dietId,
    },
  })

  if (
    dietToUser == null ||
    dietToSearch == null ||
    !dietToUser.diets.some((diet) => diet.id === dietToSearch.id)
  ) {
    return response.badRequest()
  }

  await prisma.user.update({
    where: {
      id: identity.user,
    },
    data: {
      diets: {
        disconnect: {
          id: dietToSearch.id,
        },
      },
    },
    select: {
      id: true,
    },
  })

  return response.send({
    id: dietToSearch.id,
  })
}
