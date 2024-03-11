import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    menuId: Type.Integer({
      description: "The menu's id",
      minimum: 0,
    }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    name: Type.String({
      description: "The menu's name",
    }),
    description: Type.Optional(
      Type.String({
        description: "The menu's description",
      }),
    ),
    diets: Type.Array(
      Type.Object({
        name: Type.String({
          description: "The diet's constraint name",
        }),
        id: Type.Integer({
          description: "The diet's constraint Id",
        }),
      }),
    ),
    dishes: Type.Array(
      Type.Object({
        description: Type.Optional(
          Type.String({
            description: "The dish's description",
          }),
        ),
        name: Type.String({
          description: "The dish's name",
        }),
        ingredients: Type.Array(
          Type.Object({
            id: Type.Integer({
              description: "The ingredient's id",
            }),
            name: Type.String({
              description: "The ingredient's name",
            }),
            description: Type.Optional(
              Type.String({
                description: "The ingredient's description",
              }),
            ),
          }),
        ),
      }),
    ),
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
  tags: ['menu'],
  description: 'Get a menu',
  params: Params,
  security: [{ bearerAuth: [] }],
  response: {
    200: Reply,
  },
}
