// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // head
    head: {
      title: "mini-ecommerce admin",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "mini-ecommerce admin",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  ssr: false,

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000",
    },
  },

  typescript: {
    strict: true,
    shim: false,
  },

  // build modules
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@element-plus/nuxt",
  ],

  css: ["element-plus/dist/index.css"],

  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },
});
