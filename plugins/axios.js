export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
        config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    })

    $axios.onError(err => {
        if (err.response.status === 401) {
            //
        }
    })
}
