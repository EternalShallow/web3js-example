import colors from 'vuetify/es5/util/colors'
// import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const git_revision_plugin = new GitRevisionPlugin()
const webpack = require('webpack')
const env = require('dotenv').config({ path: '.env.' + process.env.BASE })
const base = process.env.BASE === 'prod' ? '/web3/' : '/dapp/web3/'
export default {
  // Target (https://go.nuxtjs.dev/config-target)
  server: {
    host: '0.0.0.0',
    port: 8888 // default: 3000
  },
  target: 'server',
  env: env.parsed,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    // titleTemplate: '%s - Yswap',
    titleTemplate: '%s',
    title: 'Web3',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: base + 'yswap@2x.png' }
    ],
    script: [
      { src: base + 'rem/flexible.js', type: 'text/javascript', charset: 'utf-8' }
    ]
  },
  router: {
    middleware: ['route'],
    base: base
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  styleResources: {
    scss: [
      './assets/css/fun.scss',
      './assets/css/resetVuetify.scss',
      './assets/css/color.scss',
      './assets/css/font.scss',
      './assets/css/space.scss',
      './assets/css/common.scss',
      './assets/css/main.scss'
    ]
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/index.js',
    // 解决引入插件插件配置挂载在windows
    { src: '~/node_modules/vue-clipboard2', ssr: false }
    // todo vuetify按需加载
    // {
    //   src: '~/plugins/vuetify.js',
    //   ssr: true // 关闭ssr
    // }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],

  axios: {
    // proxy:true  //  代理
  },
  proxy: {
    // "/api/":"http://localhost:3001/"    //  key(路由前缀)：value(代理地址)
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#01598d',
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vuetify/lib'],
    plugins: [
      new webpack.DefinePlugin({
        'process.COMMITHASH': JSON.stringify(git_revision_plugin.commithash())
      })
      // todo VuetifyLoader 作为vuetify的按需加载使用，解决vendors包太大的问题，目前使用还存在问题，https://github.com/vuetifyjs/vuetify-loader/issues/161 此bug还未解决
      // new VuetifyLoaderPlugin({
      //   match (originalTag, { kebabTag, camelTag, path, component }) {
      //     if (kebabTag.startsWith('core-')) {
      //       return [
      //         camelTag,
      //         `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
      //       ]
      //     }
      //   }
      // })
    ],
    /**
     * todo: nuxt 升级到3.0版本以上的时候需要改为对象的形式展示，目前用的是nuxt2.14.6暂时用数组，构建的时候会有警告
     * 2.0版本切换object rem 不生效
     * Using an Array as build.postcss will be deprecated in Nuxt 3. Please switch to the object declaration
     */
    postcss: [
      require('postcss-px2rem')({
        remUnit: 75
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      if (isClient && !isDev) {
        // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        config.optimization.minimizer[0].options.terserOptions.compress = {
          warnings: false,
          drop_debugger: true, // debugger
          drop_console: false, // console
          pure_funcs: ['console.log'] // 移除console.log
        }
      }
    }
  }
}
