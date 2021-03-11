import { createRouter, createWebHistory } from 'vue-router'

// 懒加载按需导入组件
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Detail = () => import('views/detail/Detail')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Ugo | 首页'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: 'Ugo | 商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      title: 'Ugo | 商品详情'
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      title: 'Ugo | 购物车'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Ugo | 个人中心'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('views/test/Test'),
    meta: {
      title: 'Ugo | Test'
    },

  },
  {
    path: '/test-v',
    name: 'TestV',
    component: () => import('views/test/TestVant'),
    meta: {
      title: 'Ugo | Test'
    },

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  // 如果没有登录，在导航守卫直接跳到login

  next();

  document.title = to.meta.title;

})

export default router
