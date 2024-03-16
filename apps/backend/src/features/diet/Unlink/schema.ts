import { FastifySchema, RouteGenericInterface } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    dietId: Type.Integer({
      description: "diet's id to remove",
      minLength: 1,
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
  security: [{ bearerAuth: [] }],
  params: Params,
}
