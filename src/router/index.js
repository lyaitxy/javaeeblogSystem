import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../views/register'
import login from '../views/login'
import Home from '../views/home'
import Publish from '../views/articles/publish'
import OneArticle from '../views/articles/oneArticle'
import MessageBoard from '../views/messageBoard'
//引入仓库
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/messageboard',
    component: MessageBoard
  },
  {
    path: '/onearticle/:id',
    component: OneArticle,
    meta: {
      isShowFooter: false,
      isShowHeader: true,
    },
    beforeEnter: (to, from, next) => {
        if (JSON.parse(localStorage.getItem('artId')) == to.params.id) {
          next()
        } else {
        //拿到id
        let id = to.params.id
        let data = {
          article_id: id,
          action: "findById",
        };

        store.dispatch("findById", data).then(() => {
          //获取文章的评论数
          let data2 = {
            Art_id: id,
            action: "allCommand",
          };
          store.dispatch("getAllRemark", data2).then(() => {
            //等请求完成后再跳转
            console.log(666666666666666);
            let oneArticle = store.state.article.oneArticle
            window.localStorage.setItem("title", JSON.stringify(oneArticle[0].title))
            window.localStorage.setItem("artId", JSON.stringify(oneArticle[0].article_id))
            window.localStorage.setItem("contents", JSON.stringify(oneArticle[0].contents))
            window.localStorage.setItem("name", JSON.stringify(oneArticle[0].name))
            window.localStorage.setItem("zan", JSON.stringify(oneArticle[0].zan))
            let allRemark = store.state.commentLike.allRemark.data
            window.localStorage.setItem("allRemark", JSON.stringify(allRemark))
            next()
          })
        })
      }
    }
  },
  {
    path: '/publish',
    component: Publish,
    meta: {
      isShowHeader: true,
      isShowFooter: true,
    }
  },
  {
    path: '/publish/:id',
    component: Publish,
    meta: {
      isShowHeader: true,
      isShowFooter: true,
    }
  },
  {
    path: '/register',
    component: register,
    meta: {
      isShowHeader: false,
      isShowFooter: false,

    }
  },
  {
    path: '/login',
    component: login,
    meta: {
      isShowHeader: false,
      isShowFooter: false,

    }
  },
  {
    path: '/home',
    component: Home,
  },
  //重定向,默认显示登录页面
  {
    path: '/',
    redirect: '/home'
  }
]
//
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y值就是滚动条的位置，y=0为顶部
    return { y: 0 }
  }
})

export default router