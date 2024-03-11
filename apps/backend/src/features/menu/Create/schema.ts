import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object({
  eventId: Type.Integer({
    description: "The event's id",
    minimum: 0,
  }),
})

const Body = Type.Object(
  {
    name: Type.String({
      description: "The menu's name",
      maxLength: 30,
    }),
    description: Type.String({
      description: "The menu's description",
      maxLength: 1000,
    }),
    diets: Type.Array(
      Type.Integer({
        description: 'The array of diets constraints id',
        minimum: 0,
      }),
      {
        maxItems: 10,
      },
    ),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    id: Type.Integer({
      description: "The menu's Id",
      minimum: 0,
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Params: Static<typeof Params>
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['menu'],
  description: 'Create a menu',
  body: Body,
  params: Params,
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
