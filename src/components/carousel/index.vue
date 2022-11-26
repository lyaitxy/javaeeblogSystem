<template>
  <div>
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in data" :key="item.id">
          <!-- <h3 class="small">{{ item }}</h3> -->
          <img :src="item.img" class="img">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"]
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.img {
  height: 100%;
  width: 100%;
}
</style>