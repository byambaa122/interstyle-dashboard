<template>
    <v-container
        grid-list-lg
        fluid
    >
        <!-- Page title -->
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
