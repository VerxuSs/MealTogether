import argon2 from 'argon2'

import { Static } from '@sinclair/typebox'

import { MyRoute, MySessionSchema } from '../../../fastify'

import prisma from '../../../utils/prisma'

import { Interface } from './schema'

import User from '../index'
import Diet from '../../diet'
import Dish from '../../dish'
import Menu from '../../menu'
import Event from '../../event'
import Participant from '../../participant'

const Claims = (features: Record<string, { Claim: string }>) => {
  return Object.values(features).map(({ Claim }) => Claim)
}

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const user = await prisma.user.findFirst({
      where: {
        email: request.body.email,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (user === null) {
      return response.unauthorized()
    }

    const authenticate = await argon2.verify(
      user.password,
      request.body.password,
      {
        secret: fastify.config.MY_ARGON2_SECRET,
      },
    )

    if (authenticate) {
      const payload: Static<typeof MySessionSchema> = {
        user: user.id,
        claims: [
          ...Claims(Diet),
          ...Claims(User),
          ...Claims(Menu),
          ...Claims(Dish),
          ...Claims(Event),
          ...Claims(Participant),
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
