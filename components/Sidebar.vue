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
        <router-link
            class="drawer-image"
            to="/"
        >
            <v-img
                :src="imageSrc"
                position="left center"
                height="35"
                contain
            ></v-img>
        </router-link>
        <!-- Main menu -->
        <v-list>
            <v-list-tile
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
                nuxt
            >
                <!-- Icon -->
                <v-list-tile-action>
                    <v-icon>
                        {{ item.icon }}
                    </v-icon>
                </v-list-tile-action>
                <!-- Title -->
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.title }}
                    </v-list-tile-title>
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
                { icon: 'mdi-account', title: 'Хэрэглэгч', to: '/' },
                { icon: 'mdi-lamp', title: 'Бүтээгдэхүүн', to: '/products' },
                { icon: 'mdi-wall', title: 'Материал', to: '/materials' },
                { icon: 'mdi-settings', title: 'Нэмэлт', to: '/settings/quotes' }
            ]
        }
    },
    computed: {
        imageSrc() {
            return this.miniVariant
                ? 'images/logo-symbol.png'
                : 'images/logo-small.png'
        }
    },
    methods: {
        setDrawer(value) {
            this.$emit('update:drawer', value)
        }
    }
}
</script>
