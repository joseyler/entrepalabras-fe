import { useRouter } from 'next/navigation'

function hasRequiredPermissions(requiredPermissions: string[],userPermissions: string[]): boolean {
  // get userPermissions from the redux-store
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  )
}

export function withRoles(Component: any, requiredPermissions: string[],userPermissions: string[],goBackRoute: string) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter();
    const hasPermission = hasRequiredPermissions(requiredPermissions,userPermissions)
    if (hasPermission) {
      return <Component {...props} />
    } else {
      router.push(goBackRoute)
      return null
    }
  }
}