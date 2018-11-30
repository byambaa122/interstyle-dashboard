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
        <DialogDelete
            :data="model.id"
            :dialog.sync="dialog"
            :baseUrl="baseUrl"
            @close="close"
        />
    </div>
</template>

<script>
import DialogDelete from '~/components/DialogDelete'

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
    components: {
        DialogDelete
    },
    data() {
        return {
            errors: {},
            loading: false,
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
        close() {
            this.setDrawer(false)
            this.$emit('close')
        }
    }
}
</script>
