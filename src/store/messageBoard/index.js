import {reqGetAllMessage, reqDeclareMessage} from '../../api'

const state = {
  messageList: [],
}
const mutations = {
  GETALLMESSAGE(state, messageList) {
    console.log("messageList",messageList);
    state.messageList = messageList
  }
}
const actions = {
  //发表留言
  async declareMessage({commit}, data) {
    await reqDeclareMessage(data).then((res) =>{
      console.log("发表留言",res);
    });
  },

  //获取留言信息
  async getAllMessage({commit}, data) {
    await reqGetAllMessage(data).then((res) =>{
      console.log("获取留言信息",res.data);
      commit('GETALLMESSAGE', res.data)
    });

  },
}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}