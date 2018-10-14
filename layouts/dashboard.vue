<template>
    <v-app>
        <v-navigation-drawer class="main" v-model="drawer" mobile-break-point="1650" fixed app>
            <router-link class="drawer-image" to="/">
                <img src="images/logo-small.png" height="35">
            </router-link>
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
        <v-toolbar color="white" height="55" fixed flat app>
            <v-toolbar-side-icon @click="toggleDrawer()"></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-btn class="grey--text" icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-menu class="ml-2" min-width="200" bottom left>
                <v-btn slot="activator" icon large>
                    <v-avatar size="36">
                        <img src="images/user.png" alt="Avatar">
                    </v-avatar>
                </v-btn>
                <v-list>
                    <v-list-tile @click="logout()">
                        <v-list-tile-title>Гарах</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-content>
            <nuxt />
        </v-content>
    </v-app>
</template>

<script>
export default {
    middleware: 'authenticated',
    data() {
        return {
            drawer: true,
            items: [
                { icon: 'mdi-home', title: 'Нүүр', to: '/' },
                { icon: 'mdi-account', title: 'Хэрэглэгч', to: '/users' },
                { icon: 'mdi-layers', title: 'Ангилал', to: '/products/categories' }
            ]
        }
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer
        },
        async logout() {
            await this.$auth.logout()
            this.$router.push('/login')
        }
    }
}
</script>
