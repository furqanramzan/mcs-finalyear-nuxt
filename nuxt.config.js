import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#fff',
    height: '3px',
    throttle: 0,
    continuous: true
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/main.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/plugins',
    '@/plugins/filters',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api' : 'http://forex.geniusmindzone.com/api/api/',
    debug: true,
  },

  /*
  ** Vue Router module configuration
  */
  router: {
    // base: process.env.NODE_ENV === 'development' ? '/' : '/forex/',
    extendRoutes (routes, resolve) {
      routes.push({        
        path: '/',
        redirect: {
          name: 'auth-login'
        }
      })
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    extend(config, ctx) {
    }
  }
}
