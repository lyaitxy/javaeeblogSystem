import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Timeline,
  TimelineItem,
  Backtop,
  Card,
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Carousel,
  CarouselItem,
  MessageBox,
  Select,
  Option,
  Drawer,


} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Timeline)
Vue.use(Backtop)
Vue.use(TimelineItem)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Drawer)
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
