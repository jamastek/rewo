import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String627420', password: 'String' } },
    two: { data: { email: 'String4663560', password: 'String' } },
  },
})

export type StandardScenario = typeof standard
