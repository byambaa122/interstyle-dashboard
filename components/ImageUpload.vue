<template>
    <div>
        <!-- Uploader -->
        <v-card
            color="grey lighten-5"
            @click.native="openFileBrowser"
            tag="a"
            flat
        >
            <!-- Uploader icon -->
            <v-img
                class="mt-3"
                src="/images/upload.png"
                height="60"
                contain
            ></v-img>
            <!-- Uploader file input -->
            <input ref="input" type="file" @change="upload">
            <!-- Uploader text -->
            <div class="subheading text-xs-center grey--text pa-3">
                {{ uploaderText }}
            </div>
        </v-card>
        <!-- Images -->
        <v-list class="mt-4" two-line>
            <v-list-tile avatar>
                <!-- Reorder button -->
                <v-list-tile-action>
                    <v-btn color="grey" flat icon>
                        <v-icon>mdi-reorder-horizontal</v-icon>
                    </v-btn>
                </v-list-tile-action>
                <!-- Image -->
                <v-list-tile-avatar size="60">
                    <v-img src="/images/user.png"></v-img>
                </v-list-tile-avatar>
                <!-- Spacer -->
                <v-list-tile-content></v-list-tile-content>
                <!-- Remove button -->
                <v-list-tile-action>
                    <v-btn color="pink" flat icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Array],
            required: true
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
            uploading: false
        }
    },
    computed: {
        uploaderText() {
            return !this.uploading
                ? 'Энд дарж зураг оруулна уу'
                : 'Хуулж байна...'
        }
    },
    methods: {
        setValue(value) {
            this.$emit('input', value)
        },
        openFileBrowser() {
            this.$refs.input.click()
        },
        async upload(e) {
            try {
                this.uploading = true
                let formData = new FormData()
                formData.append('image', e.target.files[0])

                // const { path } = await this.$axios.$post('/image/upload', formData)
                // this.uploading = false
                // this.setValue(path)
            } catch (e) {
                //
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.v-card
    border-radius 4px
    border 2px dashed rgba(0, 0, 0, 0.12) !important

    input[type='file']
        display none
</style>
