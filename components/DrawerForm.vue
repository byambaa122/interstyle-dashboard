<template>
    <div>
        <v-navigation-drawer
            :value="drawer"
            @input="setDrawer"
            class="white"
            width="400"
            temporary
            fixed
            right
            app
        >
            <v-toolbar
                color="white"
                height="55"
                flat
            >
                <!-- Drawer close button -->
                <v-btn
                    @click="setDrawer(false)"
                    icon
                >
                    <v-icon color="grey">
                        mdi-close
                    </v-icon>
                </v-btn>
            </v-toolbar>
            <!-- Divider -->
            <v-divider></v-divider>
            <!-- Edit form -->
            <v-card
                class="mt-4"
                flat
            >
                <v-form @submit.prevent="storeOrUpdate">
                    <v-card-text>
                        <!-- Form fields -->
                        <slot
                            name="fields"
                            :error-messages="errorMessages"
                        ></slot>
                    </v-card-text>
                    <v-card-actions>
                        <!-- Spacer -->
                        <v-spacer></v-spacer>
                        <!-- Submit button -->
                        <v-btn
                            type="submit"
                            color="primary"
                            :loading="loading"
                        >Хадгалах</v-btn>
                        <!-- Delete button -->
                        <template v-if="deletable && !!model.id">
                            <!-- Delete button -->
                            <v-btn
                                @click="dialog = true"
                                flat
                            >
                                <v-icon color="pink">
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-navigation-drawer>
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
                        :loading="deleting"
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
        model: {
            type: Object,
            required: true
        },
        drawer: {
            type: Boolean,
            default: true
        },
        baseUrl: {
            type: String,
            required: true
        },
        deletable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            errors: {},
            loading: false,
            deleting: false,
            dialog: false
        }
    },
    watch: {
        drawer() {
            this.errors = {}
        }
    },
    methods: {
        setDrawer(value) {
            this.$emit('update:drawer', value)
        },
        errorMessages(prop) {
            let errors = []
            if (this.errors.hasOwnProperty(prop)) {
                errors = this.errors[prop]
            }

            return errors
        },
        async storeOrUpdate() {
            try {
                this.errors = {}
                this.loading = true
                await this.$axios.post(this.baseUrl, this.model)
                this.loading = false
                this.close()
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        },
        async destroy() {
            this.deleting = true
            await this.$axios.delete(`${this.baseUrl}/${this.model.id}`)
            this.deleting = false
            this.dialog = false
            this.close()
        },
        close() {
            this.setDrawer(false)
            this.$emit('close')
        }
    }
}
</script>
