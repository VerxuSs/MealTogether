import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Array(
  Type.Object({
    id: Type.Integer({
      description: 'id of the diet',
    }),
    name: Type.String({
      description: 'name of diet',
    }),
  }),
  {
    description: 'Array of the diets linked to the user',
  },
)

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['diet'],
  description: "Get the user's linked diets",
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
