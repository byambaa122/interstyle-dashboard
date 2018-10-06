<template>
    <v-container fluid>
        <v-layout justify-center row wrap>
            <v-flex xs12 sm8 md6 lg4>
                <v-card class="mt-4 pt-4">
                    <v-card-media src="images/logo.png" height="45" contain></v-card-media>
                    <v-form @submit.prevent="login()">
                        <v-card-text>
                            <v-text-field v-model="email" :error-messages="emailErrors" label="И-мэйл хаяг"></v-text-field>
                            <v-text-field v-model="password" :error-messages="passwordErrors" :append-icon="showPassword ? 'visibility_off' : 'visibility'" @click:append="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'" label="Нууц үг"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat type="submit" color="primary" class="mt-3" :loading="loading">Нэвтрэх</v-btn>
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
    computed: {
        emailErrors() {
            let errors = []
            if (this.errors.email) {
                errors = this.errors.email
            }

            return errors
        },
        passwordErrors() {
            let errors = []
            if (this.errors.password) {
                errors = this.errors.password
            }

            return errors
        }
    },
    methods: {
        async login() {
            this.errors = {}
            this.loading = true

            try {
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
    padding-top: 25px;

@media (min-width: 600px)
    .v-card__text
        padding: 30px 45px 10px;

    .v-card__actions
        padding: 0 45px 30px;
</style>
