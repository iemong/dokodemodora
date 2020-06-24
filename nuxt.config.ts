import { Configuration } from '@nuxt/types'
import { Configuration as WebpackConfiguration } from 'webpack'

const config: Configuration = {
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
  plugins: ['~/plugins/composition-api'],
  build: {
    extend(config: WebpackConfiguration) {
      if (!(config && config.module)) return
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}

export default config
