<template>
  <div class="home" ref="home">
    <div class="head" :class="{'globalOpacity':isOpacity === true}">
      <div>
        <Header />
      </div>
    </div>
    <div class="container" :class="{'globalOpacity':isOpacity === true}">
      <div class="aside">
        <Aside />
      </div>

      <div class="main">
        <Main />
      </div>
    </div>

    <div class="footer" :class="{'globalOpacity':isOpacity === true}">
      <Footer />
    </div>
    <!-- 新建标签 -->
    <div ref="inputTag" class="inputTag" :style="{display: isOpacity? 'block' : 'none'}">
      <input type="text" placeholder="请输入标签名" v-model="tagName" v-if="newTag">
      <el-select class="selectInput" v-model="value" placeholder="请选择标签名" v-else-if="!newTag">
        <el-option
          v-for="(item, index) in allTag"
          :key="index"
          :label="item.tag_name"
          :value="item.tag_name">
        </el-option>
      </el-select>
      <button @click="confirm">确认</button>
      <button @click="cancel">取消</button>
    </div>
    <!-- :style="{display:isAppear? 'block' : 'none'} -->
    <!-- @click="confirm" -->
    <!-- v-model="tagName" -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import Aside from "../../components/aside";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Main from "./main";
export default {
  data() {
    return {
      isOpacity: false,
      tagName: "",
      //操作类型
      newTag: true,
      art_id: 0,
      //选择的标签
      value: ""
    };
  },
  components: {
    Header,
    Footer,
    Aside,
    Main,
  },
  computed: {
    ...mapState({
      allArticleList: (state) => state.article.allArticleList || [],
      allTag: (state) => state.tagClassification.allTag.data || [],
    }),
  },
  mounted() {
    //获取文章总数
    console.log("获取文章总数请求触发");
    
    this.$store.dispatch("getArticleCount", { action: "allArtCount" });
    
    this.$bus.$on("changeTransparency",(data) => {
      //如果data为文章id，说明是加入标签
      if(data){
        this.art_id = data;
        this.newTag = false;
      }
      this.isOpacity = !this.isOpacity;
    });
  },
  methods:{
    //新建标签
    confirm(){
      //如果art_id > 0，说明是加入标签
      if (this.art_id > 0) {
        if (this.value) {
          console.log(666);
          //发起加入标签请求
          this.$store.dispatch("addTagForArt", {
            action: "addTagForArt",
            Art_id: this.art_id,
            tag_name: this.value,
          });
          this.$refs.inputTag.style.display = "none";
          this.isOpacity = !this.isOpacity; 
          this.newTag = true;
          this.art_id = 0;
        } else {
          this.$message({
            message: "请选择标签",
            type: "warning",
          });
        }
      }
      //如果art_id = 0，说明是新建标签
      else {
        if (this.tagName) {
          console.log(666);
          this.$store.dispatch("addTag", { action: "createTag", tag_name: this.tagName });
          this.$refs.inputTag.style.display = "none";
          this.isOpacity = !this.isOpacity;
          this.tagName = "";
        } else {
          this.$message({
            message: "标签名不能为空",
            type: "warning",
          });
        }
      }
    },
    //取消新建标签或者取消加入标签
    cancel(){
      this.$refs.inputTag.style.display = "none";
      this.isOpacity = !this.isOpacity;
      this.tagName = "";
      this.art_id = 0;
      this.newTag = true;
      this.value = "";
    }
  },
  
  destroyed() {
    console.log("home组件销毁");
  },
};
</script>

<style lang="less" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
.home {
  width: 1263px;
  background-image: url("../../assets/img/zhuyebg.png");
  background-size: cover;
  animation: fadeIn 1s;
}
//全局透明度
.globalOpacity{
  opacity: 0.1;
  //设置元素不能被点击
  pointer-events: none;
}
.inputTag{
  width: 300px;
  height: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 10px 0 20px 0;
  background-color: rgb(153, 237, 223);
  border-radius: 8px;
  text-align: center;
  margin-left: 5px;
  z-index: 999;
  box-shadow: 0 0 20px #ccc;
  input{
    position: relative;
    top:16px;
    outline: none;
    height: 30px;
    padding: 0 10px;
  }
  button{
    position: relative;
    top:16px;
    left: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 0 0 3px;
    &:hover{
      color: rgb(6, 171, 247);
      background-color: #fff;
      outline: #fff;
    }
  }
}
.head {
  
  display: block;
  width: 100%;
  height: 50px;
  background-color: transparent;
}
.container {
  z-index: -1;
  display: flex;
  flex-direction: row;
}
.main {
  width: 100%;
  height: 650px;
  margin: 70px 0 70px 50px;
}
.aside {
  width: 300px;
  height: 400px;
  margin: 10px 20px ;
}
.footer {
  width: 100%;
  /* display: flex; */
}
.selectInput{
  position: relative;
  top: 20%;
  width: 190px;
}
</style>