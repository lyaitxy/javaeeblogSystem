<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        :model="dataform"
        ref="dataform"
        :rules="rules"
        label-width="100px"
        class="register_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username" label="用户名" class="register_label">
          <el-input
            type="text"
            v-model="dataform.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="dataform.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email" label="邮箱">
          <el-input
            v-model="dataform.email"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" class="YZM">
          <el-input v-model="dataform.yzm" class="yzm_input"></el-input>
          <img
            :src="`http://124.223.6.87:8084/SpringBlogs/yzm.jpg?a=${date}`"
            class="photo"
          />
          <a class="nextPhoto" @click="changePhoto">看不清，换一张</a>
        </el-form-item>
        <!-- 注册和重置按钮 -->
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="resetFields">重置</el-button>
          <el-button @click="login">去登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      dataform: {
        action: "regist",
        username: "",
        password: "",
        email: "",
        yzm: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    resetFields() {
      this.$refs.dataform.resetFields();
    },
    register() {
      this.$refs.dataform.validate((valid) => {
        if (valid === true) {
          //发送请求，向数据库添加数据，若注册成功，跳转到登录页面

          this.$store.dispatch("registerUser", this.dataform);
          if (this.$store.state.user.registerInfo.errCode === 0) {
            this.$message({
              //可以关闭消息弹窗
              showClose: true,
              message: "注册成功",
              type: "success",
            });

            this.$router.push("/login");
          } else {
            //提示错误信息
            this.$message({
              //可以关闭消息弹窗
              showClose: true,
              message: this.$store.state.user.registerInfo.msg,
              type: "error",
            });
            return false;
          }
        } else {
          //提示错误信息
          this.$message({
            //可以关闭消息弹窗
            showClose: true,
            message: "注册失败",
            type: "error",
          });
          return false;
        }
      });
    },
    changePhoto() {
      //点击换一张，刷新验证码
      this.date = new Date();
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.register_container {
  height: 100vh;
  background-image: url("../../assets/img/Pirates.png");
  background-size: cover;
}
.register_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 350px;
  width: 350px;
  background-color: rgba(135, 206, 235, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 5px #666;
}

.register_form {
  position: relative;
  top: 2%;
  left: -5%;
}
.yzm_input {
  width: 100%;
}

.nextPhoto {
  position: absolute;
  left: 60%;
  top: 50%;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
.YZM {
  margin: 0 0;
}
.photo {
  margin-top: 12px;
  height: 40px;
  width: 130px;
}
</style>