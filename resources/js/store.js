import axios from 'axios'
import { createStore } from 'vuex';
import CONST from '@/constants.js';
import MIXIN from '@/mixin.js';

var mixin = MIXIN.methods;

async function asyncApiGet(api, timeout = CONST.API_TIMEOUT30S) {
  try {
    var res = await axios.get(api, { timeout });
    return res;
  } catch (err) {
    mixin.$_errorNetWork(err);
  }
}
async function asyncApiPost(api, data, timeout = CONST.API_TIMEOUT30S) {
  try {
    var res = await axios.post(api, data, { timeout });
    return res;
  } catch (err) {
    mixin.$_errorNetWork(err);
  }
}


const store = createStore({
  plugins:[
  ],
  modules: {
    auth: {
      strict: true,
      namespaced: true,
      state: {
        token: localStorage.getItem('token') || null,
        user: null,
      },
      mutations: {
        setToken(state, token) {
          state.token = token;
        },
        setUser(state, user) {
          state.user = user;
        },
      },
      actions: {
        async login({ commit }, { email, password }) {
          try {
            const res = await asyncApiPost("/api/login", { email, password });
            const data = res.data;
            if (res.data.error_code) {
              const error = new Error();
              error.message = data.message;
              error.code = data.error_code;
              throw error;
            }
            console.log('success login')

            const token = data.token;
            localStorage.setItem('token', token);
            commit('setToken', token);

          } catch(error) {
            throw error;
          }
        },
        async signup({ commit }, {form: form}) {
          try {
            const res = await asyncApiPost("/api/signup",{
                name: form.name,
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation
              });
            const data = res.data;
            if (res.data.error_code) {
              const error = new Error();
              error.message = data.message;
              error.code = data.error_code;
              throw error;
            }

            const token = data.token;
            localStorage.setItem('token', token);
            commit('setToken', token);

          } catch(error) {
            throw error;
          }
        },
        async logout({ commit }) {
          try {
            const res = await asyncApiPost("/api/logout");
            const data = res.data;
            localStorage.removeItem('token');
          } catch(error) {
            throw error;
          }
        },
      },
      getters: {
        isAuthenticated(state) {
          return !!state.token;
        }
      },
    },
    book: {
      strict: true,
      namespaced: true,
      state: {
        book: {
          title: '',
          author: '',
        },
        list:[],
        selectedBook: null,
      },
      actions: {
        test({state}) {
          console.log('actions');
          return new Promise((resolve, reject) => {
            console.log(state.test);
            resolve('action result');
        });
        },
        async search({commit, state}) {

          try {
            console.log(state.book.title)
            console.log(state.book.author)
            const res = await asyncApiPost("/api/book/search", {book: state.book});
            const data = res.data;
            console.log(data);
            commit('updateList', data)
            return data;

          } catch(error) {
            console.error('API request failed:', error)
          }
        },
        selectBook({ commit }, book) {
          console.log(book);
          commit('setSelectBook', book)
        },
        async summarizeBook({commit}, selectedBook) {
          // console.log(book);
          const res = await asyncApiPost("/api/book/summarize", {book: selectedBook});
          console.log(res.data);
          commit('setSummarizeBook', res.data);
        },
        async reviewBook({commit}, selectedBook) {
          const res = await asyncApiPost("/api/book/review", {book: selectedBook});
          console.log(res.data);
          commit('setReviewBook', res.data);
          return res.data;

        }
      },
      mutations: {
        updateTitle(state, title) {
          state.book.title = title
        },
        updateAuthor(state, author) {
          state.book.author = author
        },
        updateList(state, data) {
          data.items.forEach((item) => state.list.push(item));
        },
        setSelectBook(state, book) {
          state.selectedBook = book.volumeInfo;
          state.selectedBook.id = book.id;
          state.selectedBook.retailPrice = book.saleInfo.retailPrice.amount;
        },
        setSummarizeBook(state, data) {
          state.selectedBook.summarizedText = data.choices[0].message.content;
        },
        setReviewBook(state, data) {
          state.selectedBook.reviewBook = data.reading_status;
        }
      },
    },
  },
});

export default store;
