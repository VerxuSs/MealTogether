import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.update({
    where: {
      id: request.params.eventId,
    },
    data: {
      status: request.body.status,
    },
    select: {
      id: true,
    },
  })

  return response.send({
    id: event.id,
  })
}
