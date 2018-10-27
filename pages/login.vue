<template>
    <v-container fluid>
        <v-layout justify-center row wrap>
            <v-flex xs12 sm8 md6 lg4>
                <v-card class="mt-4 pt-4" flat>
                    <v-form @submit.prevent="login()">
                        <v-card-text>
                            <!-- Logo -->
                            <v-img
                                class="mb-5"
                                src="/images/logo.png"
                                position="left center"
                                height="80"
                                contain
                            ></v-img>
                            <!-- Email field -->
                            <v-text-field
                                v-model="email"
                                :error-messages="errorMessages('email')"
                                label="И-мэйл хаяг"
                                outline
                            ></v-text-field>
                            <!-- Password field -->
                            <v-text-field
                                v-model="password"
                                :error-messages="errorMessages('password')"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                label="Нууц үг"
                                outline
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- Submit button -->
                            <v-btn
                                :loading="loading"
                                type="submit"
                                color="blue-grey lighten-5"
                                class="elevation-0"
                                large
                            >
                                Нэвтрэх
                                <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            errors: {},
            loading: false,
            showPassword: false,
            email: '',
            password: ''
        }
    },
    methods: {
        errorMessages(prop) {
            let errors = []
            if (this.errors.hasOwnProperty(prop)) {
                errors = this.errors[prop]
            }

            return errors
        },
        async login() {
            try {
                this.errors = {}
                this.loading = true
                await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.v-card__text
    padding-top 25px

@media (min-width: 600px)
    .v-card__text
        padding 30px 45px 10px

    .v-card__actions
        padding 0 45px 30px
</style>
