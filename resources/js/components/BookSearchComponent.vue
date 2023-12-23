<template>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6">
                    <form>
                        <div class="form-group row">
                            <label for="title" class="col-sm-3 col-form-label">Title</label>
                            <input type="text" class="col-sm-9 form-control" id="title">
                        </div>
                        <div class="form-group row">
                            <label for="content" class="col-sm-3 col-form-label">Content</label>
                            <input type="text" class="col-sm-9 form-control" id="content">
                        </div>
                        <div class="form-group row">
                            <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                            <input type="text" class="col-sm-9 form-control" id="person-in-charge">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit{{ test }}</button>
                    </form>
                </div>
            </div>
        </div>
    </template>

    <script>
        import { mapState } from 'vuex';

        export default {
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

            },
            computed: {
                ...mapState({
                test: state => state.book.test
                })
            },
            watch: {

            },
        }
    </script>
