import {
  reqArticleList, 
  reqFindById, 
  reqPublish, 
  reqArticleCount,
  reqSearch,
  reqShowPage,
  reqGetAllArticleByClassification,
  reqGetAllArticleByTag} from '../../api'
const state = {
  allArticleList: [],
  oneArticle: {},
  articleCount: 0,
  searchArticleList: []
}
const mutations = {
  //获取所有文章列表
  GETARTICLELIST(state, allArticleList) {
    state.allArticleList = allArticleList
  },
  //获取指定文章
  FINDBYID(state, oneArticle){
    state.oneArticle = oneArticle;
  },
  //获取所有文章数量
  GETARTICLECOUNT(state, articleCount) {
    state.articleCount = articleCount
  },
  
  

}
const actions = {
  //获取文章列表
  async getArticleList({commit}, data) {
    
    let result = await reqArticleList(data);
    console.log(6666,result);
    console.log('所有文章111',result.data);
    if (result.status === 200){
      commit('GETARTICLELIST', result.data.data)
    }
    
  },
  //获取指定文章
  async findById({commit}, data) {
    let result = await reqFindById(data);
    console.log("获取指定文章",result);
    if (result.status === 200) {
      commit("FINDBYID", result.data.data)
    }
  },
  //发布文章
  async PublishArticle({commit}, data) {
    // console.log(666);
    let result = await reqPublish(data)
    console.log("发布文章",result)
    
  },
  //获取所有文章数量
  async getArticleCount({commit}, data) {
    let result = await reqArticleCount(data)
    commit('GETARTICLECOUNT', result.data.data)
  },
  //搜索文章
  async searchArticle({commit}, data) {
    let result = await reqSearch(data)
    console.log('搜索文章',result.data.data);
    if (result.status === 200) {
      commit('GETARTICLELIST', result.data.data)
    }
  },
  //获取指定页的文章
  async showPage({commit}, data) {
    let result = await reqShowPage(data)
    console.log('获取指定页的文章',result);
  },
  //获取指定分类的文章
  async getAllArticleByClassification({commit}, data) {
    await reqGetAllArticleByClassification(data).then(res => {
      console.log('获取指定分类的文章',res);
      commit('GETARTICLELIST', res.data.data)
    })
  },

  //获取指定标签的文章
  async getAllArticleByTag({commit}, data) {
    await reqGetAllArticleByTag(data).then(res => {
      console.log('获取指定标签的文章',res);
      commit('GETARTICLELIST', res.data.data)
    })
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}