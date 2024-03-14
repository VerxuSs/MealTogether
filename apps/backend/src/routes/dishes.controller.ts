import { FastifyInstance } from 'fastify'
import Dish from '../features/dish'

const route = async (fastify: FastifyInstance) => {
  fastify.delete('/:dishId', Dish.Delete.Shorthand, Dish.Delete.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/dishes' })
}
