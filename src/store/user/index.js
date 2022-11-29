import {reqValidationPhoto, reqRegister, reqLogin, reqgetVisitorList, reqGetUserInfo} from '../../api'

const state = {
  registerInfo: {},
  userInfo: {},
}
const mutations = {
  USERLOGIN(state, userInfo) {
    state.userInfo = userInfo
    // setTimeout(() => {
    //   window.location.reload()
    // }, 1)
  },
  REGISTERUSER(state, registerInfo) {
    state.registerInfo = registerInfo;
  },
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
    await reqLogin(data).then((res) =>{
      commit('USERLOGIN', res.data)
      console.log("登录",res);
    });
    // console.log(result);
  },
  //获取登录用户信息(带token)
  async getVisitorList({commit}, data) {
    await reqGetUserInfo(data).then((res) =>{
      commit('USERLOGIN', res.data)
      console.log("登录(带token)",res);
    });
  },


  //游客
  async visitor({commit}, data) {
    const result = await reqgetVisitorList(data);
    console.log("游客信息",result);
    commit('USERLOGIN',result.data)
  },



}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}