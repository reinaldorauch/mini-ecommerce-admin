import { useUserStore } from "../stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.token) {
    return navigateTo("/login");
  }
});
