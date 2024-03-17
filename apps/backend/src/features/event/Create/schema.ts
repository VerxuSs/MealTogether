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
      minimum: 1,
      maximum: 30,
    }),
    startDate: Type.Integer({
      description:
        "The event's start date in UNIX timestamp format (milliseconds)",
      minimum: new Date().getTime(),
    }),
    endDate: Type.Integer({
      description:
        "The event's end date in UNIX timestamp format (milliseconds)",
      exclusiveMinimum: new Date().getTime(),
    }),
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
