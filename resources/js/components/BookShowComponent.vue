<template>
    <div class="container book-detail">
      <div class="row justify-content-center">
        <div class="col-md-4 book-image">
          <!-- 画像にリンクを設定 -->
          <a :href="selectedBook.previewLink" target="_blank">
            <img v-if="selectedBook.imageLinks && selectedBook.imageLinks.thumbnail"
                :src="selectedBook.imageLinks.thumbnail"
                alt="Book cover"
                class="img-fluid">
          </a>
        </div>
        <div class="col-md-8 book-content">
          <h1>{{ selectedBook.title }}</h1>
          <p v-if="selectedBook.authors && selectedBook.authors.length">著者: {{ selectedBook.authors.join(', ') }}</p>
          <p>{{ selectedBook.description }}</p>
          <button @click="summarizeBook(selectedBook)" class="btn btn-primary">要約する</button>
            <p v-if="selectedBook.summarizedText">{{ selectedBook.summarizedText }}</p>

          <button @click="reviewBook(selectedBook)" class="btn btn-primary">感想を書く</button>
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
        summarizeBook(book) {
            this.$store.dispatch('book/summarizeBook', book);
        },
        reviewBook(book) {
            this.$store.dispatch('book/reviewBook', book)
              .then(res => {
                        console.log('Action response:', res);
                        this.$router.push({ name: 'book.review', params: { bookId: res.reading_status.book_id }});

                    })
                    .catch(err => {
                        console.error('Action failed:', err);
                    });

        }
       },
       computed: {
        selectedBook() {
            return this.$store.state.book.selectedBook;
        }
       }
    }
</script>

<style>
.book-detail {
  display: flex;
  align-items: flex-start;
  padding: 20px 0;
}

.book-image {
  margin-right: 20px;
}

.book-content {
  flex: 1;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  cursor: pointer;
}

</style>
