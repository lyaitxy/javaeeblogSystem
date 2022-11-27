<template>
  <div class="register_container">
    <div class="register_box">
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="rules"
        label-width="100px"
        class="register_form"
      >
        <el-form-item prop="username" label="用户名" class="register_label">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetFields">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="noAccout" type="text" @click="goRegister">没有账号？去注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
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
      },
    };
  },
  methods: {
    
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid === true) {
          window.localStorage.setItem("username", this.loginForm.username);
          window.localStorage.setItem("password", this.loginForm.password);
          window.localStorage.setItem("isLogin", true);
          //发送请求，验证用户名和密码，若登录成功，跳转到首页
          let data = {
            action: "login",
            username: this.loginForm.username,
            password: this.loginForm.password,
          };
          this.$store.dispatch('login', data).then(() => {
             this.$router.push("/home");
          this.$message({
            //可以关闭消息弹窗
            showClose: true,
            message: "登录成功",
            type: "success",
          });
          })
         
        } else {
          this.$message({
            showClose: true,
            message: "用户名或密码错误",
            type: "error",
          });
        }
      });
    },
    resetFields() {
      this.$refs.loginForm.resetFields();
    },

    goRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.noAccout{
  position: relative;
  left: 20px;
  top: -10px;
}
.register_container {
  color: #fff;
  background-color: skyblue;
  height: 100vh;
  background-image: url("../../assets/img/wyy7.png");
  background-size: cover;
}
.register_box {
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 300px;
  background-color: rgba(135, 206, 235, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 5px #666;
}

.register_form {
  position: relative;
  top: 20%;
  left: -10%;
}
.el-form-item .el-form-item__label {
  color: #fff !important;
}
</style>