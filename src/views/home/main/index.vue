<template>
  <div class="body">
    <!-- 分类展示行 -->
    <div class="classify">
      <!-- 默认全部被选中 -->
      <div :class="{ active: isFirst === -1 }" @click="all">全部</div>
      <div
        :class="{ active: isFirst === index }"
        @click="getClassificationArticle($event, index)"
        v-for="(classification, index) in allClassification"
        :key="index"
      >
        {{ classification.classify_name }}
      </div>
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
            class="timeline-item"
          >
            <el-card class="article">
              <div>
                <h4 class="title" @click="detailArticle(article.article_id)">
                  {{ article.title }}
                </h4>

                <div class="artTags" v-show="isLogin">
                  <div v-for="(artTag, index) in article.tags" :key="index">
                    <div class="tag iconfont icon-biaoqian">
                      {{ artTag.tag_name
                      }}<span
                        class="el-icon-remove removeButton"
                        @click="
                          removeArtTag(article.article_id, artTag.tag_name)
                        "
                      ></span>
                    </div>
                  </div>
                </div>

                <p class="content" @click="detailArticle(article.article_id)">
                  {{ article.descr }}
                </p>
              </div>
            </el-card>
            <div class="buttonGroup" >
              <span
                class="operatorArticle"
                @click="deleteArt(article.article_id)"
                v-show="parseInt(userInfo.user_id) === article.user_id"
                >删除文章</span
              >
              <span
                class="operatorArticle"
                @click="changeArticle(article.article_id)"
                v-show="parseInt(userInfo.user_id) === article.user_id"
                >修改文章</span
              >
              <span
                class="operatorArticle"
                @click="articleAddTag(article.article_id)"
                v-show="isLogin"
                >加入标签</span
              >
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
    <div >
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;" class="tools">
        点我工具栏
      </el-button>

      <el-drawer
        class="elDrawer"
        title="工具栏"
        :visible.sync="drawer"
        :direction="direction"
        :modal= false
        >
        <div class="function">
          <div class="options" @click="login()">登录</div>
          <div class="options" @click="signOut()" >退出登录</div>
          <div class="options" @click="register()">注册</div>
          <div class="options" @click="exchangeBrightness()">切换亮度</div>
        </div>
       
      </el-drawer>


      <el-backtop :right="10">
        <i class="el-icon-arrow-up"></i>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Pagination from "../../../components/pagination";
