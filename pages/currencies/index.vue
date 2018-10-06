<template>
    <v-container fluid grid-list-lg>
        <div class="page-title">Валют</div>
        <v-layout row wrap>
            <v-flex xs12 sm7 md6 lg4>
                <v-text-field v-model="search" append-icon="search" solo hide-details></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 md6 lg8 class="text-sm-right">
                <v-btn color="teal" :flat="!isMobile" :dark="isMobile" @click="setCurrency">
                    <v-icon left>add</v-icon>
                    Шинэ
                </v-btn>
            </v-flex>
        </v-layout>
        <v-card class="my-2">
            <v-data-table must-sort :headers="headers" :items="currencies" :search="search" :pagination.sync="pagination" no-data-text="Мэдээлэл олдсонгүй" no-results-text="Мэдээлэл олдсонгүй">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.rate | currency }}</td>
                    <td>{{ props.item.createdAt }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                    <td>
                        <v-layout justify-center>
                            <v-tooltip bottom>
                                <v-btn icon slot="activator" @click="setCurrency(props.item)">
                                    <v-icon color="teal">edit</v-icon>
                                </v-btn>
                                <span>Засах</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <v-btn icon slot="activator" @click="setCurrency(props.item, 'destroy')">
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
                    <div class="title mb-2">Валют</div>
                </v-card-title>
                <v-form @submit.prevent="currency.id ? updateCurrency() : storeCurrency()">
                    <v-container fluid grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xs12 md6>
                                <v-text-field box v-model="currency.name" :error-messages="nameErrors" label="Нэр"></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field box v-model="currency.rate" :error-messages="rateErrors" label="Ханш"></v-text-field>
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
                    <v-btn flat color="pink" @click="destroyCurrency" :loading="loading">Тийм</v-btn>
                    <v-btn flat color="secondary" @click="dialog.destroy = false">Үгүй</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

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
            currency: {
                id: '',
                name: '',
                rate: ''
            },
            search: '',
            headers: [
                {
                    text: 'Нэр',
                    value: 'name'
                },
                {
                    text: 'Ханш',
                    value: 'rate'
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
        const { currencies } = await app.$axios.$get('/currencies')
        return { currencies }
    },
    computed: {
        ...mapGetters([
            'isMobile'
        ]),
        nameErrors() {
            let errors = []
            if (this.errors.name) {
                errors = this.errors.name
            }

            return errors
        },
        rateErrors() {
            let errors = []
            if (this.errors.rate) {
                errors = this.errors.rate
            }

            return errors
        }
    },
    methods: {
        setCurrency(currency = null, type = 'update') {
            this.errors = {}
            this.dialog[type] = true
            this.currency = this.cloneObject(currency) || {
                id: '',
                name: '',
                rate: ''
            }
        },
        async storeCurrency() {
            this.errors = {}
            this.loading = true
            try {
                const { data } = await this.$axios.post('/currencies', this.currency)
                this.currencies.push(data.currency)
                this.dialog.update = false
                this.loading = false
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        },
        async updateCurrency() {
            this.errors = {}
            this.loading = true
            try {
                const { data } = await this.$axios.put(`/currencies/${this.currency.id}`, this.currency)
                this.spliceById(this.currencies, this.currency.id, data.currency)
                this.dialog.update = false
                this.loading = false
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        },
        async destroyCurrency() {
            this.loading = true
            await this.$axios.delete(`/currencies/${this.currency.id}`)
            this.spliceById(this.currencies, this.currency.id)
            this.dialog.destroy = false
            this.loading = false
        }
    }
}
</script>
