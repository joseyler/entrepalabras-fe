import { useRouter } from 'next/router'

function hasRequiredPermissions(requiredPermissions: string[]): boolean {
  // get userPermissions from the redux-store
  const userPermissions = ['Administrador', 'Usuario']
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  )
}

export function withRoles(Component: any, requiredPermissions: string[],goBackRoute: string) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter()
    const hasPermission = hasRequiredPermissions(requiredPermissions)
    if (hasPermission) {
      return <Component {...props} />
    } else {
      router.push(goBackRoute)
      return null
    }
  }
}