export default {
  data() {
    return {
      isFirst: -1,
      curClassification: "",
      drawer: false,
      direction: "rtl",
      isMyArticle: false
    };
  },
  components: {
    Pagination,
  },
  methods: {
    // 获取全部文章
    all() {
      this.isFirst = -1;
      this.$store.dispatch("getArticleList", { action: "AllArt" }).then(() => {
        this.$store.dispatch("getArticleCount", { action: "allArtCount" });
      });
      this.$bus.$emit("clickAll");
    },
    //根据id获取文章详情
    detailArticle(id) {
      console.log("根据id显示具体文章",id);
      let data = {
        article_id: id,
        action: "findById",
      };

      this.$store.dispatch("findById", data).then(() => {
        //获取文章的评论数
        let data2 = {
          Art_id: id,
          action: "allCommand",
        };
        this.$store.dispatch("getAllRemark", data2).then(() => {
          //等请求完成后再跳转
          console.log(666666666666666);
          let oneArticle = this.$store.state.article.oneArticle
          window.localStorage.setItem("title", JSON.stringify(oneArticle[0].title))
          window.localStorage.setItem("artId", JSON.stringify(oneArticle[0].article_id))
          window.localStorage.setItem("contents", JSON.stringify(oneArticle[0].contents))
          window.localStorage.setItem("name", JSON.stringify(oneArticle[0].name))
          window.localStorage.setItem("zan", JSON.stringify(oneArticle[0].zan))
          let allRemark = this.$store.state.commentLike.allRemark.data
          window.localStorage.setItem("allRemark", JSON.stringify(allRemark))
          

          
          // setTimeout(() => {
          //   window.location.reload()
          // },100)
          this.$router.push(`/onearticle/${id}`);

         
          
        });
      });
    },
    //根据分类获取文章
    getClassificationArticle(event, index) {
      this.isFirst = index;
      //保留当前分类，为点击页数时使用
      this.curClassification = event.target.innerText;
      let data = {
        action: "showArtForClassify",
        claName: event.target.innerText,
        page: 1,
      };
      this.$store.dispatch("getAllArticleByClassification", data).then(() => {
        this.$store.dispatch("getAllArticleCountByClassification", {
          action: "allClaNum",
          claName: event.target.innerText,
        });
      });
    },
    articleAddTag(id) {
      this.$bus.$emit("changeTransparency", id);
    },

    //移除文章的标签
    removeArtTag(art_id, tag_name) {
      console.log("移除标签");
      this.$alert("确定删除该标签吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(art_id, tag_name);
          let data = {
            action: "delTagForArt",
            Art_id: art_id,
            tag_name: tag_name,
          };
          this.$store.dispatch("deleteTagForArt", data).then((res) => {
            //获取所有标签
            this.all();
          });
        })
        .catch(() => {});
    },

    // 删除文章
    deleteArt(id) {
      console.log("移除标签");
      this.$alert("确定删除该文章吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            action: "deleteArt",
            Art_id: id,
          };
          this.$store.dispatch("deleteArtById", data).then((res) => {
            console.log("sccg");
            //重新获取文章
            let data2 = {
              action: "AllArt",
            };
            this.$store.dispatch("getArticleList", data2);
          });
        })
        .catch(() => {});
    },

    //修改文章按钮
    changeArticle(id) {
      this.$router.push("/publish/" + id);
    },

    //登录
    login() {
      if (JSON.parse(window.localStorage.getItem("isLogin"))) {
        this.$message({
          message: "您已登录",
          type: "warning",
        });
      } else {
        this.$router.push("/login");
      }
    },
    //注册
    register() {
      this.$router.push("/register");
    },
    //切换亮度
    exchangeBrightness() {
      this.$bus.$emit("exchangeBrightness");
    },

    //退出登录
    signOut() {
      if (!this.isLogin) {
        this.$alert("您还未登录,是否登录", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: (action) => {
              this.$router.push("/login");
          }
          
        });
        return 
      }
      //清除token
      window.localStorage.setItem("isLogin", false);
      //发起游客登录请求
      this.$store.dispatch('visitor',{action: 'visitor'}).then(()=>{
        //打印游客信息
        console.log("游客信息",this.$store.state.user);
        this.$message({
          message: '退出成功',
          type: 'success'
        });
        this.$router.push("/login");
      })
    },

  },
  computed: {
    ...mapState({
      allArticleList: (state) => state.article.allArticleList,
      allClassification: (state) => state.tagClassification.allClassification,
      userInfo: (state) => state.user.userInfo,
      isLogin: (state) => JSON.parse(window.localStorage.getItem("isLogin")),
    }),
  },
  mounted() {
    //获取文章总数
    this.$store.dispatch("getArticleCount", { action: "allArtCount" });
    //获取所有分类名
    this.$store.dispatch("getAllClassification", { action: "showClassify" });

    this.$bus.$on("currentPage", (page) => {
      if (this.curClassification) {
        let data = {
          action: "showArtForClassify",
          claName: this.curClassification,
          page: page,
        };
        this.$store.dispatch("getAllArticleByClassification", data);
      }
    });

    
    
  },
};
</script>

<style lang="less" scoped>
.body {
  display: flex;
  .classify {
    position: relative;
    top: -60px;
    left: 16%;
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
    width: 43%;
    height: 700px;
    position: absolute;
    left: 30%;

    // background-color: rgb(232, 41, 41);
  }

  .tools {
    width: 100px;
    height: 50px;
    position: fixed;
    right: 1%;
    bottom: 15%;
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
.elDrawer{
  position: fixed;
  top: 50%;
  width: 100%;
  height: 100px;
  .function{
    display: flex;
    justify-content: space-around;
    .options {
      background-color: aqua;
      border-radius: 5px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: rgb(255, 255, 255);
      }
    }
  }
}

</style>