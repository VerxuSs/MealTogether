import { FastifyInstance } from 'fastify'
import Menu from '../features/menu'

const { Create, Choose, Delete, GetById } = Menu

const route = async (fastify: FastifyInstance) => {
  fastify.post('/:eventId/create', Create.Shorthand, Create.Route(fastify))
  fastify.put('/:menuId/choose', Choose.Shorthand, Choose.Route(fastify))
  fastify.delete('/:menuId', Delete.Shorthand, Delete.Route(fastify))
  fastify.get('/:menuId', GetById.Shorthand, GetById.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/menus' })
}
