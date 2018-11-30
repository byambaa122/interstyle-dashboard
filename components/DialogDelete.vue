<template>
    <v-dialog
        :value="dialog"
        @input="setDialog"
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
                    @click="setDialog(false)"
                    color="secondary"
                    flat
                >Үгүй</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        data: {
            type: [String, Number],
            required: true
        },
        dialog: {
            type: Boolean,
            required: true
        },
        baseUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        setDialog(value) {
            this.$emit('update:dialog', value)
        },
        async destroy() {
            this.loading = true
            await this.$axios.delete(`${this.baseUrl}/${this.data}`)
            this.loading = false
            this.close()
        },
        close() {
            this.setDialog(false)
            this.$emit('close')
        }
    }
}
</script>
