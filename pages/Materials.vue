<template>
    <Page :title="title">
        <div class="mt-3">
            <!-- Data table -->
            <DataTable
                :headers="headers"
                :items.sync="materials"
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
                    <td>{{ props.item.code }}</td>
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
                :model="material"
                :drawer.sync="drawer"
                @hide="$refs.table.getDataFromApi()"
                :baseUrl="baseUrl"
                ref="form"
            >
                <template
                    slot="fields"
                    slot-scope="props"
                >
                    <!-- Code field -->
                    <v-text-field
                        label="Нэр"
                        v-model="material.code"
                        :error-messages="props.errorMessages('name')"
                        outline
                    ></v-text-field>
                    <!-- Material category field -->
                     <v-select
                        label="Ангилал"
                        v-model="material.materialCategory"
                        :error-messages="props.errorMessages('materialCategory')"
                        :items="materialCategories"
                        item-text="name"
                        return-object
                        outline
                    ></v-select>
                    <!-- Image field -->
                    <ImageUpload
                        v-model="material.images"
                        :error-messages="props.errorMessages('images')"
                        multiple
                    />
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
    DrawerForm,
    ImageUpload
} from '~/components'

const defaultModel = {
    id: '',
    code: '',
    images: [],
    materialCategory: {
        id: '',
        name: ''
    }
}

const apiBaseUrl = 'materials'

export default {
    layout: 'dashboard',
    components: {
        Page,
        MenuBottom,
        DataTable,
        DrawerForm,
        ImageUpload
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
                    text: 'Код',
                    value: 'code'
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
            material: defaultModel
        }
    },
    async asyncData({ app }) {
        // Get paginated materials data
        const { data, total } = await app.$axios.$get(apiBaseUrl)

        // Get all material categories
        const paginationData = await app.$axios.$get('material/categories', {
            params: {
                rowsPerPage: -1
            }
        })

        return {
            materialCategories: paginationData.data,
            materials: {
                data,
                total
            }
        }
    },
    methods: {
        setModel(data = defaultModel) {
            this.material = this.cloneObject(data, Object.keys(defaultModel))
            this.drawer = true
        }
    }
}
</script>
