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
    let isLogin = window.localStorage.getItem('isLogin');
    console.log(isLogin);
    if (isLogin === null || isLogin === 'false') {
      window.localStorage.setItem('isLogin',false)
       //游客的请求
       console.log('游客的请求');
      this.$store.dispatch('visitor',{action: 'visitor'}).then(() =>{
    
        window.localStorage.setItem('token',this.$store.state.user.userInfo.authorization)
      })
    }
    // if (isLogin) {
    //   //发起登录的请求，保持登录状态
    //   this.$store.dispatch('login',{action: 'login',username: window.localStorage.getItem('username'),password: window.localStorage.getItem('password')})
    // }
    // 获取登录信息(带token)
    this.$store.dispatch('getVisitorList',{action: 'getMyMsg'}).then(() =>{
      //打印登录信息
      console.log("头像",this.$store.state.user.userInfo.touxiang);
    })

    //获取最热文章
    this.$store.dispatch('getHotArticle',{action:'hot'})
    //刷新一次
    // if (location.href.indexOf("#reloaded") == -1) {
    //   location.href = location.href + "#reloaded";
    //   location.reload();
    // }
  },
}
</script>

<style>
</style>
