import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入vant组件
import { Tabbar, TabbarItem, Button } from 'vant';
// 引入vant全局样式
import 'vant/lib/index.css';

createApp(App)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(store).use(router).mount('#app')
