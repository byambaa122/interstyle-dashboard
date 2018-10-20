<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 sm7 md6 lg4>
                <!-- Search input -->
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    hide-details
                    solo
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 md6 lg8>
                <!-- Other actions slot -->
                <slot name="actions"></slot>
            </v-flex>
        </v-layout>
        <v-card class="my-2">
            <!-- Data table -->
            <v-data-table
                :headers="headers"
                :items="items.data"
                :total-items="items.total"
                :pagination.sync="pagination"
                :select-all="selectable"
                :loading="loading"
                v-model="selected"
                rows-per-page-text="Нэг хуудсанд"
                no-results-text="Мэдээлэл олдсонгүй"
                no-data-text="Мэдээлэл олдсонгүй"
                must-sort
            >
                <!-- Progress bar -->
                <v-progress-linear
                    slot="progress"
                    background-opacity="0.2"
                    color="primary"
                    height="3"
                    indeterminate
                ></v-progress-linear>
                <!-- Rows -->
                <template slot="items" slot-scope="props">
                    <tr>
                        <!-- Selectable row -->
                        <td v-if="selectable">
                            <v-checkbox
                                color="primary"
                                v-model="props.selected"
                                hide-details
                            ></v-checkbox>
                        </td>
                        <!-- Row slot -->
                        <slot name="items" :item="props.item">
                            <td  v-for="(header, i) in headers" :key="i">
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
export default {
    props: {
        headers: {
            type: Array,
            required: true
        },
        items: {
            type: Object,
            required: true
        },
        defaultPagination: {
            type: Object,
            default() {
                return {
                    page: 1,
                    rowsPerPage: 25,
                    sortBy: 'createdAt',
                    descending: true
                }
            }
        },
        selectable: {
            type: Boolean,
            default: false
        },
        baseUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            search: '',
            loading: false,
            selected: [],
            pagination: this.defaultPagination
        }
    },
    watch: {
        pagination: {
            handler(newValue, value) {
                const props = [
                    'page',
                    'rowsPerPage',
                    'sortBy',
                    'descending'
                ]

                // Watch only specified props
                if (!this.isEqual(newValue, value, props)) {
                    this.getDataFromApi()
                }
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
        async getDataFromApi() {
            this.loading = true

            const {
                page,
                rowsPerPage,
                sortBy,
                descending
            } = this.pagination

            const params = {
                page,
                rowsPerPage,
                sortBy,
                direction: descending ? 'desc' : 'asc',
                search: this.search
            }

            // Fetch data
            const { total, data } = await this.$axios.$get(this.baseUrl, {
                progress: false,
                params
            })

            this.$emit('update:items', { total, data })
            this.loading = false
        }
    }
}
</script>
