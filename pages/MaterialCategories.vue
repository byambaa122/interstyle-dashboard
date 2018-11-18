<template>
    <Page :title="title">
        <div class="mt-3">
            <!-- Data table -->
            <DataTable
                :headers="headers"
                :items.sync="materialCategories"
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
                :model="materialCategory"
                :drawer.sync="drawer"
                @hide="$refs.table.getDataFromApi()"
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
                        v-model="materialCategory.name"
                        :error-messages="props.errorMessages('name')"
                        outline
                    ></v-text-field>
                    <!-- Icon field -->
                     <v-autocomplete
                        label="Айкон"
                        v-model="materialCategory.icon"
                        :error-messages="props.errorMessages('icon')"
                        :items="icons"
                        outline
                    >
                        <template
                            slot="item"
                            slot-scope="props"
                        >
                            <!-- Option avatar -->
                            <v-list-tile-avatar>
                                <v-icon>
                                    {{ props.item }}
                                </v-icon>
                            </v-list-tile-avatar>
                            <!-- Option title -->
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ props.item }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </v-autocomplete>
                </template>
            </DrawerForm>
        </div>
    </Page>
</template>

<script>
import {
    Page,
    MenuBottom,
    DataTable,
    DrawerForm
} from '~/components'

const defaultModel = {
    id: '',
    name: '',
    icon: ''
}

const apiBaseUrl = 'material/categories'

export default {
    layout: 'dashboard',
    components: {
        Page,
        MenuBottom,
        DataTable,
        DrawerForm
    },
    data() {
        return {
            title: 'Материал',
            baseUrl: apiBaseUrl,
            items: [
                {
                    title: 'Материал',
                    to: '/materials'
                },
                {
                    title: 'Ангилал',
                    to: '/materials/categories'
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
            materialCategory: defaultModel
        }
    },
    async asyncData({ app }) {
        // Get paginated material categories data
        const { data, total } = await app.$axios.$get(apiBaseUrl)

        // Get all font icons
        const { icons } = await app.$axios.$get('icons')

        return {
            icons,
            materialCategories: {
                data,
                total
            }
        }
    },
    methods: {
        setModel(data = defaultModel) {
            this.materialCategory = this.cloneObject(data, Object.keys(defaultModel))
            this.drawer = true
        }
    }
}
</script>
