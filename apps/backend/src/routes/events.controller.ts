import { FastifyInstance } from 'fastify'

import Event from '../features/event'
import Participant from '../features/participant'

const { Create, GetAttending, GetHosting } = Event
const { Join, Leave, ChooseMenu } = Participant

const route = async (fastify: FastifyInstance) => {
  fastify.get('/hosting', GetHosting.Shorthand, GetHosting.Route(fastify))
  fastify.get('/attending', GetAttending.Shorthand, GetAttending.Route(fastify))
  fastify.post('/create', Create.Shorthand, Create.Route(fastify))
  fastify.post('/join', Join.Shorthand, Join.Route(fastify))
  fastify.delete('/:eventId/leave', Leave.Shorthand, Leave.Route(fastify))
  fastify.patch(
    '/:eventId/menu',
    ChooseMenu.Shorthand,
    ChooseMenu.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/events' })
}
