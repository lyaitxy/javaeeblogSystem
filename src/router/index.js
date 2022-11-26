import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../views/register'
import login from '../views/login'
import Home from '../views/home'
import Publish from '../views/articles/publish'
import OneArticle from '../views/articles/oneArticle'
//引入仓库
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/onearticle',
    component: OneArticle,
    meta: {
      isShowFooter:false,
      isShowHeader: true,
      
    },
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
    
    beforeEnter: (to, from, next) => {
     
      // store.dispatch('getArticleList',{action: 'AllArt'})
      next()
      console.log('home');
    }
  },
  //重定向,默认显示登录页面,开发时先搞到home首页
  {
    path:'/',
    redirect: '/home'
  }
]
//
const router = new VueRouter({
  routes
})

export default router