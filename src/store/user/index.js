import {reqValidationPhoto, reqRegister, reqLogin} from '../../api'

const state = {
  registerInfo: {},
  userInfo: {},
}
const mutations = {
  USERLOGIN(state, userInfo) {
    state.userInfo = userInfo
  },
  REGISTERUSER(state, registerInfo) {
    state.registerInfo = registerInfo;
  }
}
const actions = {
  //注册新用户
  async registerUser({commit}, data) {
    const result = await reqRegister(data);
    console.log(result);
    commit('REGISTERUSER', result.data)
  },

  //登录
  async login({commit}, data) {
    const result = await reqLogin(data);
    console.log(result);
    if (result.code === 200) {
      commit('USERLOGIN', result.data)
    } else {
      return Promise.reject(new Error('failed'))
    }
  }



}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}