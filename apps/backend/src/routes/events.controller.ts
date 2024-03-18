import { FastifyInstance } from 'fastify'

import Menu from '../features/menu'
import Event from '../features/event'
import Participant from '../features/participant'

const route = async (fastify: FastifyInstance) => {
  fastify.post('/create', Event.Create.Shorthand, Event.Create.Route(fastify))

  fastify.get('/:eventId', Event.Get.Shorthand, Event.Get.Route(fastify))

  fastify.get(
    '/hosting',
    Event.GetHosting.Shorthand,
    Event.GetHosting.Route(fastify),
  )
  fastify.get(
    '/attending',
    Event.GetAttending.Shorthand,
    Event.GetAttending.Route(fastify),
  )

  fastify.get(
    '/:eventId/menu',
    Menu.Choice.Shorthand,
    Menu.Choice.Route(fastify),
  )

  fastify.post(
    '/:eventId/menu',
    Menu.Create.Shorthand,
    Menu.Create.Route(fastify),
  )

  fastify.post(
    '/:eventId/join',
    Participant.Join.Shorthand,
    Participant.Join.Route(fastify),
  )
  fastify.delete(
    '/:eventId/leave',
    Participant.Leave.Shorthand,
    Participant.Leave.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/events' })
}
