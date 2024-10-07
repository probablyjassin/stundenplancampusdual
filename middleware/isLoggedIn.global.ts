export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to)
      if (to.fullPath !== "/login") {
        return true
      } 
      console.log("to login...")
      return true
})
