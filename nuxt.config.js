import 'dotenv/config'

export default {
    head: {
        title: 'interstyle',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Зочид буудал, амралтын газар, жуулчны баазын захиалгын систем' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
        ]
    },
    modules: [
        '@nuxtjs/auth',
        '@nuxtjs/axios',
        '@nuxtjs/dotenv'
    ],
    plugins: [
        '~/plugins/axios.js',
        '~/plugins/filters.js',
        '~/plugins/mixins.js',
        '~/plugins/vuetify.js'
    ],
    axios: {
        baseURL: process.env.BASE_URL
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    user: { url: '/user', method: 'get', propertyName: 'user' },
                    login: { url: '/login', method: 'post', propertyName: 'accessToken' },
                    logout: false
                }
            },
            redirect: {
                login: '/login',
                logout: '/login',
                callback: '/login',
                home: '/'
            }
        }
    },
    css: [
        '@mdi/font/css/materialdesignicons.css',
        'vue-croppa/dist/vue-croppa.css',
        '~/assets/style/app.styl'
    ],
    loading: {
        color: '#3B8070'
    },
    build: {
        extractCSS: true,
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev }) {
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
