import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object({
  menuId: Type.Integer({
    description: "Menu's id that the user want to choose",
    minimum: 1,
  }),
})

const Body = Type.Object(
  {},
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['menu'],
  description: 'Choose a menu for an event',
  body: Body,
  security: [{ bearerAuth: [] }],
  params: Params,
}
