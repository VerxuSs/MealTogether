import { Static } from '@sinclair/typebox'

import { MyRoute, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

import Event from '../../event'
import Menu from '../../menu'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const user = await prisma.user.findFirst({
    where: {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
    },
    select: {
      id: true,
      password: true,
    },
  })

  if (user === null) {
    return response.unauthorized()
  }

  if (user.password === request.body.password) {
    const payload: Static<typeof MySessionSchema> = {
      user: user.id,
      claims: [
        Event.Create.Claim,
        Event.GetHosting.Claim,
        Event.GetAttending.Claim,
        Menu.Choose.Claim,
        Menu.Create.Claim,
        Menu.Delete.Claim,
        Menu.GetById.Claim,
      ],
    }

    const token = await response.jwtSign(payload)

    return response.send({
      id: user.id,
      token: token,
    })
  }

  return response.unauthorized()
}
