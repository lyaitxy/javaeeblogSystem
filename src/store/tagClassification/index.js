import {
  reqGetAllClassification, 
  reqGetAllTag, 
  reqCreateTag,
  reqDeleteTag,
  reqAddTagForArt,
  reqDeleteTagForArt,
  reqGetAllTagForArt} from '../../api'

const state = {
  allClassification: [],
  allTag: [],
  allTagForArt: []
}
const mutations = {
  GETALLCLASSIFICATION(state, allClassification) {
    state.allClassification = allClassification
  },
  GETALLTAG(state, allTag) {
    state.allTag = allTag;
  },
  GETALLTAGFORART(state, allTagForArt) {
    state.allTagForArt = allTagForArt;
  }
}
const actions = {
  //获取所有分类
  async getAllClassification({commit}, data) {
    await reqGetAllClassification(data).then(res => {
      console.log("获取所有分类", res.data.data);
      commit("GETALLCLASSIFICATION", res.data.data)

    })
   
  },
  //获取所有标签
  async getAllTag({commit}, data) {
    await reqGetAllTag(data).then(res => {
      console.log("获取所有标签", res.data);
      commit("GETALLTAG", res.data);
    });
  },

  //新建标签
  async addTag({commit}, data) {
    await reqCreateTag(data).then(res => {
      console.log("新建标签", res.data);
    });
  },

  //删除标签
  async deleteTag({commit}, data) {
    await reqDeleteTag(data).then(res => {
      console.log("删除标签", res.data);
    });
  },

  //为文章添加标签
  async addTagForArt({commit}, data) {
    await reqAddTagForArt(data).then(res => {
      console.log("为文章添加标签", res.data);
    });
  },

  //删除指定文章的指定标签
  async deleteTagForArt({commit}, data) {
    await reqDeleteTagForArt(data).then(res => {
      console.log("删除指定文章的指定标签", res.data);
    });
  },

  //获取指定文章的所有标签
  async getAllTagForArt({commit}, data) {
    await reqGetAllTagForArt(data).then(res => {
      console.log("获取指定文章的所有标签", res.data);
      commit("GETALLTAGFORART", res.data);
    });
  }
}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}