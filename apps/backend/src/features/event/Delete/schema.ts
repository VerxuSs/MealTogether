import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Object(
  {
    id: Type.Number({ description: "The deleted event's id" }),
  },
  {
    readOnly: true,
  },
)

const Params = Type.Object(
  {
    eventId: Type.String({
      description: "Event's id to delete",
      minLength: 1,
    }),
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
  tags: ['event'],
  description: 'delete an event',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
