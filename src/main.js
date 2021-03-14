import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入vant组件
import { Swipe, SwipeItem, Search, Image as VanImage, Lazyload,Form,Field,Icon,Progress,Col, Row,Circle,SwipeCell,
  Badge, Sidebar, SidebarItem,Collapse, CollapseItem,Tab, Tabs,Card,Grid, GridItem,Button, Tag,
  Tabbar, TabbarItem, PullRefresh } from 'vant';
// 引入vant全局样式
import 'vant/lib/index.css';

createApp(App)
  // 轮播图
  .use(Swipe)
  .use(SwipeItem)
  // 搜索框
  .use(Search)
  // 图片样式
  .use(VanImage)
  // 图片懒加载
  .use(Lazyload, {
    // 加载时的默认图片
    loading: require('./assets/images/default.png'),
    lazyComponent: true,
  })
  .use(Badge)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(Grid)
  .use(GridItem)
  .use(Button)
  .use(Tag)
  .use(Form)
  .use(Field)
  .use(Icon)
  .use(Progress)
  .use(Col)
  .use(Row)
  .use(Circle)
  .use(SwipeCell )
  .use(Tabbar)
  .use(TabbarItem)
  .use(PullRefresh)
  .use(store).use(router).mount('#app')
