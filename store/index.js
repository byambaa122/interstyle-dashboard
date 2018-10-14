const state = () => ({
    list: {
        total: 0,
        selected: [],
        data: []
    }
})

const getters = {
    user: state => state.auth.user,
    authenticated: state => state.authenticated,
    list: state => state.list
}

const actions = {
    async fetchData({ commit }, { url, params = {} }) {
        const paginationData = await this.$axios.$get(url, {
            progress: false,
            params
        })
        commit('setList', paginationData)
    },
    updateSelectedItems({ commit }, selected = []) {
        commit('setSelectedItems', selected)
    }
}

const mutations = {
    setList(state, { total, data }) {
        state.list = Object.assign(state.list, {
            total,
            data
        })
    },
    setSelectedItems(state, selected) {
        state.list = Object.assign(state.list, {
            selected
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
