import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const dish = await prisma.dish.delete({
    where: {
      id: request.params.dishId,
      menu: {
        event: {
          authorId: identity.user,
        },
      },
    },
  })

  if (dish === null) return response.notFound()
}
