import { FastifySchema, RouteGenericInterface } from 'fastify'

import { Static, Type } from '@sinclair/typebox'

const Body = Type.Object(
  {
    email: Type.String({
      description: "The user's email",
      format: 'email',
      maxLength: 50,
    }),
    firstname: Type.String({
      description: "The user's name",
      minLength: 5,
      maxLength: 15,
    }),
    lastname: Type.String({
      description: "The user's last name",
      minLength: 5,
      maxLength: 25,
    }),
    password: Type.String({
      description: "The user's password",
      minLength: 8,
      maxLength: 25,
    }),
  },
  {
    readOnly: true,
  },
)

const Reply = Type.Object(
  {
    id: Type.Number({ description: "The user's id" }),
  },
  {
    readOnly: true,
  },
)

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>
  Reply: Static<typeof Reply>
}

export const Schema: FastifySchema = {
  tags: ['user'],
  description: 'Create a user',
  body: Body,
  response: {
    200: Reply,
  },
}
