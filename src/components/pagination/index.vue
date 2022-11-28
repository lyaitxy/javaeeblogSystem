<template>
  <div class="pagination">
    <button @click="upOnePage" :disabled="currentPage===1">上一页</button>
    <button @click="changePage(1)" :class="{active:currentPage===1}" v-if="currentPage > 5">1</button>
    <button v-if="currentPage > 6">...</button>

  
    <button @click="changePage(page)" :class="{active:currentPage===page}" v-for="(page , index) in pageList.end" :key="index" v-show="page >= pageList.start">
      {{page}}
    </button>
    <button v-if="currentPage <= totalPage-4 && totalPage > 6">...</button>
    <button @click="changePage(totalPage)" v-if="currentPage < totalPage-4">{{totalPage}}</button>
    <button >共{{articleCount}}篇</button>
    <button @click="downOnePage" :disabled='currentPage===totalPage'>下一页</button>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      currentPage: 1,
      tag_name: '',
    }
  },
  watch: {
    currentPage() {
      //页数变化时,传当前页
      this.$bus.$emit('currentPage', this.currentPage)
      //如果标签名不为空，就是查询标签下的文章
      if (this.tag_name) {
        let data = {
          action: 'allArtOfTag',
          tag_name: this.tag_name,
          page: this.currentPage
        }
        this.$store.dispatch('getAllArticleByTag', data)
      } else {
        let data = {
          page: this.currentPage,
          action: 'AllArt'
        }
        this.$store.dispatch('getArticleList', data)
      }
      
    }
  },
  computed: {
    ...mapState({
      articleCount: state => state.article.articleCount,
    }),
    //总共多少页
    totalPage() {
      return Math.ceil(this.articleCount / 3);
    },
    //计算连续的页码的开始和结束
    pageList() {
      let start = 0;
      let end = 0;
      //总页数小于等于5
      if (this.totalPage <=5) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.currentPage - 2;
        end = this.currentPage + 2;
        //如果start小于1,start=1,end=5(连续页数)
        if (start < 1) {
          start = 1;
          end = 5;
        }
        //如果end大于总页数,end=总页数,start=end-4
        if (end > this.totalPage) {
          end = this.totalPage;
          start = end - 4; //连续页数加上1
        }
      }
      return {start, end};
    }
    
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    upOnePage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    downOnePage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
      }
    }
  },
  mounted() {
     this.$bus.$on('getAllArticleByTag', (data) => {
        this.tag_name = data;
        let data2 ={
          action: 'allArtOfTag',
          tag_name: this.tag_name,
          page: this.currentPage
        }
        this.$store.dispatch('getAllArticleByTag',data2)
    })
    this.$bus.$on('clickAll',() => {
      this.tag_name = '';
      this.currentPage = 1;
    })
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>