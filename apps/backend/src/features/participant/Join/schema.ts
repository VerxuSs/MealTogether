import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object(
  {
    eventId: Type.Integer({
      description: "Event's id that the user want to participate",
      minimum: 0,
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
}

export const Schema: FastifySchema = {
  tags: ['event'],
  description: 'Make an user participate to an event and menu',
  body: Body,
  security: [{ bearerAuth: [] }],
}
