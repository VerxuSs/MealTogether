import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
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
  tags: ['event'],
  description: 'Make an user participate to an event',
  params: Params,
  security: [{ bearerAuth: [] }],
  body: Body,
}
