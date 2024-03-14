import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    dietId: Type.Integer({
      description: "id's of the diet",
      minimum: 1,
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['diet'],
  description: 'Link a diet for the user',
  params: Params,
  security: [{ bearerAuth: [] }],
}
