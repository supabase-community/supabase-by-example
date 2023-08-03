// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  supabase: {
    redirectOptions: {
      login: "/auth/signin",
      callback: "/auth/confirm",
      exclude: ["/auth/*"],
    },
    cookieName: "oauth",
    cookieOptions: {
      secure: false, // TODO: Set to true when deploying to a hosted service, forced this to non-secure for Safari to work locally
    },
  },
});
