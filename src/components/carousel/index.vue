<template>
  <div>
    <div class="block">
      <el-carousel indicator-position="none" height="150px">
        <el-carousel-item  v-for="item in data" :key="item.id" v-show="item.id < 4">
          
          <img :src="item.img" class="img">
          <h3 class="small">{{ item.title }}</h3>
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
  cursor: pointer;
 

}
.small{
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: rgb(0, 0, 0) !important;
  text-align: center;
  
  z-index: 222;
}
</style>