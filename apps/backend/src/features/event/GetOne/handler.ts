import { MyRoute } from '../../../fastify'
import { Interface } from './schema'
import prisma from '../../../utils/prisma'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const wishEvent = await prisma.event.findUnique({
    where: {
      id: request.params.eventId,
      OR: [
        {
          authorId: identity.user,
        },
        {
          participants: {
            some: {
              userId: identity.user,
            },
          },
        },
      ],
    },
  })

  if (!wishEvent) {
    // If the event is not found, return a 404 Not Found response
    return response.notFound()
  }
  // If the event is found, return it in the response
  return response.send({
    //participants: wishEvent.participants,
    id: wishEvent.id,
    name: wishEvent.name,
    slots: wishEvent.slots,
    authorId: wishEvent.authorId,
  })
}
