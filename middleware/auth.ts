export default defineNuxtRouteMiddleware((to, from) => {
  const { accessToken } = useAuth()

  // Check if user has access token in cookies
  if (!accessToken.value) {
    return navigateTo('/login')
  }
})