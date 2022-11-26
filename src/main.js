import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'


//引入全局样式表
import './assets/css/global.css'
//引入饿了么样式表
import 'element-ui/lib/theme-chalk/index.css'
//引入仓库
import store from './store/index.js'
//引入阿里图标
import './assets/font/iconfont.css'
//引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
//引入highlight.js
import hljs from 'highlight.js'
//引入highlight.js样式
import 'highlight.js/styles/srcery.css'
Vue.directive('highlight',function(el){
  let blocks = el.querySelectorAll('div');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  }
  )
})
Vue.prototype.$hljs = hljs


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
  }
  
}).$mount('#app')
