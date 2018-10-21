<template>
    <Page :title="title">
        <div class="mt-3">
            <!-- Data table -->
            <DataTable
                :headers="headers"
                :items.sync="productCategories"
                :baseUrl="baseUrl"
                ref="table"
            >
                <!-- Data table rows -->
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.createdAt }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                    <td class="text-xs-right">
                        <v-btn @click="setModel(props.item)" icon>
                            <v-icon color="grey">mdi-pencil</v-icon>
                        </v-btn>
                    </td>
                </template>
            </DataTable>
            <!-- Edit form -->
            <DrawerForm
                :model="productCategory"
                :drawer.sync="drawer"
                @hide="$refs.table.getDataFromApi()"
                :baseUrl="baseUrl"
                ref="form"
            >
                <template slot="fields" slot-scope="props">
                    <!-- Name field -->
                    <v-text-field
                        label="Нэр"
                        v-model="productCategory.name"
                        :error-messages="props.errorMessages('name')"
                        outline
                    ></v-text-field>
                    <!-- Image field -->
                    <ImageUpload
                        v-model="productCategory.image"
                        :error-messages="props.errorMessages('image')"
                    />
                </template>
            </DrawerForm>
        </div>
    </Page>
</template>

<script>
import Page from '~/components/Page'
import DataTable from '~/components/DataTable'
import DrawerForm from '~/components/DrawerForm'
import ImageUpload from '~/components/ImageUpload'

const defaultModel = {
    id: '',
    name: '',
    image: ''
}

const apiBaseUrl = 'product/categories'

export default {
    layout: 'dashboard',
    components: {
        Page,
        DataTable,
        DrawerForm,
        ImageUpload
    },
    data() {
        return {
            title: 'Ангилал',
            baseUrl: apiBaseUrl,
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
            productCategory: defaultModel
        }
    },
    async asyncData({ app }) {
        const { data, total } = await app.$axios.$get(apiBaseUrl)

        return {
            productCategories: {
                data,
                total
            }
        }
    },
    methods: {
        setModel(data) {
            this.productCategory = this.cloneObject(data, Object.keys(defaultModel))
            this.drawer = true
        }
    }
}
</script>
