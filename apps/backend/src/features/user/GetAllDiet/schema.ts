import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const DietType = Type.Object({
  id: Type.Integer({
    description: "id's of the diet",
  }),
  name: Type.String({
    description: "name's of diet",
  }),
})

const Reply = Type.Array(DietType, {
  description: 'Array of the diets of user',
})

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['diet'],
  description: 'Get all diet of user',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
