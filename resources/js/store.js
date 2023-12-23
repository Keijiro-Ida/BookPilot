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
        test:'yes!!',
        bool: 'book'
      },
      actions: {
        test({state}) {
          console.log('actions');
          return new Promise((resolve, reject) => {
            console.log(state.test);
            resolve('action result');
        });
        }
      },
      mutations: {
        test(state) {
          console.log('mutations');
          console.log(state.test);
        },
      },
    },
  },
});

export default store;
