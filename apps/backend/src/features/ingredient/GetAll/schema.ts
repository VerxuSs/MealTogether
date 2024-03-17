import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Object(
  {
    ingredients: Type.Array(
      Type.Object({
        name: Type.String({
          description: "The ingredient's name",
        }),
        id: Type.Integer({
          description: "The ingredient's id",
        }),
      }),
    ),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['ingredient'],
  description: 'Get all of the ingredients',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
