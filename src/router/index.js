import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import {Notify} from 'vant'

// 懒加载按需导入组件
const Home = () => import('views/home/Home')
const Search = () => import('views/search/Search')
const Category = () => import('views/category/Category')
const Detail = () => import('views/detail/Detail')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Register = () => import('views/profile/auth/Register')
const Login = () => import('views/profile/auth/Login')
const Address = () => import('views/profile/address/Address')
const AddressEdit = () => import('views/profile/address/AddressEdit')
const Order = () => import('views/profile/order/Order')
const CreateOrder = () => import('views/profile/order/CreateOrder')
const Collect = () => import('views/profile/collect/Collect')

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
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: 'Ugo | 搜索商品'
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
      title: 'Ugo | 购物车',
      isAuthRequired: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Ugo | 个人中心',
      isAuthRequired: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Ugo | 用户注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Ugo | 用户登录'
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      title: 'Ugo | 地址管理',
      isAuthRequired: true
    }
  },
  {
    path: '/address-edit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      title: 'Ugo | 编辑地址',
      isAuthRequired: true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title: 'Ugo | 订单管理',
      isAuthRequired: true
    }
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: CreateOrder,
    meta: {
      title: 'Ugo | 生成订单',
      isAuthRequired: true
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    component: Collect,
    meta: {
      title: 'Ugo | 商品收藏',
      isAuthRequired: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  document.title = to.meta.title;

  // 判断跳转的目的需不需要登录
  // 如果没有登录，在导航守卫直接跳到login
  if (to.meta.isAuthRequired && store.state.user.isLogin === false ) {
    Notify('请先登录')
    return next('/login')
  } else {
    store.dispatch('updateCartCount')
    next();
  }
})

export default router
