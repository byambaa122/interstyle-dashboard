import Vue from 'vue'

Vue.mixin({
    methods: {
        cloneObject(obj) {
            return JSON.parse(JSON.stringify(obj))
        },
        spliceById(array, id, item = null) {
            const i = array.findIndex(item => item.id === id)
            if (item) {
                array.splice(i, 1, item)
            } else {
                array.splice(i, 1)
            }
        }
    }
})
