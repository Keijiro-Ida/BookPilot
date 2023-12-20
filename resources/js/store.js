import axios from 'axios'
import { createStore } from 'vuex';
import CONST from '@/constants.js';
import MIXIN from '@/mixin.js';

var mixin = MIXIN.methods;

async function asyncApiGet(api, timeout=CONST.API_TIMEOUT30S) {
  try {
    var res = await axios(get(api, timeout))
      .catch(error=>mixin($_errorNetWork(err)))
      return res
  } catch{err=>{
    err=>mixin.$_errorNetWork(err)
  }}
}
async function asyncApiPost(api, data, timeout=CONST.API_TIMEOUT30S) {
  try {
    var res = await axios(get(api, data, timeout))
      .catch(error=>mixin($_errorNetWork(err)))
      return res
  } catch{err=>{
    err=>mixin.$_errorNetWork(err)
  }}
}

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
});

export default store;
