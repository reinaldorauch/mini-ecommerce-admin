import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): UserStore => ({
    token: null,
    user: null,
  }),
  getters: {
    authHeader: (store) =>
      store.token ? { Authorization: "Bearer " + store.token } : {},
  },
  persist: true,
});
