import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Array(
  Type.Object({
    id: Type.Number({
      description: 'id of event',
    }),
    name: Type.String({
      description: 'name of event',
    }),
    authorId: Type.Number({
      description: 'id of the author',
    }),
    startDate: Type.Integer({
      description: 'start date of the event',
    }),
    slots: Type.Number({
      description: 'number of maximum participants',
    }),
    participants: Type.Number({
      description: 'number of participants',
    }),
  }),
  {
    description: 'array of event where connected user is the author',
  },
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['event'],
  description: 'get all events of the connected user',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
