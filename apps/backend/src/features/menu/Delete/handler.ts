import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

// c'est ici
export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const menuToDelete = await prisma.menu.findUnique({
    where: {
      id: request.params.menuId, // Unique identifier for the menu
    },
    include: {
      event: true,
    },
  })

  if (menuToDelete === null) return response.notFound()
  if (menuToDelete.event.userId != identity.user) return response.unauthorized()
}
