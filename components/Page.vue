<template>
    <v-container fluid grid-list-lg>
        <div class="page-title">
            {{ title }}
        </div>
        <slot></slot>
    </v-container>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>
