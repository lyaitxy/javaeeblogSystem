<template>
  <div class="body">
    <!-- 个人中心 -->
    <div class="self">
      <!-- 头像区 -->
      <div>
        <img :src="userInfo.touxiang" class='img' />
      </div>
      <!-- 用户名 -->
      <div class="name">{{userInfo.name}}</div>
      <!-- 加入标签 -->
      <div class="collet" v-show="isLogin()">
        <li
          class="biaoqian"
          v-for="(tag, index) in allTag"
          :key="index"
          v-show="index < 4"
        >
          <!-- <div class="iconfont icon-biaoqian">{{tag.tag_name}}</div>
          <span class="el-icon-remove removeTag"></span> -->
          <div class="el-icon-remove iconRemove" @click="deleteTag(tag.tag_name)"></div>
          <div class="iconfont icon-biaoqian iconBiaoqian"></div>
          <el-dropdown>
            <div class=" tagName" @click="getAllArticleByTag(tag.tag_name)">
              {{ tag.tag_name }}
              
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div class="iconfont icon-biaoqian" @click="getAllArticleByTag(tag.tag_name)">{{ tag.tag_name }}</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        
        <el-dropdown v-show="allTag.length > 4">
          <span class="el-dropdown-link el-icon-more newTag"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(tag, index) in allTag"
              :key="index"
              v-show="index >= 4"
            >
              <div class="iconfont icon-biaoqian" @click="getAllArticleByTag(tag.tag_name)">{{ tag.tag_name }} <span class="el-icon-remove iconRemove2" @click="deleteTag(tag.tag_name)"></span></div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       
        <div class="newTag el-icon-plus" @click="createTag">Tag</div>
      </div>
    </div>

    <!-- 公告 -->
    <div class="notice">
      <span class="iconfont icon-gonggaoxiaolaba"></span>
      公告
      <div>完善功能，优化网站</div>
    </div>
    <!-- 热门文章 -->
    <div class="hot">
      <span class="iconfont icon-huore"></span>
      热门文章
      <!-- 轮播图 -->
      <div class="carousel">
        <Carousel :data="hotArticle" />
      </div>
    </div>
    <!-- 推荐文章 -->
    <div class="recommondArticles">
      <span class="iconfont icon-zuixinwenzhang_huaban"></span>
      推荐文章
      <!-- 轮播图 -->
      <div class="carousel">
        <Carousel :data="hotArticle" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Carousel from "../carousel/index.vue";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          title: "标题1",
          content: "内容1",
          img: "https://img-blog.csdnimg.cn/20200527153605959.png",
        },
        {
          id: 2,
          title: "标题2",
          content: "内容2",
          img: "https://img-blog.csdnimg.cn/20200527153605959.png",
        },
        {
          id: 3,
          title: "标题3",
          content: "内容3",
          img: "https://img-blog.csdnimg.cn/20200527153605959.png",
        },
        {
          id: 4,
          title: "标题4",
          content: "内容4",
          img: "https://img-blog.csdnimg.cn/20200527153605959.png",
        },
      ],
      
    };
  },
  components: {
    Carousel,
  },
  computed: {
    ...mapState({
      allTag: (state) => state.tagClassification.allTag.data || [],
      userInfo: (state) => state.user.userInfo || {},
      hotArticle: (state) => state.article.hotArticleList || [],
    }),
    
  },
  mounted() {
    //获取所有标签
    this.$store.dispatch("getAllTag", { action: "allTag" })
  
  },
  methods: {
    isLogin() {
      console.log("侧边栏",window.localStorage.getItem("isLogin")== 'true');
      return window.localStorage.getItem("isLogin") === "true";
    },
    createTag() {
      //定义全局事件总线，让透明度变低
      this.$bus.$emit("changeTransparency");
    },
    //删除标签
    deleteTag(tagName) {
      this.$alert("确定删除该标签吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            action: "deleteTag",
            tag_name: tagName,
          };
          this.$store.dispatch("deleteTag", data).then((res) => {
            //获取所有标签
            this.$store.dispatch("getAllTag", { action: "allTag" });
          });
        })
        .catch(() => {
        });
    },
    //根据标签获取文章
    getAllArticleByTag(tagName) {
      //获取标签下的文章总数
      let data = {
        action: "allArtCountOfTag",
        tag_name: tagName,
      }
      this.$store.dispatch('getAllArticleCountByTag',data).then(() => {
        this.$bus.$emit("getAllArticleByTag", tagName);
      })
      
    },
  },
};
</script>

<style lang="less" scoped>
.self {
  height: 200px;
  width: 100%;
  background-color: rgba(183, 168, 168, 0.3);
  border-radius: 10px;
  margin-left: 5px;
  .img {
    width: 80px;
    height: 80px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 10px;
    border: 1px solid rgb(183, 168, 168);
    border-radius: 40px;
    object-fit: cover;
  }

  .name {
    position: relative;
    left: 36%;
    color: rgb(255, 255, 255);
    font-size: 14px;
  }
  .collet {
    width: 180px;
    flex-wrap: wrap;
    position: relative;
    left: 10%;
    top: 6%;
    display: flex;
    flex-direction: row;
    li {
      list-style-type: none;
     
    }
  }
}
.biaoqian {
  font-size: 15px;
  width: 60px;
  height: 30px;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    color: aquamarine;
    box-shadow: 0 0 10px #ccc;
  }
}
.tagName{
  width: 30px;
  height: 20px;
  font-size: 14px;
  -webkit-transform: scale(0.8);
  // text-align: center;
  // line-height: 30px;
  color: #fff;
  overflow: hidden;
  position: relative;
  left: 62%;
  top: -25px;
  &:hover {
        color: aquamarine;
        // box-shadow: 0 0 10px #ccc;
      }
}
.newTag {
  width: 60px;
  height: 30px;
  font-size: 12px;
  
  color: rgb(255, 255, 255);
  line-height: 28px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: aquamarine;
    box-shadow: 0 0 10px #ccc;
  }
  
}
.iconBiaoqian{
  font-size: 12px;
  position: relative;
  top: -10px;
  left: 5px;
}
.iconRemove {
  font-size: 10px;
  position: relative;
  left: 48px;
  top: -6px;
  &:hover {
    color: rgb(247, 0, 0);
    box-shadow: 0 0 10px #ccc;
  }
}
.iconRemove2{
  font-size: 12px;
  &:hover {
    color: red;
    box-shadow: 0 0 10px #ccc;
  }
}
.hot {
  height: 180px;
  background-color: rgb(178, 205, 216);
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 5px #666;
  // margin-left: 5px;
  margin: 0 0 10px 5px;
  .carousel {
    box-sizing: border-box;
    border-radius: 0 0 8px 8px;
    // width: 220px;
    width: 100%;
    height: 150px;
    background-color: #fff;
  }
}
.notice {
  height: 50px;
  margin: 10px 0 20px 0;
  background-color: rgb(153, 237, 223);
  border-radius: 8px;
  margin-left: 5px;
  text-align: center;
}
.recommondArticles {
  // widows: 100%;
  height: 180px;
  background-color: skyblue;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 5px #666;
  margin-left: 5px;
  .carousel {
    box-sizing: border-box;
    border-radius: 0 0 8px 8px;
    // width: 220px;
    width: 100%;
    height: 150px;
    background-color: #fff;
  }
}
</style>