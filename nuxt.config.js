const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
    head: {
        title: 'iHotel',
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
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],
    plugins: [
        '~/plugins/mixins.js',
        '~/plugins/filters.js',
        '~/plugins/vuetify.js',
        '~/plugins/axios.js'
    ],
    axios: {
        baseURL: 'http://localhost/interstyle/public/api'
        // proxyHeaders: false
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    user: { url: '/user', method: 'get', propertyName: 'user' },
                    login: { url: '/login', method: 'post', propertyName: 'accessToken' },
                    logout: false
                }
            }
        }
    },
    css: [
        '~/assets/style/app.styl'
    ],
    loading: {
        color: '#3B8070'
    },
    build: {
        babel: {
            plugins: [
                ['transform-imports', {
                    'vuetify': {
                        'transform': 'vuetify/es5/components/${member}',
                        'preventFullImport': true
                    }
                }]
            ]
        },
        vendor: [
            '~/plugins/vuetify.js'
        ],
        extractCSS: true,
        cssSourceMap: false,
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            if (ctx.isServer) {
                config.externals = [
                    nodeExternals({
                        whitelist: [/^vuetify/]
                    })
                ]
            }
        }
    }
}
