const state = () => ({
    isMobile: false
})

const getters = {
    user: state => state.auth.user,
    authenticated: state => state.authenticated,
    isMobile: state => state.isMobile
}

const actions = {
    //
}

const mutations = {
    isMobile(state, value) {
        state.isMobile = value
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
