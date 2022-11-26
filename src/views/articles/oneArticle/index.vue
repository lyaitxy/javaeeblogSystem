<template>
  <div
    class="oneArticle"
    ref="oneArticle"
  >
    <!-- 侧边栏区 -->
    <div class="aside">
      <Aside></Aside>
    </div>

    <!-- 文章区 -->
    <div class="article">
      <div class="head">
        <h1 class="title">{{title || []}}</h1>
        <!-- 评论数 -->
        <span class="remarkNum">评论数({{ allRemark.length}})</span>
        <!-- 点赞数 -->
        <span class="likeNum">点赞数({{likeNum}})</span>
      </div>
      <div
        v-highlight
        autodetect
      >
        <div
          v-html="compiledMarkdown"
          class="contents"
        ></div>
      </div>
      <!-- 评论区 -->
      <div class="remark">评论</div>

      <ul class="remarkList">
        <li
          v-for="(remark, index) in allRemark"
          :key="index"
        >
          <span class="remarkName">名字</span>
          <span class="remarkTime">{{remark.createTime}}</span>

          <div>
            <span class="remarkContent">{{remark.comment}}</span>
            <div><button
                class="reply"
                @click="reply(remark)"
              >回复</button></div>
          </div>

          <!-- 回复评论 -->
          <div v-show="remark.replyCount">
            <ul>
              <li
                v-for="(reply, index) in remark.replyComm"
                :key="index"
              >
                <div class="replyRemark">
                  <div class="replyRemarkHead">
                    <span class="replyRemarkName">{{reply.name}}</span>
                    <span class="replyRemarkTime">{{reply.createTme}}</span>
                  </div>
                  <div class="replyRemarkContent">{{reply.comment}}</div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 一条分割线 -->
          <div class="line">------------------------------------------------------</div>

        </li>
      </ul>
      <div class="occupy"></div>
      <div :class="{'remarkFrame': isFixed}">
        <div class="remark">{{replyObj}}</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          placeholder="请输入内容"
          v-model="comment"
        >
        </el-input>
        <div class="publishandcancel">
          <button @click="cancel">取消</button>
          <button @click="declare">发表</button>
        </div>
      </div>

    </div>
    <el-backtop
      :right="20"
      :bottom="80"
    >
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//引入marked
import { marked } from 'marked'
//引入侧边栏组件
import Aside from '../../../components/aside'
export default {
  data() {
    return {
      comment: '',
      replyObj: '发表评论',
      action: 'addCommand',
      comm_id: 0,
      isFixed: true,
      //获取向下滚动条到底部的距离
      scrollHeight: 0
    }
  },
  components: {
    Aside
  },

  computed: {
    ...mapState({
      title: state => state.article.oneArticle[0].title || [],
      content: state => state.article.oneArticle[0].contents,
      artId: state => state.article.oneArticle[0].article_id,
      allRemark: state => state.commentLike.allRemark.data || [],
      likeNum: state => state.article.oneArticle[0].zan
    }),
    compiledMarkdown() {
      return marked.parse(this.content)
    }
  },
  methods: {
    //获取所有评论
    getAllRemark() {
      console.log(666)
      let data2 = {
        Art_id: this.artId,
        action: 'allCommand'
      }
      this.$store.dispatch('getAllRemark', data2)
    },
    //发表评论
    declare() {
      console.log('发表评论')
      let data = {
        action: this.action,
        Art_id: parseInt(this.artId),
        comment: this.comment
      }
      let data1 = {
        action: this.action,
        comm_id: parseInt(this.comm_id),
        comment: this.comment
      }
      if (data.action === 'addCommand') {
        this.$store.dispatch('declareRemark', data).then(() => {
          this.getAllRemark()
        })
      } else {
        this.$store.dispatch('replyRemark', data1).then(() => {
          //获取所有评论的回复
          let data3 = {
            action: 'queryAllReply',
            comm_id: parseInt(this.comm_id)
          }
          this.$store.dispatch('getAllReply', data3).then(() => {
            this.getAllRemark()
          })
        })
        this.replyObj = '发表评论'
        this.action = 'addCommand'
        this.comment = ''
      }
      this.comment = ''
      this.$message({
        message: '发表成功',
        type: 'success'
      })
    },
    //取消评论
    cancel() {
      this.comment = ''
      this.replyObj = '发表评论'
    },
    //回复评论
    reply(remark) {
      let { comm_id, name } = remark
      this.comm_id = comm_id
      this.replyObj = `回复: ${name}`
      this.action = 'replyComm'
    }
  }
}
</script>

<style lang="less" scoped>
.occupy {
  height: 100px;
}
.oneArticle {
  display: flex;
  justify-content: space-between;
  background-image: url('../../../assets/img/zhuyebg.png');
  background-size: cover;
  .aside {
    width: 230px;
    padding: 40px;
  }
}
.title {
  text-align: center;
  color: rgb(255, 255, 255);
}
.remarkNum {
  position: relative;
  left: 60%;
  top: -45px;
  font-size: 12px;
  color: rgb(255, 255, 255);
}
.likeNum {
  position: relative;
  left: 63%;
  top: -45px;
  font-size: 12px;
  color: rgb(255, 255, 255);
}
.article {
  padding: 30px 30px 0 0;
  width: 65%;

  .contents {
    color: #fff;
    //换行
    white-space: pre-wrap;
  }
}
div {
  white-space: pre;
}
.remark {
  background-color: rgba(183, 168, 168, 0.3);
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
}
//粘性定位的评论框

.remarkFrame {
  // 粘性定位
  position: fixed;
  bottom: 0px;
  width: 820px;
}
.remarkList {
  background-color: rgba(183, 168, 168, 0.3);
  color: #fff;
  list-style-type: none;
  position: relative;

  .remarkName {
    position: relative;
    left: -3%;
    margin-right: 100px;
    color: #fff;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 20px;
  }
  .remarkTime {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 14px;
    color: #aaa;
  }
  .reply {
    cursor: pointer;
    outline: skyblue;
    border: 1px solid skyblue;
    border-radius: 8px;
    background-color: skyblue;
    color: rgb(255, 255, 255);
    position: relative;
    left: 600px;
  }
  .remarkContent {
    width: 720px;
    // float: left! important;
    font-size: 28px;
    overflow: hidden !important;
    text-overflow: ellipsis;
    white-space: normal;
    position: relative;
    color: rgb(230, 227, 67);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 14px;
  }

  .replyRemarkTime {
    font-size: 14px;
    color: #aaa;
    margin-left: 10px;
  }

  .replyRemarkContent {
    color: rgb(230, 227, 67);
  }
}
.publishandcancel {
  width: 100px;
  position: relative;
  left: 80%;
  button {
    outline: skyblue;
    border: 1px solid skyblue;
    border-radius: 8px;
    background-color: skyblue;
    color: rgb(255, 255, 255);
    margin: 0 0 0 20px;
    cursor: pointer;
  }
}
</style>