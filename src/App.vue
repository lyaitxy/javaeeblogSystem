<template>
  <div>
    <Header v-if="$route.meta.isShowHeader"></Header>
    
    <keep-alive exclude="home">
      <router-view></router-view>
    </keep-alive>
    <Footer v-if="$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import Aside from '@/components/aside'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Aside
  },
  mounted() {
    //发请求获取文章数据
    this.$store.dispatch('getArticleList',{action: 'AllArt'}).then(() =>{
      console.log('获取所有文章触发11');
    })
    //判定是否登录
    let isLogin = this.$store.state.user.userInfo.isLogin
    if (typeof isLogin === 'undefined') {
       //游客的请求
       console.log('游客的请求');
      this.$store.dispatch('visitor',{action: 'visitor'})
    }
    if (isLogin) {
      //发起登录的请求，保持登录状态
      this.$store.dispatch('login',{action: 'login',username: window.localStorage.getItem('username'),password: window.localStorage.getItem('password')})
    }
    if (window.localStorage.getItem('isLogin') === 'true') {
      //发起登录的请求
      this.$store.dispatch('login',{action: 'login',username: window.localStorage.getItem('username'),password: window.localStorage.getItem('password')})
    }
  },
}
</script>

<style>
</style>
