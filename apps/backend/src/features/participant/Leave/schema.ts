import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    eventId: Type.String({
      description:
        "Event's id that the user want to delete from his participations",
      minimum: 0,
    }),
  },
  {
    readonly: true,
  },
)

const Reply = Type.Object(
  {
    eventId: Type.Integer({
      description: "The event's id",
      minimum: 0,
    }),
    menuId: Type.Union([Type.Integer(), Type.Null()], {
      description: "Menu's id selected, null if menu isn't selected for moment",
      minimum: -1,
    }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Params: Static<typeof Params>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['event'],
  description: 'Delete the participation of the user',
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
