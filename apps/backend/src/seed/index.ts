import prisma from '../utils/prisma'

import ingredients from './ingredients'

const main = async () => {
  await ingredients(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
  })
