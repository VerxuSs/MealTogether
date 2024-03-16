import { MyRoute } from '../../../fastify'
import prisma from '../../../utils/prisma'
import { Interface } from './schema'

export const Handler: MyRoute<Interface> = () => async (request, response) => {
  const user = await prisma.user.create({
    data: {
      email: request.body.email,
      lastname: request.body.lastname,
      firstname: request.body.firstname,
      password: request.body.password, // TODO: hash with argon2
    },
    select: {
      id: true,
    },
  })

  return response.send({
    id: user.id,
  })
}
