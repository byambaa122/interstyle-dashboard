<template>
    <Page :title="title">
        <div class="mt-3">
            <!-- Data table -->
            <DataTable
                :headers="headers"
                :items.sync="users"
                :baseUrl="baseUrl"
                ref="table"
            >
                <!-- Data table rows -->
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.isAdmin ? 'Админ' : 'Хэрэглэгч' }}</td>
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
            <!-- Edit form -->
            <DrawerForm
                :model="user"
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
                        v-model="user.name"
                        :error-messages="props.errorMessages('name')"
                        outline
                    ></v-text-field>
                    <!-- Email field -->
                    <v-text-field
                        label="И-мэйл хаяг"
                        v-model="user.email"
                        outline
                    ></v-text-field>
                    <!-- Password field -->
                    <v-text-field
                        v-model="user.password"
                        :error-messages="props.errorMessages('password')"
                        :type="passwordFieldType"
                        :append-icon="passwordFieldIcon"
                        @click:append="showPassword = !showPassword"
                        label="Нууц үг солих"
                        outline
                    ></v-text-field>
                    <!-- Image field -->
                    <ImageUpload
                        v-model="user.avatar"
                        :error-messages="props.errorMessages('avatar')"
                    />
                    <!-- is Admin -->
                     <v-checkbox
                        label="Админ"
                        v-model="user.isAdmin"
                        color="primary"
                    ></v-checkbox>
                </template>
            </DrawerForm>
        </div>
    </Page>
</template>

<script>
import {
    Page,
    DataTable,
    DrawerForm,
    ImageUpload
} from '~/components'

const defaultModel = {
    id: '',
    name: '',
    email: '',
    avatar: '',
    password: '',
    isAdmin: false
}

const apiBaseUrl = 'users'

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
            title: 'Хэрэглэгч',
            baseUrl: apiBaseUrl,
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
            showPassword: false,
            user: defaultModel
        }
    },
    async asyncData({ app }) {
        const { data, total } = await app.$axios.$get(apiBaseUrl)

        return {
            users: {
                data,
                total
            }
        }
    },
    computed: {
        passwordFieldType() {
            return this.showPassword
                ? 'text'
                : 'password'
        },
        passwordFieldIcon() {
            return this.showPassword
                ? 'mdi-eye-off'
                : 'mdi-eye'
        }
    },
    methods: {
        setModel(data) {
            this.user = this.cloneObject(data, Object.keys(defaultModel))
            this.drawer = true
        }
    }
}
</script>
