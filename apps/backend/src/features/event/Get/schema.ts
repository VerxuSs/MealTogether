import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Reply = Type.Object(
  {
    id: Type.Number({
      description: 'id of event',
      minimum: 0,
    }),
    name: Type.String({
      description: 'name of event',
      minLength: 3,
      maxLength: 20,
    }),
    slots: Type.Number({
      minimum: 1,
      maximum: 30,
    }),
    startDate: Type.Integer({
      description: 'start date of the event',
    }),
    endDate: Type.Integer({
      description: 'end date of the event',
    }),
    authorId: Type.Number({
      description: 'id of the author',
      minimum: 0,
    }),
    participants: Type.Array(
      Type.Number({
        description: 'id of the participant',
        minimum: 0,
      }),
      {
        description: 'array of participants attending the event',
      },
    ),
    menus: Type.Array(
      Type.Object({
        id: Type.Number({
          description: 'id of the menu',
          minimum: 0,
        }),
        name: Type.String({
          description: 'name of the menu',
          minLength: 3,
          maxLength: 20,
        }),
      }),
      {
        description: 'array of menus for the event',
      },
    ),
  },
  {
    readOnly: true,
  },
)

const Params = Type.Object({
  eventId: Type.Integer({
    description: "event's id that the user want to display",
    minimum: 1,
  }),
})

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['event'],
  description: 'get one event',
  security: [{ bearerAuth: [] }],
  params: Params,
  response: {
    200: Reply,
  },
}
