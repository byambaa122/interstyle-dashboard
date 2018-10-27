<template>
    <v-navigation-drawer
        :value="drawer"
        @input="setDrawer"
        class="white"
        width="400"
        fixed
        right
    >
        <v-toolbar
            color="white"
            height="55"
            flat
        >
            <!-- Drawer close button -->
            <v-btn color="grey" @click="setDrawer(false)" flat icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <!-- Spacer -->
            <v-spacer></v-spacer>
            <!-- Delete button -->
            <template v-if="deletable && !!model.id">
                <DrawerFormDelete @delete="hide" :baseUrl="baseUrl" :id="model.id" />
            </template>
        </v-toolbar>
        <!-- Divider -->
        <v-divider></v-divider>
        <!-- Edit form -->
        <v-card class="mt-4" flat>
            <v-form @submit.prevent="storeOrUpdate">
                <v-card-text>
                    <!-- Form fields -->
                    <slot name="fields" :error-messages="errorMessages"></slot>
                </v-card-text>
                <v-card-actions>
                    <!-- Spacer -->
                    <v-spacer></v-spacer>
                    <!-- Submit button -->
                    <v-btn
                        type="submit"
                        color="primary"
                        :loading="loading"
                        flat
                    >Хадгалах</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import DrawerFormDelete from '~/components/DrawerFormDelete'

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
        DrawerFormDelete
    },
    data() {
        return {
            errors: {},
            loading: false
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
                this.hide()
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        },
        hide() {
            this.setDrawer(false)
            this.$emit('hide')
        }
    }
}
</script>
