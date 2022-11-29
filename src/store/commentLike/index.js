import {
  reqDeclareRemark, 
  reqGetAllRemarK, 
  reqReplyRemark, 
  reqGetAllReply,
  reqLike,
  reqCancelLike,
  reqDeleteRemark,
  reqDeleteReply} from '../../api'
const state = {
  allRemark: [],
  allReply: []
}
const mutations = {
  //获取当前文章的所有评论
  GETALLREMARK(state, allRemark) {
    console.log("mutations中的allRemark", allRemark);
    window.localStorage.setItem('allRemark', JSON.stringify(allRemark.data))
    state.allRemark = allRemark
    
    setTimeout(() => {
      window.location.reload()
      if (JSON.parse(localStorage.getItem("scrollY")) !== 0) {
        console.log(666666666666666666666666);
        window.scrollTo(0,JSON.parse(localStorage.getItem("scrollY")))
      }
    }, 1)
  },
  //获取当前评论的所有回复
  GETALLREPLY(state, allReply) {
    console.log("mutations中的allReply", allReply);
    state.allReply = allReply
  }

}
const actions = {
  //发表评论
  async declareRemark({commit}, data) {
    return new Promise((resolve, reject) => {
      reqDeclareRemark(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })

  },

  //删除评论
  async deleteRemark({commit}, data) {
    return new Promise((resolve, reject) => {
      reqDeleteRemark(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  //获取当前文章的所有评论
  async getAllRemark({commit}, data) {
    let result = await reqGetAllRemarK(data)
    console.log("获取当前文章的所有评论",result.data)
    if (result.status === 200) {
      commit("GETALLREMARK", result.data)
    }
  },
  //回复评论
  async replyRemark({commit}, data) {
    return new Promise((resolve, reject) => {
      reqReplyRemark(data).then(res => {
        resolve(res)
        console.log("回复评论", res);
      }).catch(err => {
        reject(err)
      })
    })
  },

  //删除回复
  async deleteReply({commit}, data) {
    return new Promise((resolve, reject) => {
      reqDeleteReply(data).then(res => {
        console.log("删除回复", res);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  //查询当前评论的所有回复
  async getAllReply({commit}, data) {
    return new Promise((resolve, reject) => {
      reqGetAllReply(data).then(res => {
        commit("GETALLREPLY", res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  //点赞
  async like({commit}, data) {
    return new Promise((resolve, reject) => {
      reqLike(data).then(res => {
        console.log("点赞", res);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  //取消点赞
  async cancelLike({commit}, data) {
    return new Promise((resolve, reject) => {
      reqCancelLike(data).then(res => {
        console.log("取消点赞", res);
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
const getters = {
}


export default {
  state,
  mutations,
  actions,
  getters
}