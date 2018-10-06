import Vue from 'vue'
import { Resize } from 'vuetify/es5/directives'
import {
    Vuetify,
    VApp,
    VCard,
    VNavigationDrawer,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VDatePicker,
    VMenu,
    VTextField,
    VTextarea,
    VSelect,
    VTooltip,
    VJumbotron,
    VForm,
    VDataTable,
    VPagination,
    VDivider,
    VDialog,
    VAvatar,
    VChip
} from 'vuetify'

Vue.use(Vuetify, {
    theme: {
        primary: '#04639b'
    },
    components: {
        VApp,
        VCard,
        VNavigationDrawer,
        VList,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        VDatePicker,
        VMenu,
        VTextField,
        VTextarea,
        VSelect,
        VTooltip,
        VJumbotron,
        VForm,
        VDataTable,
        VPagination,
        VDivider,
        VDialog,
        VAvatar,
        VChip
    },
    directives: {
        Resize
    }
})
