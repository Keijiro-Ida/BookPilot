<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <h1>{{ selectedBook.title }}</h1>
                 <p>{{ selectedBook.authors[0] }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
       data() {
        return {
        };
       },
       created() {
       },
        mounted() {
            console.log(this.selectedBook);
        },
       methods: {
       },
       computed: {
        selectedBook() {
            return this.$store.state.book.selectedBook;
        }
       }
    }
</script>
