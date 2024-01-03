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
        reviewBook({commit}, selectedBook) {
          const res = asyncApiPost("/api/book/review", {book: selectedBook});
          console.log(res.data);
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
        }
      },
    },
  },
});

export default store;
