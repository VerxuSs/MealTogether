import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  await prisma.user.update({
    where: {
      id: identity.user,
    },
    data: {
      diets: {
        connect: {
          id: request.params.dietId,
        },
      },
    },
  })
}
