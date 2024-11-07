// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/scss/_main.scss'],

  runtimeConfig: {
    public: {
      REVERB_APP_ID:process.env.NUXT_PUBLIC_REVERB_APP_ID,
      REVERB_APP_KEY:process.env.NUXT_PUBLIC_REVERB_APP_KEY,
      REVERB_APP_SECRET:process.env.NUXT_PUBLIC_REVERB_APP_SECRET,
      REVERB_HOST:process.env.NUXT_PUBLIC_REVERB_HOST,
      REVERB_PORT:process.env.NUXT_PUBLIC_EVERB_PORT,
      REVERB_SCHEME:process.env.NUXT_PUBLIC_EVERB_SCHEME,
      baseURL: 'http://localhost:8000', 
    },
  },

  modules: [
    '@pinia/nuxt'
  ],

  plugins: [
    '~/plugins/echo.client.ts',
    '~/plugins/csrf.ts',
    '~/plugins/fontawesome.ts',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@pinia/nuxt'],
})