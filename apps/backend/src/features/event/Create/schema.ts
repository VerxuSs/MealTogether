import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object(
  {
    name: Type.String({
      description: "The event's name",
      minLength: 3,
      maxLength: 20,
    }),
    slots: Type.Number({
      description: "The event's maximum participant",
    }),
    // startDate: Type.Date({
    //   description: "The event's start date",
    // }),
    // endDate: Type.Date({
    //   description: "The event's end date",
    // }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    id: Type.Number({ description: "The event's id" }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['event'],
  description: 'Create an event',
  body: Body,
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
