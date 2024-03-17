import { EventStatus } from '@prisma/client'

import { MyRoute } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const identity = request.requestContext.get('identity')

  if (identity === undefined) throw new Error('Unauthorized')

  const event = await prisma.event.findUnique({
    where: {
      id: request.params.eventId,
    },
    select: {
      slots: true,
      status: true,
      authorId: true,
      _count: {
        select: {
          participants: true,
        },
      },
    },
  })

  if (event === null) return response.notFound()

  if (event.authorId === identity.user) return response.unauthorized()

  if (
    event.status === EventStatus.CLOSED ||
    event.status === EventStatus.CANCELED
  ) {
    return response.unauthorized()
  }

  if (event._count.participants === event.slots) return response.badRequest()

  await prisma.participant.create({
    data: {
      userId: identity.user,
      eventId: request.params.eventId,
    },
  })
}
