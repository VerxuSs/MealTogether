import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Event = Type.Object({
  id: Type.Number({
    description: 'id of event',
    minimum: 0,
  }),
  // startDate: Type.String(), // Adjust the type if needed
  // endDate: Type.String(), // Adjust the type if needed
  name: Type.String({
    description: 'name of event',
    minLength: 3,
    maxLength: 20,
  }),
  slots: Type.Number({
    description: 'number of maximum participants',
    minimum: 1,
    maximum: 30,
  }),
  participants: Type.Array(
    Type.Object({
      userId: Type.Number({
        description: 'id of the participant',
        minimum: 0,
      }),
    }),
    {
      description: 'array of participants attending the event',
    },
  ),
})

const Reply = Type.Array(Event, {
  description: 'array of event where connected user is the author',
})

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
