<template>
  <div class="body">
    <!-- 分类展示行 -->
    <div class="classify">
      <!-- 默认全部被选中 -->
      <div
        :class="{'active': isFirst=== -1}"
        @click="all"
      >全部</div>
      <div
        :class="{'active': isFirst===index}"
        @click="getClassificationArticle($event, index)"
        v-for="(classification, index) in allClassification"
        :key="index"
      >{{classification.classify_name}}</div>

    </div>
    <!-- 文章时间线 -->
    <div class="time">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            :timestamp="article.createTime"
            placement="top"
            v-for="article in allArticleList"
            :key="article.article_id"
          >

            <el-card class="article">
              <div>
                <h4
                  class="title"
                  @click="detailArticle(article.article_id)"
                >{{ article.title }}</h4>
                <div class="artTags">
                  <div
                    v-for="(artTag,index) in article.tags"
                    :key="index"
                  >
                    <div class="tag iconfont icon-biaoqian">{{artTag.tag_name}}<span
                        class="el-icon-remove removeButton"
                        @click="removeArtTag(article.article_id, artTag.tag_name)"
                      ></span></div>
                  </div>

                </div>
                <p
                  class="content"
                  @click="detailArticle(article.article_id)"
                >{{ article.descr }}</p>

              </div>
            </el-card>
            <div class="buttonGroup">
              <span
                class="operatorArticle"
                @click="removeArt(article.article_id)"
              >删除文章</span>
              <span class="operatorArticle">修改文章</span>
              <span
                class="operatorArticle"
                @click="articleAddTag(article.article_id)"
              >加入标签</span>
            </div>

          </el-timeline-item>

        </el-timeline>
      </div>
      <!--  分页器 -->
      <div class="pagination">
        <Pagination />
      </div>
    </div>

    <!-- 侧边栏小工具 -->
    <div class="tools">
      <el-backtop :right="10">
        <i class="el-icon-arrow-up"></i>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '../../../components/pagination'
export default {
  data() {
    return {
      isFirst: -1
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 获取全部文章
    all() {
      this.isFirst = -1
      this.$store.dispatch('getArticleList', { action: 'AllArt' })
    },
    //根据id获取文章详情
    detailArticle(id) {
      console.log(id)
      let data = {
        article_id: id,
        action: 'findById'
      }

      this.$store.dispatch('findById', data).then(() => {
        //获取文章的评论数
        let data2 = {
          Art_id: id,
          action: 'allCommand'
        }
        this.$store.dispatch('getAllRemark', data2).then(() => {
          //等请求完成后再跳转
          console.log(6666)
          this.$router.push('/onearticle')
        })
      })
    },
    //根据分类获取文章
    getClassificationArticle(event, index) {
      this.isFirst = index
      let data = {
        action: 'showArtForClassify',
        claName: event.target.innerText
      }
      this.$store.dispatch('getAllArticleByClassification', data)
    },
    articleAddTag(id) {
      this.$bus.$emit('changeTransparency', id)
    },

    //移除文章的标签
    removeArtTag(art_id, tag_name) {
      console.log('移除标签')
      this.$alert('确定删除该标签吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(art_id, tag_name)
          let data = {
            action: 'delTagForArt',
            art_id: art_id,
            tag_name: tag_name
          }
          this.$store.dispatch('deleteTagForArt', data).then(res => {
            //获取所有标签
            this.all()
          })
        })
        .catch(() => {})
    },

    //移除文章
    removeArt(art_id) {
      console.log('移除文章')
      this.$alert('确定删除该文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(art_id)
          let data = {
            action: 'deleteArt',
            art_id: art_id
          }
          this.$store.dispatch('deleteArtById', data).then(res => {
            console.log('scres', res)
          })
        })
        .catch(() => {})
    }
  },
  computed: {
    ...mapState({
      allArticleList: state => state.article.allArticleList,
      allClassification: state => state.tagClassification.allClassification
    })
  },
  mounted() {
    //获取文章总数
    console.log('获取文章总数请求触发')
    this.$store.dispatch('getArticleCount', { action: 'allArtCount' })
    //获取所有分类名
    this.$store.dispatch('getAllClassification', { action: 'showClassify' })
  }
}
</script>

<style lang="less" scoped>
.body {
  display: flex;
  .classify {
    position: relative;
    top: -60px;
    left: 21%;
    display: flex;
    height: 30px;
    border-radius: 6px;
    div {
      background-color: rgba(183, 168, 168, 0.3);
      line-height: 30px;
      width: 50px;
      text-align: center;
      border: 1px solid #ccc;
      color: #fff;
      list-style-type: none;
      justify-content: space-around;
      align-items: center;
      border-radius: 6px;
      &:hover {
        background-color: #666;
      }
      &.active {
        background-color: #ccc;
        color: black;
        cursor: pointer;
      }
      &:hover {
        // background-color: #ccc;
        // color: black;
        cursor: pointer;
      }
    }
  }
  .time {
    width: 40%;
    height: 700px;
    position: absolute;
    left: 30%;

    // background-color: rgb(232, 41, 41);
  }

  .tools {
    width: 100px;
    height: 500px;
    position: absolute;
    right: 5%;
    background-color: rgb(18, 247, 255);
  }
  .pagination {
    margin-top: 40px;
  }
}
.title {
  margin-top: -10px;
}
.content {
  height: 30px;
}
.article {
  &:hover {
    box-shadow: 0 0 10px #ccc;
  }
  cursor: pointer;
}
.artTags {
  cursor: pointer;
  position: absolute;
  top: 32px;
  left: 77%;
  width: 102px;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  .tag {
    font-size: 12px;
    text-align: left;
    padding: 0 15px;
    border-radius: 4px;
    background-color: rgb(51, 205, 243);
    margin-bottom: 6px;
  }
}
.removeButton {
  float: left;
  position: relative;
  top: -5px;
  left: 104%;
  z-index: 999;
  color: rgb(167, 240, 245);
  &:hover {
    color: rgb(255, 0, 0);
  }
}
.el-timeline-item {
  padding-bottom: 0px;
}
.buttonGroup {
  width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: -60px;
  left: 101%;
}
.operatorArticle {
  text-align: center;
  width: 70px;
  font-size: 10px;
  border-radius: 8px;
  border: #fff;
  cursor: pointer;
  background-color: rgba(183, 168, 168, 0.3);
  color: #fff;
  margin: 3px 0 0 0;
  &:hover {
    background-color: #ccc;
    color: black;
  }
}
</style>