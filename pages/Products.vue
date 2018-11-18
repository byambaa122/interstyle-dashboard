<template>
    <Page :title="title">
        <div class="mt-3">
            <!-- Data table -->
            <DataTable
                :headers="headers"
                :items.sync="products"
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
                :model="product"
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
                        v-model="product.code"
                        :error-messages="props.errorMessages('name')"
                        outline
                    ></v-text-field>
                    <!-- Product category field -->
                     <v-select
                        label="Ангилал"
                        v-model="product.productCategory"
                        :error-messages="props.errorMessages('productCategory')"
                        :items="productCategories"
                        item-text="name"
                        return-object
                        outline
                    ></v-select>
                    <!-- Image field -->
                    <ImageUpload
                        v-model="product.images"
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
    productCategory: {
        id: '',
        name: ''
    }
}

const apiBaseUrl = 'products'

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
            title: 'Бүтээгдэхүүн',
            baseUrl: apiBaseUrl,
            items: [
                {
                    title: 'Бүтээгдэхүүн',
                    to: '/products'
                },
                {
                    title: 'Ангилал',
                    to: '/products/categories'
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
            product: defaultModel
        }
    },
    async asyncData({ app }) {
        // Get paginated products data
        const { data, total } = await app.$axios.$get(apiBaseUrl)

        // Get all product categories
        const paginationData = await app.$axios.$get('product/categories', {
            params: {
                rowsPerPage: -1
            }
        })

        return {
            productCategories: paginationData.data,
            products: {
                data,
                total
            }
        }
    },
    methods: {
        setModel(data = defaultModel) {
            this.product = this.cloneObject(data, Object.keys(defaultModel))
            this.drawer = true
        }
    }
}
</script>
