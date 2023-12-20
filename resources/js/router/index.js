import { createRouter, createWebHistory } from 'vue-router';

import BookShelfComponent from "@/components/BookShelfComponent.vue";
import BookShowComponent from "@/components/BookShowComponent.vue";
import BookReviewComponent from "@/components/BookReviewComponent.vue";

const router = new createRouter({
    history:createWebHistory(),
    routes: [
        {
            path: '/books',
            name: 'book.shelf',
            component: BookShelfComponent
        },
        {
            path: '/books/:bookId',
            name: 'book.show',
            component: BookShowComponent
        },
        {
            path: '/books/search',
            name: 'book.search',
            component: BookShowComponent
        },
        {
            path: '/books/:bookId/review',
            name: 'book.review',
            component: BookReviewComponent
        },
    ]
});

export default router;
