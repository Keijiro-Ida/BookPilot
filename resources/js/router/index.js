import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store.js';

import BookShelfComponent from "@/components/BookShelfComponent.vue";
import BookShowComponent from "@/components/BookShowComponent.vue";
import BookSearchComponent from "@/components/BookSearchComponent.vue";
import BookReviewComponent from "@/components/BookReviewComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import SignupComponent from "@/components/SignupComponent.vue";

const router = new createRouter({
    history:createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginComponent
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupComponent
        },
        {
            path: '/books',
            name: 'book.shelf',
            component: BookShelfComponent,
            meta: { requiresAuth: true }
        },
        {
            path: '/books/show',
            name: 'book.show',
            component: BookShowComponent,
            meta: { requiresAuth: true }
        },
        {
            path: '/books/search',
            name: 'book.search',
            component: BookSearchComponent,
            meta: { requiresAuth: true }
        },
        {
            path: '/books/:bookId/review',
            name: 'book.review',
            component: BookReviewComponent,
            meta: { requiresAuth: true }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.getters['auth/isAuthenticated'];

    if (requiresAuth && !isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
  });


export default router;
