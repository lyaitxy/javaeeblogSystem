//引入vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//引入user小仓库
import user from './user'
//引入文章的小仓库
import article from './article'
//引入评论和点赞的小仓库
import commentLike from './commentLike'
//引入标签和分类的小仓库
import tagClassification from './tagClassification'
//引入留言板的小仓库
import messageBoard from './messageBoard'



export default new Vuex.Store({
  modules: {
    user,
    article,
    commentLike,
    tagClassification,
    messageBoard
  }
})