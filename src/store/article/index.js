import {
  reqArticleList,
  reqFindById,
  reqPublish,
  reqArticleCount,
  reqSearch,
  reqGetAllArticleByClassification,
  reqGetAllArticleByTag,
  reqGetAllArticleCountByTag,
  reqGetAllArticleCountByClassification,
  reqDeleteArtById,
  reqUpdateArtById,
  reqHotArticle
} from '../../api'
const state = {
  allArticleList: [],
  oneArticle: {},
  articleCount: 0,
  searchArticleList: [],
  allArtCountByTag: 0,
  hotArticleList: []
}
const mutations = {
  //获取所有文章列表
  GETARTICLELIST(state, allArticleList) {
    state.allArticleList = allArticleList
  },
  //获取指定文章
  FINDBYID(state, oneArticle) {
    state.oneArticle = oneArticle;
   
  },
  //获取所有文章数量
  GETARTICLECOUNT(state, articleCount) {
    state.articleCount = articleCount
  },
  HOTARTICLE(state, hotArticleList) {
    state.hotArticleList = hotArticleList
  }



}
const actions = {
  //获取文章列表
  async getArticleList({ commit }, data) {

    let result = await reqArticleList(data);
    console.log(6666, result);
    console.log('所有文章111', result.data);
    if (result.status === 200) {
      commit('GETARTICLELIST', result.data.data)
    }

  },
  //获取指定文章
  async findById({ commit }, data) {
    await reqFindById(data).then(res => {
      let oneArticle = res.data.data
     

      commit('FINDBYID', oneArticle)
    })
  },
  //发布文章
  async PublishArticle({ commit }, data) {
    // console.log(666);
    let result = await reqPublish(data)
    console.log("发布文章", result)

  },
  //获取所有文章数量
  async getArticleCount({ commit }, data) {
    let result = await reqArticleCount(data)
    commit('GETARTICLECOUNT', result.data.data)
  },
  //搜索文章
  async searchArticle({ commit }, data) {
    let result = await reqSearch(data)
    console.log("搜索文章", result);
    console.log('搜索文章', result.data.data);
    if (result.status === 200) {
      commit('GETARTICLELIST', result.data.data)
    }
  },
  //获取指定分类的文章
  async getAllArticleByClassification({ commit }, data) {
    await reqGetAllArticleByClassification(data).then(res => {
      console.log('获取指定分类的文章', res);
      commit('GETARTICLELIST', res.data.data)
    })
  },

  //获取指定分类的文章数量
  async getAllArticleCountByClassification({ commit }, data) {
    await reqGetAllArticleCountByClassification(data).then(res => {
      console.log('获取指定分类的文章数量', res.data);
      commit('GETARTICLECOUNT', res.data.data)
    })
  },

  //获取指定标签的文章
  async getAllArticleByTag({ commit }, data) {
    await reqGetAllArticleByTag(data).then(res => {
      console.log('获取指定标签的文章', res);
      commit('GETARTICLELIST', res.data.data)
    })
  },

  //获取指定标签的文章数量
  async getAllArticleCountByTag({ commit }, data) {
    await reqGetAllArticleCountByTag(data).then(res => {
      console.log('获取指定标签的文章数量', res.data);
      commit('GETARTICLECOUNT', res.data.data)
    })
  },

  //删除文章
  async deleteArtById({ commit }, data) {
    await reqDeleteArtById(data).then(res => {
      console.log('删除文章', res);
    })
  },

  //修改文章
  async updateArtById({ commit }, data) {
    await reqUpdateArtById(data).then(res => {
      console.log('修改文章', res);
    })
  },


  //获取最热文章
  async getHotArticle({ commit }, data) {
    await reqHotArticle(data).then(res => {
      console.log('获取最热文章', res);
      commit('HOTARTICLE', res.data.data)
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