import { FastifyInstance } from 'fastify'

import { Hook } from '../features/hook'

const route = async (fastify: FastifyInstance) => {
  fastify.get('/sse', Hook.Sse.Shorthand, Hook.Sse.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/hooks' })
}
