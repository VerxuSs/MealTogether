import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const menu = await prisma.menu.delete({
    where: {
      id: request.params.menuId,
      event: {
        authorId: identity.user,
      },
    },
  })

  if (menu === null) return response.notFound()
}
