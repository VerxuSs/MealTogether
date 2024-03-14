import { FastifyInstance } from 'fastify'
import CreateDiet from '../features/user/LinkDiet'
import RemoveDiet from '../features/user/UnlinkDiet'
import GetAllDiet from '../features/user/GetAllDiet'

const route = async (fastify: FastifyInstance) => {
  fastify.get('', GetAllDiet.Shorthand, GetAllDiet.Route(fastify))
  fastify.post('/:dietId/link', CreateDiet.Shorthand, CreateDiet.Route(fastify))
  fastify.delete(
    '/:dietId/unlink',
    RemoveDiet.Shorthand,
    RemoveDiet.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/diet' })
}
