<template>
  <div>
    <div class="block">
      <el-carousel indicator-position="none" height="150px">
        <el-carousel-item  v-for="item in items" :key="item.id" >
          <a :href="`http://localhost:8080/#/onearticle/${item.article_id}`"><img :src="item.img" class="img"></a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data","hot"],
  computed: {
    items() {
      console.log(this.hot);
      if (this.hot) {
        console.log(this.data.slice(0, 3));
        return this.data.slice(0, 3);
      } else {
        console.log(this.data.slice(3, 6));
        return this.data.slice(3, 6);
      }
    
    }
  },
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