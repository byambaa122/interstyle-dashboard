<template>
    <div>
        <!-- Delete button -->
        <v-btn
            color="pink"
            @click="dialog = true"
            flat
            icon
        >
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <!-- Warning dialog -->
        <v-dialog
            v-model="dialog"
            width="640"
        >
            <v-card>
                <!-- Dialog title -->
                <v-card-title>
                    <div class="title">
                        Устгах
                    </div>
                </v-card-title>
                <!-- Dialog body text -->
                <v-card-text class="text--secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus odio magna, eget tincidunt ligula semper nec.
                </v-card-text>
                <v-card-actions>
                    <!-- Spacer -->
                    <v-spacer></v-spacer>
                    <!-- Confirm button -->
                    <v-btn
                        :loading="loading"
                        @click="destroy"
                        color="pink"
                        flat
                    >Тийм</v-btn>
                    <!-- Cancel button -->
                    <v-btn
                        @click="dialog = false"
                        color="secondary"
                        flat
                    >Үгүй</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        baseUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            loading: false
        }
    },
    methods: {
        async destroy() {
            this.loading = true
            await this.$axios.delete(`${this.baseUrl}/${this.id}`)

            // Emit deleted event
            this.$emit('delete')

            this.loading = false
            this.dialog = false
        }
    }
}
</script>
