<template>
    <v-navigation-drawer
        :value="drawer"
        :mini-variant="miniVariant"
        @input="setDrawer"
        class="main"
        fixed
        app
    >
        <!-- Logo -->
        <router-link class="drawer-image" to="/">
            <img :src="imageSrc" height="35">
        </router-link>
        <!-- Main menu -->
        <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" nuxt exact>
                <v-list-tile-action>
                    <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        drawer: {
            type: Boolean,
            required: true
        },
        miniVariant: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            items: [
                { icon: 'mdi-home', title: 'Нүүр', to: '/' },
                { icon: 'mdi-account', title: 'Хэрэглэгч', to: '/users' },
                { icon: 'mdi-layers', title: 'Ангилал', to: '/products/categories' }
            ]
        }
    },
    computed: {
        imageSrc() {
            return this.miniVariant
                ? '/images/logo-symbol.png'
                : '/images/logo-small.png'
        }
    },
    methods: {
        setDrawer(value) {
            this.$emit('update:drawer', value)
        }
    }
}
</script>
