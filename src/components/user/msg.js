const state = {
//  authUser: null
    flash: null
}


const mutations = {
  SET_FLASH_MSG (state, flashMsg) {
    state.flash = flashMsg
  },
  CLEAR_FLASH_MSG (state) {
    state.flash = null
  }
}

const actions = {
  setFlashMsg: ({commit}, flashMsg) => {
    commit ('SET_FLASH_MSG', flashMsg)
  },
  clearFlashMsg: ({commit}) => {
    commit ('CLEAR_FLASH_MSG')
  }
}


export default {
  state,
  mutations,
  actions
}
