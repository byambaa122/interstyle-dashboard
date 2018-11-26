<template>
    <v-footer
        height="auto"
        color="transparent"
        inset
        fixed
        app
    >
        <v-layout
            class="my-0"
            justify-center
            row
        >
            <v-card>
                <v-tabs
                    color="grey lighten-2"
                    slider-color="primary"
                    fixed-tabs
                >
                    <v-tab
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.to"
                        active-class="v-tabs__item--active primary--text"
                        exact
                        nuxt
                    >
                        {{ item.title }}
                    </v-tab>
                </v-tabs>
            </v-card>
        </v-layout>
    </v-footer>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.v-card
    border-top-left-radius 8px
    border-top-right-radius 8px
    overflow hidden
</style>
