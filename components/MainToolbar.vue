<template>
    <v-toolbar
        color="white"
        height="55"
        fixed
        flat
        app
    >
        <!-- Drawer toggle button -->
        <v-toolbar-side-icon
            @click="toggleDrawer()"
            v-if="isMobile"
        ></v-toolbar-side-icon>
        <!-- Mini variant toggle button -->
        <v-toolbar-side-icon
            @click="toggleMiniVariant()"
            v-else
        ></v-toolbar-side-icon>
        <!-- Spacer -->
        <v-spacer></v-spacer>
        <!-- Profile menu -->
        <v-menu
            class="ml-2"
            min-width="200"
            bottom
            left
        >
            <!-- Profile menu activator -->
            <v-btn
                slot="activator"
                large
                icon
            >
                <v-avatar size="36">
                    <img :src="avatarSrc" alt="Avatar">
                </v-avatar>
            </v-btn>
            <!-- Menu list -->
            <v-list>
                <v-list-tile @click="logout()">
                    <v-list-tile-title>
                        Гарах
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        drawer: {
            type: Boolean,
            required: true
        },
        miniVariant: {
            type: Boolean,
            required: true
        },
        isMobile: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            baseUrl: process.env.BASE_URL
        }
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
        avatarSrc() {
            return this.user.avatar && `${this.baseUrl}/${this.user.avatar}?w=60&h=60&fit=crop` || 'images/user.png'
        }
    },
    methods: {
        toggleDrawer() {
            this.$emit('update:drawer', !this.drawer)
        },
        toggleMiniVariant() {
            this.$emit('update:miniVariant', !this.miniVariant)
        },
        async logout() {
            await this.$auth.logout()
        }
    }
}
</script>
