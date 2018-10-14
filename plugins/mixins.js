import Vue from 'vue'
import { debounce } from 'lodash'

Vue.mixin({
    methods: {
        cloneObject(obj, fillable = null) {
            let clone = JSON.parse(JSON.stringify(obj))

            if (fillable && Array.isArray(fillable)) {
                clone = fillable.reduce((current, prop) => Object.assign(current, { [prop]: clone[prop] || null }), {})
            }

            return clone
        },
        spliceById(array, id, item = null) {
            const i = array.findIndex(item => item.id === id)

            if (item) {
                array.splice(i, 1, item)
            } else {
                array.splice(i, 1)
            }
        },
        debounced: debounce(callFunc => {
            callFunc()
        }, 500)
    }
})
