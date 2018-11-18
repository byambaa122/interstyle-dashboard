export default function ({ app, $axios, redirect }) {
    $axios.onRequest(config => {
        config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    })

    $axios.onError(err => {
        if (err.response.status === 401 || err.response.status === 403) {
            // await app.$auth.logout()
            // redirect('/')
        }
    })
}
