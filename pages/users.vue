<template>
    <Page :title="title">
        <div class="mt-3">
            <ListTable url="users" :headers="headers">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.isAdmin ? 'Админ' : 'Хэрэглэгч' }}</td>
                    <td>{{ props.item.createdAt }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                    <td class="text-xs-right">
                        <v-btn icon @click="setUser(props.item)">
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
            title: 'Хэрэглэгч',
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
                    text: 'Эрх',
                    value: 'isAdmin'
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
                'email',
                'isAdmin'
            ],
            user: {
                id: '',
                name: '',
                email: '',
                isAdmin: false
            }
        }
    },
    async fetch({ store }) {
        await store.dispatch('fetchData', {
            url: 'users'
        })
    },
    methods: {
        setUser(data) {
            this.user = this.cloneObject(data, this.fillable)
            this.drawer = true
        }
    }
}
</script>
