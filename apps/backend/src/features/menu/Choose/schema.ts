import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object({
  menuId: Type.Integer({
    description: "Menu's id that the user want to choose",
    minimum: 1,
  }),
})

export interface Interface extends RouteGenericInterface {
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['menu'],
  description: 'Choose a menu for an event',
  security: [{ bearerAuth: [] }],
  params: Params,
}
