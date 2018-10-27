import Vue from 'vue'
import { debounce, isEqual } from 'lodash'

Vue.mixin({
    methods: {
        cloneObject(obj, fillable = null) {
            let clone = JSON.parse(JSON.stringify(obj))

            if (fillable && Array.isArray(fillable)) {
                clone = fillable.reduce((current, prop) => Object.assign(current, {
                    [prop]: clone.hasOwnProperty(prop) ? clone[prop] : ''
                }), {})
            }

            return clone
        },
        isEqual(a, b, fillable = null) {
            return isEqual(this.cloneObject(a, fillable), this.cloneObject(b, fillable))
        },
        spliceByKey(array, key, value, item = null) {
            const i = array.findIndex(arrayItem => arrayItem[key] === value)

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
