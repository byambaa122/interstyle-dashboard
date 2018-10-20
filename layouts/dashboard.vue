<template>
    <v-app v-resize="onResize">
        <!-- Toolbar -->
        <MainToolbar
            :drawer.sync="drawer"
            :mini-variant.sync="miniVariant"
            :is-mobile="isMobile"
        />
        <!-- Navigation drawer -->
        <NavigationDrawer
            :drawer.sync="drawer"
            :mini-variant="miniVariant"
        />
        <!-- Page -->
        <v-content>
            <nuxt />
        </v-content>
    </v-app>
</template>

<script>
import MainToolbar from '~/components/MainToolbar'
import NavigationDrawer from '~/components/NavigationDrawer'

export default {
    middleware: 'authenticated',
    components: {
        MainToolbar,
        NavigationDrawer
    },
    data() {
        return {
            drawer: true,
            miniVariant: true,
            isMobile: false
        }
    },
    mounted() {
        this.onResize()
    },
    watch: {
        isMobile(value) {
            this.miniVariant = !value
        }
    },
    methods: {
        onResize() {
            this.isMobile = window.innerWidth < 1264
        }
    }
}
</script>
