import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object({
  eventId: Type.Integer({
    description: "Event's id that the user want to participate",
    minimum: 1,
  }),
})

const Body = Type.Object(
  {
    menuId: Type.Integer({
      description: "Menu's id that the user want to take",
      minimum: 1,
    }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    eventId: Type.Integer({
      description: "The event's id",
      minimum: 0,
    }),
    menuId: Type.Union([Type.Integer(), Type.Null()], {
      description: "Menu's id selected, null if menu isn't selected for moment",
      minimum: 1,
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['event'],
  description: 'update the participation of the user (his menu)',
  body: Body,
  security: [{ bearerAuth: [] }],
  params: Params,
  response: {
    200: Reply,
  },
}
