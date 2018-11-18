<template>
    <v-footer
        height="auto"
        inset
        fixed
        app
    >
        <v-card width="100%">
            <v-tabs
                hide-slider
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
