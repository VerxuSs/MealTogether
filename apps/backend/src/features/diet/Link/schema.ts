import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    dietId: Type.Integer({
      description: 'id of the diet',
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
  description: "Unlink a diet from the user's account",
  params: Params,
  security: [{ bearerAuth: [] }],
}
