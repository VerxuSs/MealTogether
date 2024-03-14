import { FastifyInstance } from 'fastify'

import User from '../features/user'

const route = async (fastify: FastifyInstance) => {
  fastify.get(
    '/linked',
    User.GetAllDiet.Shorthand,
    User.GetAllDiet.Route(fastify),
  )

  fastify.post(
    '/:dietId/link',
    User.LinkDiet.Shorthand,
    User.LinkDiet.Route(fastify),
  )

  fastify.delete(
    '/:dietId/unlink',
    User.UnlinkDiet.Shorthand,
    User.UnlinkDiet.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/diets' })
}
