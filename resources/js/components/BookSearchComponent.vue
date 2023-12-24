<template>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6">
                    <form v-on:submit.prevent="submit">
                        <div class="form-group row">
                            <label for="title" class="col-sm-3 col-form-label">Title</label>
                            <input type="text" v-model="title" class="col-sm-9 form-control" id="title" >
                        </div>
                        <div class="form-group row">
                            <label for="content" class="col-sm-3 col-form-label">Author</label>
                            <input type="text" v-model="author" class="col-sm-9 form-control" id="content">
                        </div>

                        <button type="submit" class="btn btn-primary">検索</button>

                    </form>
                </div>
            </div>
        </div>
    </template>

    <script>
        import { mapState } from 'vuex';

        export default {
            data() {
                return {

                }

            },
            mounted() {
                this.$store.dispatch('book/test')
                    .then(res => {
                        console.log('Action response:', res);
                    })
                    .catch(err => {
                        console.error('Action failed:', err);
                    });
            },
            methods: {
                submit() {
                    console.log(this.title, this.author)
                    this.$store.dispatch('book/search')
                },

            },
            computed: {
                ...mapState('book', ['book']),
            title: {
                get() {
                    return this.book.title;
                },
                set(value) {
                    this.$store.commit('book/updateTitle', value)
                }
            },
            author: {
                get() {
                    return this.book.author;
                },
                set(value) {
                    this.$store.commit('book/updateAuthor', value)
                }
            },

            },
            watch: {

            },
        }
    </script>
