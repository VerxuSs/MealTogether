import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object({
  eventId: Type.Integer({
    description: "The event's id",
    minimum: 1,
  }),
})

const Reply = Type.Object(
  {
    id: Type.Optional(
      Type.Integer({
        description: "The menu's id",
        minimum: 0,
      }),
    ),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['menu'],
  description: "Get the event's menu",
  security: [{ bearerAuth: [] }],
  params: Params,
  response: {
    200: Reply,
  },
}
