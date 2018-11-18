<template>
    <div>
        <!-- Uploader -->
        <a
            :class="[hasError ? 'error-messages' : '', 'uploader']"
            @click="openFileBrowser"
        >
            <div v-if="!uploading">
                <!-- Uploader icon -->
                <v-img
                    class="mt-3"
                    src="/images/upload.png"
                    height="60"
                    contain
                ></v-img>
                <!-- Uploader file input -->
                <input
                    ref="input"
                    type="file"
                    accept="image/svg,image/jpeg,image/png"
                    @change="upload"
                >
                <!-- Uploader text -->
                <div class="subheading text-xs-center pa-3">
                    {{ uploaderText }}
                </div>
            </div>
            <!-- Upload progress -->
            <div
                class="text-xs-center py-3"
                v-else
            >
                <v-progress-circular
                    :size="100"
                    :rotate="90"
                    :width="4"
                    :value="percentCompleted"
                    color="primary"
                >
                    <strong>
                        {{ percentCompleted }}
                    </strong>
                </v-progress-circular>
            </div>
        </a>
        <!-- Images -->
        <v-list
            class="mt-4"
            v-if="!!images.length"
            v-dragula="images"
            two-line
        >
            <v-list-tile
                v-for="(image, i) in images"
                :key="i"
            >
                <!-- Reorder button -->
                <v-list-tile-action>
                    <v-btn color="grey" flat icon>
                        <v-icon>
                            mdi-reorder-horizontal
                        </v-icon>
                    </v-btn>
                </v-list-tile-action>
                <!-- Image -->
                <v-list-tile-avatar
                    color="grey lighten-4"
                    size="60"
                >
                    <v-img
                        :src="`${baseUrl}/${image}?w=60&h=60&fit=crop`"
                        :lazy-src="`${baseUrl}/${image}?w=5&h=5&fit=crop`"
                    ></v-img>
                </v-list-tile-avatar>
                <!-- Spacer -->
                <v-list-tile-content></v-list-tile-content>
                <!-- Remove button -->
                <v-list-tile-action>
                    <v-btn
                        @click="removeImage(image)"
                        color="pink"
                        flat
                        icon
                    >
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
import { castArray } from 'lodash'

export default {
    props: {
        value: {
            type: [String, Array],
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        errorMessages: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            errors: {},
            baseUrl: process.env.BASE_URL,
            percentCompleted: 0,
            uploading: false
        }
    },
    computed: {
        hasError() {
            return !!this.errorMessages.length || this.errors.hasOwnProperty('image')
        },
        uploaderText() {
            return this.errors.hasOwnProperty('image')
                ? 'Зөвхөн JPEG, PNG, SVG өргөтгөлтэй файл оруулна уу'
                : 'Энд дарж зураг оруулна уу'
        },
        images: {
            get() {
                return this.value
                    ? castArray(this.value)
                    : []
            },
            set(value) {
                const data = this.multiple
                    ? value
                    : value[value.length - 1] || ''

                this.$emit('input', data)
            }
        }
    },
    methods: {
        removeImage(path) {
            this.images = this.images.filter(item => item !== path)
        },
        openFileBrowser() {
            if (!this.uploading) {
                this.$refs.input.click()
            }
        },
        async upload(e) {
            try {
                this.errors = {}
                this.uploading = true
                this.percentCompleted = 0

                // Append image to form data
                let formData = new FormData()
                formData.append('image', e.target.files[0])

                // Reset input
                this.$refs.input.value = ''

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent
                        this.percentCompleted = Math.round((loaded * 100) / total)
                    }
                }

                const { path } = await this.$axios.$post('/image/upload', formData, config)
                this.uploading = false

                // Add image path to images
                this.images = [...this.images, path]
            } catch (err) {
                if (err.response.status === 422) {
                    this.errors = err.response.data.errors
                    this.uploading = false
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.v-list
    background-color transparent !important
</style>
