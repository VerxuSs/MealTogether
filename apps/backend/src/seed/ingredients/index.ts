import data from './data.json'

import { PrismaClient } from '@prisma/client'

const seed = async (prisma: PrismaClient) => {
  await prisma.ingredient.createMany({
    data,
    skipDuplicates: true,
  })
}

export default seed
