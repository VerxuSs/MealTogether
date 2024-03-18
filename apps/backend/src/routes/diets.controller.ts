import { FastifyInstance } from 'fastify'

import Diet from '../features/diet'

const route = async (fastify: FastifyInstance) => {
  fastify.get('/linked', Diet.Linked.Shorthand, Diet.Linked.Route(fastify))

  fastify.post('/:dietId/link', Diet.Link.Shorthand, Diet.Link.Route(fastify))

  fastify.delete(
    '/:dietId/unlink',
    Diet.Unlink.Shorthand,
    Diet.Unlink.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/diets' })
}
