import Vue from 'vue'
import Vuex from 'vuex'

import userStore from '../components/user/userStore'
import msg from '../components/user/msg'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'productions'

export default new Vuex.Store({
    modules: {
      userStore, msg
    },
    strict: debug
})
