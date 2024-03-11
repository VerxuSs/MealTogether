import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    menuId: Type.Integer({
      description: "The menu's Id",
      minimum: 0,
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['menu'],
  description: 'Choose a menu',
  security: [{ bearerAuth: [] }],
  params: Params,
}
