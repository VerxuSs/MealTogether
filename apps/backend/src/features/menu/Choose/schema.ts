import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Params = Type.Object(
  {
    menuId: Type.Integer({
      // il faut matcher avec le paramètre de l'URL
      description: "The menu's Id",
      minimum: 0,
    }),
  },
  {
    readOnly: true, //  empêche de modifier les valeurs récupérées
  },
)

export interface Interface extends RouteGenericInterface {
  Params: Static<typeof Params>
}

export const Schema: FastifySchema = {
  tags: ['menu'],
  description: 'Choose a menu',
  security: [{ bearerAuth: [] }], // pour obliger l'authentification de l'utilisateur
  params: Params,
}
