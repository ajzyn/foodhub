export const protectedRoutes = [
  {
    path: '/supplier',
    isProtected: true,
    type: 'SUPPLIER',
    requiredRole: 'USER'
  },
  {
    path: '/supplier/about',
    isProtected: true,
    type: 'SUPPLIER',
    requiredRole: 'ADMIN'
  }
]
