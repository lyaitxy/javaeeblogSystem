//引入axios请求
import request from './request'

//游客
export function reqgetVisitorList(data) {
  return request({
    url: '/user',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//注册新用户
//...data : action=regist
export function reqRegister(data) {
  return request({
    url: '/user',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//登录
export function reqLogin(data) {
  return request({
    url: '/user',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 发布文章
export function reqPublish(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取文章列表
export function reqArticleList(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取指定文章
export function reqFindById(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取所有文章数量
export function reqArticleCount(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//查询文章是否是当前用户的
export function reqIsMyArticle(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取最热文章
export function reqHotArticle(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//搜索文章
export function reqSearch(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//发表评论
export function reqDeclareRemark(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//用户删除评论
export function reqDeleteRemark(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取当前文章的所有评论
export function reqGetAllRemarK(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//回复评论
export function reqReplyRemark(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//删除回复
export function reqDeleteReply(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//查询当前评论的所有回复
export function reqGetAllReply(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取所有分类名
export function reqGetAllClassification(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取指定分类的所有文章
export function reqGetAllArticleByClassification(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取指定分类的所有文章数量
export function reqGetAllArticleCountByClassification(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取所有标签
export function reqGetAllTag(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//新建标签
export function reqCreateTag(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//删除标签
export function reqDeleteTag(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//给文章添加标签
export function reqAddTagForArt(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取文章的所有标签
export function reqGetAllTagForArt(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//删除指定文章的指定标签
export function reqDeleteTagForArt(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取指定标签的所有文章
export function reqGetAllArticleByTag(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取指定标签的所有文章数量
export function reqGetAllArticleCountByTag(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//删除文章
export function reqDeleteArtById(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//修改文章
export function reqUpdateArtById(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//发表留言
export function reqDeclareMessage(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//获取留言信息
export function reqGetAllMessage(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


//获取登录之后的用户信息(带token)
export function reqGetUserInfo(data) {
  return request({
    url: '/user',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


//点赞
export function reqLike(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

//取消点赞
export function reqCancelLike(data) {
  return request({
    url: '/blogs',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
