<template>
  <div class="main">
    <div class="occur">请不要发表与本项目无关的言论，谢谢！！！</div>
    <!-- 信息展示 -->
    <div class="exhibit" v-for="(msg, index) in messageList" :key="index">
      <div class="name">{{ msg.name }}</div>
      <div class="time">{{ msg.createTime }}</div>
      <div class="contents">{{ msg.contents }}</div>
    </div>
    <div class="leave">
      <div>
        <div class="remark">发表留言</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          placeholder="请输入内容"
          v-model="comment"
        >
        </el-input>
        <div class="publishandcancel">
          <button @click="cancel()">取消</button>
          <button @click="publish()">发表</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    ...mapState({
      messageList: (state) => state.messageBoard.messageList.data,
    }),
  },
  methods: {
    cancel() {
      this.comment = "";
    },
    publish() {
      this.$store
        .dispatch("declareMessage", {
          action: "addMessage",
          contents: this.comment,
        })
        .then(() => {
          this.$store.dispatch("getAllMessage",{action:'viewMsg'}).then(() => {
            this.comment = "";
            this.$message({
              message: "留言成功,感谢您的支持",
              type: "success",
            });
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.occur{
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}
.main {
  background-color: rgba(113, 113, 112, 0.986);
  .exhibit {
    position: relative;
    left: 25%;
    width: 600px;
    background-color: #fff;
    // transform: translate(-50%,-50%);
    .name {
      background-color: rgb(241, 120, 120);
      width: 100px;
      text-align: center;
    }
    .time {
      position: absolute;
      left: 100px;
      top: 0px;
      width: 500px;
      background-color: rgb(65, 247, 119);
    }
    .contents {
      position: relative;
      left: 70px;
      width: 460px;
      background-color: rgb(80, 65, 247);
    }
  }
}
.remark {
  background-color: rgba(183, 168, 168, 0.3);
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
}
.publishandcancel {
  width: 100px;
  position: relative;
  left: 80%;
  button {
    outline: skyblue;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 8px;
    background-color: skyblue;
    color: rgb(255, 255, 255);
    margin: 0 0 0 20px;
    cursor: pointer;
    &:hover {
      background-color: rgb(255, 255, 255);
      color: skyblue;
    }
  }
}
</style>