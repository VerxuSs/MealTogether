import { FastifyInstance } from 'fastify'

import Ingredient from '../features/ingredient'

const route = async (fastify: FastifyInstance) => {
  fastify.get('', Ingredient.GetAll.Shorthand, Ingredient.GetAll.Route(fastify))
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/ingredients' })
}
