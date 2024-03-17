import { FastifyInstance } from 'fastify'

import Menu from '../features/menu'
import Dish from '../features/dish'

const route = async (fastify: FastifyInstance) => {
  fastify.get('/:menuId', Menu.Get.Shorthand, Menu.Get.Route(fastify))

  fastify.post(
    '/:menuId/dish',
    Dish.Create.Shorthand,
    Dish.Create.Route(fastify),
  )

  fastify.put(
    '/:menuId/choose',
    Menu.Choose.Shorthand,
    Menu.Choose.Route(fastify),
  )

  fastify.delete(
    '/:menuId/delete',
    Menu.Delete.Shorthand,
    Menu.Delete.Route(fastify),
  )
}

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: '/menus' })
}
