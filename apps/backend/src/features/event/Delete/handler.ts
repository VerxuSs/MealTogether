import { MyRoute } from '../../../fastify'
import { Interface } from './schema'
import prisma from '../../../utils/prisma'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  const params = request.params

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.delete({
    where: { id: parseInt(params.eventId) },
    select: {
      id: true,
    },
  })

  if (!event) {
    // If the event is not found, return a 404 Not Found response
    response.badRequest()
  } else {
    // If the event is found, return it in the response
    return response.send({
      id: event.id,
    })
  }
}
