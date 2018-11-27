<template>
    <Page :title="title">
        <div class="mt-3">
            <!-- Data table -->
            <DataTable
                :headers="headers"
                :items.sync="quotes"
                :baseUrl="baseUrl"
                ref="table"
            >
                <!-- Actions -->
                <template slot="actions">
                    <div class="text-xs-right">
                        <v-btn
                            @click="setModel()"
                            class="teal lighten-5 teal--text"
                            flat
                        >
                            <v-icon left>
                                mdi-plus-circle-outline
                            </v-icon>
                            Шинэ
                        </v-btn>
                    </div>
                </template>
                <!-- Data table rows -->
                <template
                    slot="items"
                    slot-scope="props"
                >
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.createdAt }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                    <td class="text-xs-right">
                        <v-btn
                            @click="setModel(props.item)"
                            icon
                        >
                            <v-icon color="grey">
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </td>
                </template>
            </DataTable>
            <!-- Bottom navigation -->
            <MenuBottom :items="items" />
            <!-- Edit form -->
            <DrawerForm
                :model="quote"
                :drawer.sync="drawer"
                @close="$refs.table.getDataFromApi()"
                :baseUrl="baseUrl"
                ref="form"
            >
                <template
                    slot="fields"
                    slot-scope="props"
                >
                    <!-- Name field -->
                    <v-text-field
                        label="Нэр"
                        v-model="quote.name"
                        :error-messages="props.errorMessages('name')"
                        outline
                    ></v-text-field>
                    <!-- Body field -->
                    <v-textarea
                        label="Сэтгэгдэл"
                        v-model="quote.body"
                        :error-messages="props.errorMessages('body')"
                        outline
                    ></v-textarea>
                </template>
            </DrawerForm>
        </div>
    </Page>
</template>

<script>
import {
    DataTable,
    DrawerForm,
    MenuBottom,
    Page
} from '~/components'

const defaultModel = {
    id: '',
    name: '',
    body: ''
}

const apiBaseUrl = 'manage/quotes'

export default {
    layout: 'dashboard',
    components: {
        DataTable,
        DrawerForm,
        MenuBottom,
        Page
    },
    data() {
        return {
            title: 'Ишлэл',
            baseUrl: apiBaseUrl,
            items: [
                {
                    title: 'Ишлэл',
                    to: '/settings/quotes'
                },
                {
                    title: 'Онцлог',
                    to: '/settings/features'
                }
            ],
            headers: [
                {
                    text: 'Нэр',
                    value: 'name'
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
            drawer: false,
            quote: defaultModel
        }
    },
    async asyncData({ app }) {
        // Get paginated material categories data
        const { data, total } = await app.$axios.$get(apiBaseUrl)

        return {
            quotes: {
                data,
                total
            }
        }
    },
    methods: {
        setModel(data = defaultModel) {
            this.quote = this.cloneObject(data, Object.keys(defaultModel))
            this.drawer = true
        }
    }
}
</script>
