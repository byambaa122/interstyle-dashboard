<template>
    <v-container fluid grid-list-lg>
        <div class="page-title">Нийтлэл</div>
        <v-layout row wrap>
            <v-flex xs12 sm7 md6 lg4>
                <v-text-field v-model="search" append-icon="search" solo hide-details></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 md6 lg8 class="text-sm-right">
                <v-btn color="teal" :flat="!isMobile" :dark="isMobile" @click="setPost">
                    <v-icon left>add</v-icon>
                    Шинэ
                </v-btn>
            </v-flex>
        </v-layout>
        <v-card class="my-2">
            <v-data-table must-sort :headers="headers" :items="posts" :search="search" :pagination.sync="pagination" no-data-text="Мэдээлэл олдсонгүй" no-results-text="Мэдээлэл олдсонгүй">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.createdAt }}</td>
                    <td>{{ props.item.updatedAt }}</td>
                    <td>
                        <v-layout justify-center>
                            <v-tooltip bottom>
                                <v-btn icon slot="activator" @click="setPost(props.item)">
                                    <v-icon color="teal">edit</v-icon>
                                </v-btn>
                                <span>Засах</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <v-btn icon slot="activator" @click="setPost(props.item, 'destroy')">
                                    <v-icon color="pink">clear</v-icon>
                                </v-btn>
                                <span>Устгах</span>
                            </v-tooltip>
                        </v-layout>
                    </td>
                </template>
                <template slot="pageText" slot-scope="props">
                    <v-chip color="amber" text-color="white">
                        <v-avatar class="amber darken-4">{{ props.itemsLength }}</v-avatar>
                        Нийт
                    </v-chip>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog.update" width="640">
            <v-card>
                <v-card-title>
                    <div class="title mb-2">Нийтлэл</div>
                </v-card-title>
                <v-form @submit.prevent="post.id ? updatePost() : storePost()">
                    <v-card-text>
                        <v-text-field box v-model="post.title" :error-messages="titleErrors" label="Гарчиг"></v-text-field>
                        <v-textarea box v-model="post.body" label="Агуулга"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" type="submit" :loading="loading">Хадгалах</v-btn>
                        <v-btn flat color="secondary" @click="dialog.update = false">Болих</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog.destroy" width="640">
            <v-card>
                <v-card-title>
                    <div class="title">Устгах</div>
                </v-card-title>
                <v-card-text class="text--secondary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisinuli.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="pink" @click="destroyPost" :loading="loading">Тийм</v-btn>
                    <v-btn flat color="secondary" @click="dialog.destroy = false">Үгүй</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'dashboard',
    data() {
        return {
            errors: {},
            loading: false,
            dialog: {
                update: false,
                destroy: false
            },
            post: {
                id: '',
                title: '',
                body: ''
            },
            search: '',
            headers: [
                {
                    text: 'Гарчиг',
                    value: 'title'
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
            pagination: {
                sortBy: 'createdAt',
                descending: true,
                rowsPerPage: 25
            }
        }
    },
    async asyncData({ app }) {
        const { posts } = await app.$axios.$get('/posts')
        return { posts }
    },
    computed: {
        ...mapGetters([
            'isMobile'
        ]),
        titleErrors() {
            let errors = []
            if (this.errors.title) {
                errors = this.errors.title
            }

            return errors
        }
    },
    methods: {
        setPost(post = null, type = 'update') {
            this.errors = {}
            this.dialog[type] = true
            this.post = this.cloneObject(post) || {
                id: '',
                title: ''
            }
        },
        async storePost() {
            this.errors = {}
            this.loading = true
            try {
                const { data } = await this.$axios.post('/posts', this.post)
                this.posts.push(data.post)
                this.dialog.update = false
                this.loading = false
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        },
        async updatePost() {
            this.errors = {}
            this.loading = true
            try {
                const { data } = await this.$axios.put(`/posts/${this.post.id}`, this.post)
                this.spliceById(this.posts, this.post.id, data.post)
                this.dialog.update = false
                this.loading = false
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.loading = false
                }
            }
        },
        async destroyPost() {
            this.loading = true
            await this.$axios.delete(`/posts/${this.post.id}`)
            this.spliceById(this.posts, this.post.id)
            this.dialog.destroy = false
            this.loading = false
        }
    }
}
</script>
