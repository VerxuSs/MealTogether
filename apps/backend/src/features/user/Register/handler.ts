import argon2 from 'argon2'

import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const hash = await argon2.hash(request.body.password, {
      type: argon2.argon2id,
      secret: Buffer.from(fastify.config.MY_ARGON2_SECRET),
    })

    const user = await prisma.user.create({
      data: {
        password: hash,
        email: request.body.email,
        lastname: request.body.lastname,
        firstname: request.body.firstname,
      },
      select: {
        id: true,
      },
    })

    return response.send({
      id: user.id,
    })
  }
