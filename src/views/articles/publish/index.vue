<template>
  <div class="publish">
    <div class="text">
      <input type="text" placeholder="标题" v-model="title" />
      <input type="text" placeholder="一句话描述文章" v-model="desc" />
    </div>
    <!-- 编辑器 -->
    <mavon-editor v-model="contents" :navigation="true" :ishljs="true" />
    <button @click="publish">发布</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contents: "文章内容",
      title: "",
      desc: "",
    };
  },
  methods: {
    publish() {
      console.log("点击发布",this.$route.params.id);
      if (this.$route.params.id) {
        // 修改文章
        let data = {
          action: "reviseArt",
          Art_id: this.$route.params.id,
          title: this.title,
          desc: this.desc,
          contents: this.contents,
        }
        this.$store.dispatch("updateArtById",data).then(() => {
          //获取最新的文章列表
          this.$store.dispatch("getArticleList", { action: "AllArt" });
        })
      } else{
        // 发布文章
        let { title, desc, contents } = this;
        let data = {
          action: "saveArt",
          title,
          desc,
          contents,
        };
        this.$store.dispatch("PublishArticle", data).then(() => {
          this.contents = "";
          this.title = "";
          this.desc = "";
          this.$store.dispatch("getArticleList", { action: "AllArt" });
        });
      }
     
     
      this.$router.push("/home");
    },
  },

  mounted() {
    let id = this.$route.params.id;
    if (id) {
      let data = {
        action: "findById",
        article_id: id,
      };
      this.$store.dispatch("findById", data).then(() => {
        let { title, descr, contents } = this.$store.state.article.oneArticle[0];
        this.title = title;
        this.desc = descr;
        this.contents = contents;
      });
    }
  },
};
</script>

<style lang="less" scoped>
.publish {
  margin: 60px 40px 40px 40px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .text {
    input {
      outline-color: skyblue;
      margin-right: 10px;
    }
  }
}
button {
  width: 70px;
  height: 30px;
  position: absolute;
  right: 16.5%;
  cursor: pointer;
  background-color: rgb(145, 163, 239);
  border: 0;
  &:hover {
    color: rgb(255, 255, 255);
  }
}
</style>