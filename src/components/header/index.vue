<template>
  <div class="head">
    <!-- 标语 -->
    <div
      class="word"
      @click="toHome"
    >
      <a style="cursor: pointer;">个人博客</a>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <input
        type="text"
        placeholder="请输入关键字"
        class="word"
        v-model="keyword"
      />
      <button
        class="btn"
        @click="search"
      >搜索</button>
    </div>
    <!-- 导航栏 -->
    <div class="menu">
      <ul class="item">
        <li>
          <span class="iconfont icon-shouye"></span>
          <a @click="toHome">首页</a>
        </li>
        <li>
          <a>
            <el-dropdown>
              <span class="el-dropdown-link">
                <span class="iconfont icon-zuixinwenzhang_huaban"></span><span class="articleManage">文章管理</span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">
                  <router-link
                    to="/publish"
                    class="publish"
                  >发布文章</router-link>
                </el-dropdown-item>

                <el-dropdown-item icon="el-icon-edit">
                  <router-link
                    to="#"
                    class="publish"
                  >修改文章</router-link>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete">
                  <router-link
                    to="#"
                    class="publish"
                  >删除文章</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
        <li><span class="iconfont icon-about"></span><a>关于</a></li>
        <li><span class="iconfont icon-liuyan"></span><a>留言</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    toHome() {
      this.$router.push('/home')
    },
    publish() {
      this.$router.push('/publish')
    },
    search() {
      let data = {
        action: 'searchArt',
        keyword: this.keyword
      }
      this.$store.dispatch('searchArticle', data)
      this.keyword = ''
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #33cdf3 !important;
  z-index: 9999;
  .search {
    position: absolute;
    left: 40%;
    top: 10px;
    .btn {
      width: 50px;
      height: 30px;
      background-color: rgba(183, 168, 168, 0.3);
      color: #fff;
      border: none;
      border-radius: 5px;
      margin: 0 0 0 10px;
      cursor: pointer;

      &:hover {
        color: #000;
        background-color: #ccc;
      }
    }
    .word {
      width: 200px;
      height: 25px;
      border-radius: 5px;
      a {
        cursor: pointer;
      }
      &:focus {
        outline: rgb(80, 242, 40) solid 1px;
        border: 2px solid transparent;
      }
    }
  }
}
.menu {
  position: absolute;
  right: 0;
  top: 0;
  .item {
    display: flex;
    list-style: none;
    li {
      margin: 0 10px;

      a {
        text-decoration: none;
        color: rgb(0, 0, 0);
        cursor: pointer;
        .articleManage {
          color: #000;
          font-size: 16px;
          &:hover {
            color: rgb(255, 255, 255);
          }
        }
        &:hover {
          color: rgb(255, 255, 255);
          .articles {
            .a {
              display: block;
            }
          }
        }
      }
    }
  }
}
.word {
  float: left;
  margin-left: 20px;
  line-height: 50px;
}
.publish {
  text-decoration: none;
  color: #606266;
}
</style>