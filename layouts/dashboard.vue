<template>
    <v-app v-resize="onResize">
        <v-navigation-drawer v-model="drawer" fixed app>
            <router-link class="drawer-image" to="/">
                <img src="images/logo-white.png" height="35">
            </router-link>
            <v-list>
                <v-list-tile v-for="(item, i) in items" :key="`items${i}`" :to="item.to" nuxt exact>
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-sub-title v-text="item.title"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-tile v-for="(item, i) in settings" :key="`settings${i}`" :to="item.to" nuxt exact>
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-sub-title v-text="item.title"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="white" height="55" fixed flat app>
            <v-toolbar-side-icon @click="toggleDrawer()"></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-btn outline @click="logout()">
                Гарах
                <v-icon class="ml-2">exit_to_app</v-icon>
            </v-btn>
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
                { icon: 'home', title: 'Нүүр', to: '/' },
                { icon: 'receipt', title: 'Захиалга', to: '/reservations' },
                { icon: 'hotel', title: 'Буудал, Амралтын газар', to: '/hotels' },
                { icon: 'edit', title: 'Нийтлэл', to: '/posts' },
                { icon: 'person', title: 'Хэрэглэгч', to: '/users' }
            ],
            settings: [
                { icon: 'star', title: 'Буудлын онцлог', to: '/features' },
                { icon: 'room_service', title: 'Нэмэлт үйлчилгээ', to: '/services' },
                { icon: 'description', title: 'Үйлчилгээний нөхцөл', to: '/s' },
                { icon: 'map', title: 'Хот (Аймаг), Дүүрэг (Сум)', to: '/cities' },
                { icon: 'place', title: 'Түгээмэл байршил', to: '/destinations' },
                { icon: 'local_atm', title: 'Валют', to: '/currencies' }
            ]
        }
    },
    created() {
        this.onResize()
    },
    methods: {
        onResize() {
            if (process.browser) {
                const isMobile = window.innerWidth < 600
                this.$store.commit('isMobile', isMobile)
            }
        },
        toggleDrawer() {
            this.drawer = !this.drawer
        },
        async logout() {
            this.$auth.logout()
            await this.$router.push('/login')
        }
    }
}
</script>
