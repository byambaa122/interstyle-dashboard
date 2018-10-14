<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 sm7 md6 lg4>
                <v-text-field v-model="search" append-icon="search" solo hide-details></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 md6 lg8>
                <slot name="actions"></slot>
            </v-flex>
        </v-layout>
        <v-card class="my-2">
            <v-data-table :headers="headers" :items="list.data" :total-items="list.total" :pagination.sync="pagination" :select-all="selectable" :value="list.selected" @input="updateSelectedItems" :loading="loading" rows-per-page-text="Нэг хуудсанд" no-data-text="Мэдээлэл олдсонгүй" no-results-text="Мэдээлэл олдсонгүй" must-sort>
                <v-progress-linear slot="progress" color="primary" background-opacity="0.2" height="3" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td v-if="selectable">
                            <v-checkbox color="primary" v-model="props.selected" hide-details></v-checkbox>
                        </td>
                        <slot name="items" :item="props.item">
                            <td v-for="(header, i) in headers" :key="i">
                                {{ props.item[header.value] }}
                            </td>
                        </slot>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            search: '',
            loading: false,
            pagination: {
                page: 1,
                rowsPerPage: 25,
                sortBy: 'createdAt',
                descending: true
            }
        }
    },
    props: {
        headers: {
            type: Array,
            required: true
        },
        selectable: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters([
            'list'
        ])
    },
    watch: {
        pagination: {
            handler(value) {
                this.getDataFromApi()
            },
            deep: true
        },
        search: {
            handler(value) {
                this.debounced(this.getDataFromApi)
            },
            deep: true
        }
    },
    methods: {
        ...mapActions([
            'fetchData',
            'updateSelectedItems'
        ]),
        async getDataFromApi() {
            this.loading = true

            const { page, rowsPerPage, sortBy, descending } = this.pagination

            const params = {
                page,
                rowsPerPage,
                sortBy,
                direction: descending ? 'desc' : 'asc',
                search: this.search
            }

            // Fetch data
            await this.fetchData({
                url: this.url,
                params
            })

            this.loading = false
        }
    }
}
</script>
