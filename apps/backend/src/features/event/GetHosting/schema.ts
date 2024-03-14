import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Event = Type.Object({
  id: Type.Number({
    description: 'id of event',
    minimum: 0,
  }),
  name: Type.String({
    description: 'name of event',
    minLength: 3,
    maxLength: 20,
  }),
  nbParticipantMax: Type.Number({
    minimum: 1,
    maximum: 30,
  }),
  // startDate: Type.String(), // Adjust the type if needed
  // endDate: Type.String(), // Adjust the type if needed
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
