<template>
    <div class="uploader" @click="$refs.input.click()">
        <v-container fluid grid-list-lg>
            <v-layout row wrap>
                <v-flex xs3>
                    <v-icon color="primary" size="50">mdi-image-plus</v-icon>
                </v-flex>
                <v-flex xs9>
                    <div class="uploader-body">
                        <label class="subheading">Хуулах зураг сонгоно уу</label>
                        <input ref="input" type="file" @change="onChange" multiple>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
        setValue(value) {
            this.$emit('input', value)
        },
        onChange(e) {

        }
    }
}
</script>

<style lang="stylus" scoped>
.uploader
    cursor pointer
    border 2px dashed #dee4ec
    background-color #f7f8fa
    color #78909c

    .uploader-body
        label
            line-height 50px
            cursor pointer

        input[type='file']
            display none
</style>
