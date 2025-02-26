import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.create({
    data: {
      name: request.body.name,
      slots: request.body.slots,
      endDate: new Date(request.body.endDate),
      startDate: new Date(request.body.startDate),
      author: {
        connect: {
          id: identity.user,
        },
      },
    },
    select: {
      id: true,
    },
  })

  return response.send({
    id: event.id,
  })
}
