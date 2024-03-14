import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    dishId: Type.Integer({
      description: "The dish's id",
      minimum: 0,
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
  tags: ['dish'],
  description: 'Delete a dish',
  security: [{ bearerAuth: [] }],
  params: Params,
}
