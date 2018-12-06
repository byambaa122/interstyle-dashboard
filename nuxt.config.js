require('dotenv').config()

module.exports = {
    head: {
        title: 'interstyle',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Интерстиль ХХК танилцуулга веб хуудсын админ удирдлага' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' }
        ]
    },
    modules: [
        '@nuxtjs/auth',
        '@nuxtjs/router',
        '@nuxtjs/axios',
        '@nuxtjs/dotenv'
    ],
    plugins: [
        '~/plugins/axios.js',
        '~/plugins/vuetify.js',
        '~/helpers/filters.js',
        '~/helpers/mixins.js'
    ],
    axios: {
        baseURL: `${process.env.BASE_URL}/api`
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
        '~/assets/style/app.styl'
    ],
    loading: {
        color: '#0078d4'
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
