import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object({
  menuId: Type.Integer({
    description: "The menu's id",
    minimum: 0,
  }),
})

const Body = Type.Object(
  {
    name: Type.String({
      description: "The menu's name",
      maxLength: 30,
    }),
    description: Type.Optional(
      Type.String({
        description: "The menu's description",
        maxLength: 1000,
      }),
    ),
    ingredients: Type.Array(
      Type.Object({
        id: Type.Integer({
          minimum: 0,
          description: "The ingredient's id",
        }),
        quantity: Type.Optional(
          Type.Integer({
            minimum: 0,
            maximum: 10000,
            description: "The ingredient's quantity",
          }),
        ),
        unitPrice: Type.Optional(
          Type.Number({
            minimum: 0,
            maximum: 10000,
            description: "The ingredient's unit price",
          }),
        ),
      }),
      {
        maxItems: 25,
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
      description: "The dish's Id",
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
  tags: ['dish'],
  description: 'Create a dish',
  body: Body,
  params: Params,
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
