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
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
