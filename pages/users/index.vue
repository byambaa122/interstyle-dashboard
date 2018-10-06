<template>
    <v-container fluid grid-list-lg>
        <div class="page-title">Хэрэглэгч</div>
        <v-layout row wrap>
            <v-flex xs12 sm7 md6 lg4>
                <v-text-field v-model="search" append-icon="search" solo hide-details></v-text-field>
            </v-flex>
        </v-layout>
        <v-card class="my-2">
            <v-data-table must-sort :headers="headers" :items="users" :search="search" :pagination.sync="pagination" no-data-text="Мэдээлэл олдсонгүй" no-results-text="Мэдээлэл олдсонгүй">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.createdAt }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                    <td>
                        <v-layout justify-center>
                            <v-tooltip bottom>
                                <v-btn icon slot="activator" @click="setUser(props.item)">
                                    <v-icon color="teal">edit</v-icon>
                                </v-btn>
                                <span>Засах</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <v-btn icon slot="activator" @click="setUser(props.item, 'destroy')">
                                    <v-icon color="pink">clear</v-icon>
                                </v-btn>
                                <span>Устгах</span>
                            </v-tooltip>
                        </v-layout>
                    </td>
                </template>
                <template slot="pageText" slot-scope="props">
                    <v-chip color="amber" text-color="white">
                        <v-avatar class="amber darken-4">{{ props.itemsLength }}</v-avatar>
                        Нийт
                    </v-chip>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog.update" width="640">
            <v-card>
                <v-card-title>
                    <div class="title mb-2">Хэрэглэгч</div>
                </v-card-title>
                <v-form @submit.prevent="updateUser">
                    <v-container fluid grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xs12 md6>
                                <v-text-field box v-model="user.name" :error-messages="nameErrors" label="Нэр"></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field box v-model="user.email" :error-messages="emailErrors" label="И-мэйл хаяг"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" type="submit" :loading="loading">Хадгалах</v-btn>
                        <v-btn flat color="secondary" @click="dialog.update = false">Болих</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog.destroy" width="640">
            <v-card>
                <v-card-title>
                    <div class="title">Устгах</div>
                </v-card-title>
                <v-card-text class="text--secondary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisinuli.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="pink" @click="destroyUser" :loading="loading">Тийм</v-btn>
                    <v-btn flat color="secondary" @click="dialog.destroy = false">Үгүй</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
        return {
            errors: {},
            loading: false,
            dialog: {
                update: false,
                destroy: false
            },
            user: {
                id: '',
                name: '',
                email: '',
                password: ''
            },
            search: '',
            headers: [
                {
                    text: 'Нэр',
                    value: 'name'
                },
                {
                    text: 'И-мэйл хаяг',
                    value: 'email'
                },
                {
                    text: 'Үүсгэсэн',
                    value: 'createdAt'
                },
                {
                    text: 'Шинэчилсэн',
                    value: 'updatedAt'
                },
                {
                    text: '',
                    sortable: false
                }
            ],
            pagination: {
                sortBy: 'createdAt',
                descending: true,
                rowsPerPage: 25
            }
        }
    },
    async asyncData({ app }) {
        const { users } = await app.$axios.$get('/users')
        return { users }
    },
    computed: {
        nameErrors() {
            let errors = []
            if (this.errors.name) {
                errors = this.errors.name
            }

            return errors
        },
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
        setUser(user = null, type = 'update') {
            this.errors = {}
            this.dialog[type] = true
            this.user = this.cloneObject(user)
        },
        async updateUser() {
            this.errors = {}
            this.loading = true
            try {
                const { data } = await this.$axios.put(`/users/${this.user.id}`, this.user)
                this.spliceById(this.users, this.user.id, data.user)
                this.dialog.update = false
                this.loading = false
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        },
        async destroyUser() {
            this.loading = true
            await this.$axios.delete(`/users/${this.user.id}`)
            this.spliceById(this.users, this.user.id)
            this.dialog.destroy = false
            this.loading = false
        }
    }
}
</script>
