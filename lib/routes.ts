import { Permission } from '@prisma/client'

export const routesConfig = [
  {
    matcher: '/supplier/admin',
    requiredAuth: true,
    requiredPermissions: [Permission.ADMIN]
  },
  {
    matcher: '/restaurant/admin',
    requiredAuth: true,
    requiredPermissions: [Permission.ADMIN]
  }
]
