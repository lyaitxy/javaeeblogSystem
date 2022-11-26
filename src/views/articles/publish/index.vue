<template>
  <div class="publish">
    <div class="text">
      <input
        type="text"
        placeholder="标题"
        v-model="title"
      >
      <input
        type="text"
        placeholder="一句话描述文章"
        v-model="desc"
      >
    </div>
    <!-- 编辑器 -->
    <mavon-editor
      v-model="contents"
      :navigation='true'
      :ishljs='true'
    />
    <button
      @click="publish"
      class="pubBtn"
    >发布</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      contents: '文章内容',
      title: '',
      desc: ''
    }
  },
  methods: {
    publish() {
      let { title, desc, contents } = this
      let data = {
        action: 'saveArt',
        title,
        desc,
        contents
      }
      this.$store.dispatch('PublishArticle', data)
      this.$store.dispatch('getArticleList', { action: 'AllArt' })
      this.$router.push('/home')
    }
  }
}
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
  margin-top: 8px;
  border-radius: 5px;
  &:hover {
    color: rgb(255, 255, 255);
    box-shadow: 0 0 5px #aaa;
  }
}
</style>