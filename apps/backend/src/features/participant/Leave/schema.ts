import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    eventId: Type.Integer({
      description:
        "Event's id that the user want to delete from his participations",
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
  description: 'Delete the participation of the user',
  security: [{ bearerAuth: [] }],
  params: Params,
  body: Body,
}
