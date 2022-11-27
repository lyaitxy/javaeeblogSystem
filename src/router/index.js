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
    path: '/onearticle',
    component: OneArticle,
    meta: {
      isShowFooter: false,
      isShowHeader: true,

    },
   
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