<template>
    <v-container
        class="pa-0"
        fluid
    >
        <v-layout
            justify-center
            row
        >
            <v-flex xs12 lg5 xl4>
                <v-card
                    class="mx-auto"
                    max-width="500px"
                    flat
                >
                    <v-form @submit.prevent="login()">
                        <v-card-text>
                            <!-- Logo -->
                            <v-img
                                src="/images/logo.png"
                                height="80"
                                contain
                            ></v-img>
                            <!-- Description -->
                            <div class="title font-weight-light text-xs-center grey--text text--darken-1 my-5">
                                Hello there! Sign in and start managing <br class="hidden-xs-only"> your website
                            </div>
                            <!-- Email field -->
                            <v-text-field
                                v-model="email"
                                :error-messages="errorMessages('email')"
                                label="И-мэйл хаяг"
                                box
                            ></v-text-field>
                            <!-- Password field -->
                            <v-text-field
                                v-model="password"
                                :error-messages="errorMessages('password')"
                                :type="passwordFieldType"
                                :append-icon="passwordFieldIcon"
                                @click:append="showPassword = !showPassword"
                                label="Нууц үг"
                                box
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <!-- Spacer -->
                            <v-spacer></v-spacer>
                            <!-- Submit button -->
                            <v-btn
                                :loading="loading"
                                type="submit"
                                class="white elevation-16 primary--text"
                                large
                                round
                            >
                                Нэвтрэх
                                <v-icon
                                    color="grey darken-1"
                                    right
                                >
                                    mdi-arrow-right
                                </v-icon>
                            </v-btn>
                            <!-- Spacer -->
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-form>
                </v-card>
                <!-- Forgot password -->
                <div class="subheading text-xs-center grey--text text--darken-1">
                    Нууц үгээ мартсан уу?
                    <a class="font-weight-medium ml-2">
                        Шинэчлэх
                    </a>
                </div>
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
    computed: {
        passwordFieldType() {
            return this.showPassword
                ? 'text'
                : 'password'
        },
        passwordFieldIcon() {
            return this.showPassword
                ? 'mdi-eye-off'
                : 'mdi-eye'
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
    padding-top 48px

    @media screen and (min-width: 960px)
        padding-top 112px

.v-card__actions
    padding 8px 16px

.subheading
    margin-top 40px
    margin-bottom 20px

    @media screen and (min-width: 375px)
        margin-top 100px
</style>
