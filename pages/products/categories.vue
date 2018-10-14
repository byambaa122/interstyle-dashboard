<template>
    <Page :title="title">
        <div class="mt-3">
            <ListTable url="product/categories" :headers="headers">
                <template slot="actions">
                    <div class="text-xs-right">
                        <v-btn color="primary" @click="setProductCategory" dark>
                            <v-icon left>add</v-icon>
                            Шинэ
                        </v-btn>
                    </div>
                </template>
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.createdAt }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                    <td class="text-xs-right">
                        <v-btn icon @click="setProductCategory(props.item)">
                            <v-icon color="teal">mdi-pencil</v-icon>
                        </v-btn>
                    </td>
                </template>
            </ListTable>
        </div>
    </Page>
</template>

<script>
import Page from '~/components/Page'
import ListTable from '~/components/ListTable'

export default {
    layout: 'dashboard',
    components: {
        Page,
        ListTable
    },
    data() {
        return {
            title: 'Ангилал',
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
            fillable: [
                'id',
                'name',
                'image'
            ],
            productCategory: {
                id: '',
                name: '',
                image: ''
            }
        }
    },
    async fetch({ store }) {
        await store.dispatch('fetchData', {
            url: 'product/categories'
        })
    },
    methods: {
        setProductCategory(data = {}) {
            this.productCategory = this.cloneObject(data, this.fillable)
            this.drawer = true
        }
    }
}
</script>
