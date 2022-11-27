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
  },
}
</script>

<style>
</style>
