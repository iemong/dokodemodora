export default {
  head: {
    titleTemplate: 'どこでもドラ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Meta description' },
      { hid: 'keyword', name: 'keyword', content: 'timer' }
    ]
  },
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
  plugins: ['~/plugins/composition-api']
}
