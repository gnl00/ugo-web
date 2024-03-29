<template>
  <div id="cart" class="cart">
    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>购物车管理</template>
    </navbar>
    <div id="content" class="content">
      <van-checkbox-group ref="checkboxGroup" @change="groupChange" v-model="result">
        <van-swipe-cell v-for="(item, index) in list" :key="item.cart" @open="openCell(item.cart.id)"
                        style=" padding: 0 0 0 35px">
          <template #left>
            <van-checkbox :name="item.cart.id" icon-size="22px" style="margin: 0 5px 0 5px"></van-checkbox>
          </template>

          <van-card class="goods-card" :class="{isChoose: result.includes(item.cart.id)}"
                    style="border-radius: 10px;"
                    :num="item.cart.quantity"
                    :price="Number(item.cart.price).toFixed(2)"
                    desc="描述信息..."
                    :title="item.goodsName"
                    :thumb="item.picture[0]"
                    @click="$router.push('/detail?id=' + item.cart.goodsId )">

            <template #footer>
              <van-button round size="small" type="warning" @click.stop="modifyCartClick(item.cart.id, -1)"
                          :disabled="item.cart.quantity==1">
                <van-icon name="minus"/>
              </van-button>
              <van-button round size="small" type="primary" @click.stop="modifyCartClick(item.cart.id,1)">
                <van-icon name="plus"/>
              </van-button>
            </template>
          </van-card>

          <template #right>
            <van-button round text="删除" type="danger" class="delete-button" @click="cartDeleteClick(item.cart.id)"/>
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>

    <van-submit-bar style="margin-bottom: 50px; z-index: 8" :price="Number(computeTotal) * 100" button-text="提交订单" @submit="createOrderClick">
      <van-checkbox v-model:checked="checkAll" @click="checkAllClick">全选</van-checkbox>
    </van-submit-bar>

  </div>
</template>

<script>
import {ref, reactive, toRefs, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

import {Toast, Dialog} from 'vant'

import {getCart, modifyCart, checkCart, delCartItem} from "@/network/cart";
import {createOrder} from "@/network/order";

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Cart",
  components: {Navbar},
  data() {
    return {}
  },
  setup: function () {

    const store = useStore();
    const router = useRouter();

    const state = reactive({
      list: [],
      result: [],
      checkAll: false,
      checkedList: []
    })

    const init = () => {
      Toast.loading({
        message: "购物车加载中...",
        forbidClick: true
      })

      getCart().then(res => {
        if (res.code === 200) {
          state.list = res.data
          state.result = res.data.filter(n => n.cart.isChecked == 1).map(item => item.cart.id)
          // console.log(state.result);

          // 选中的商品总结果长度相同即为全选
          isCheckAll()

        }
        // console.log(state)

        Toast.clear()
      }).catch(err => {
        console.log(err)
      })
    }

    const modifyCartClick = (cartId, quantity) => {
      Toast.loading("修改中...")
      modifyCart(cartId, quantity).then(res => {

        if (res.code === 200) {
          // 修改数据库完成后刷新页面数据
          state.list.forEach(item => {
            if (item.cart.id == cartId) {
              item.cart.quantity += quantity
            }
          })
          init()
        }

        Toast.clear()
      }).catch(err => {
        console.log(err)
      })
    }

    onMounted(() => {
      init()
      store.dispatch('updateCartCount')
    })

    // 检查是否全选
    const isCheckAll = () => {
      if (state.result.length === state.list.length) {
        state.checkAll = true
      } else {
        state.checkAll = false
      }
    }

    // 复选框改变处理
    const groupChange = (result) => {
      // 结果重新赋值
      state.result = result
      isCheckAll()
      // 改变数据库中的选中状态
      checkCart({cart_ids: result}).then(res => {
        // console.log(res)

      }).catch(err => {
        console.log(err)
      })

    }

    // 打开滑块
    const openCell = (cartId) => {
      console.log('我开啦', cartId)

      // console.log(state.result.includes(cartId))

    }

    const checkAllClick = () => {
      // console.log('checkAll')

      // 没有全选的时候 => 全选
      if (!state.checkAll) {

        state.result = state.list.map(item => item.cart.id)
        state.checkAll = true;

      } else {
        state.result = []
        state.checkAll = false;
      }

    }

    const cartDeleteClick = (cartId) => {
      console.log(cartId)
      Dialog.confirm({
        message: '确定删除该商品？',
      }).then(() => {
        // on confirm
        Toast.loading("删除中...")

        // console.log(cartId)
        delCartItem(cartId).then(res => {
          // console.log(res)

          if (res.code === 200) {
            Toast.success(res.msg)
            // 删除成功，重新初始化
            init();
            store.dispatch('updateCartCount')
          } else {
            Toast.fail(res.msg)
          }

          Toast.clear()
        }).catch(err => {
          console.log(err)

        })
      }).catch(() => {
        // on cancel
      });
    }

    // 通过计算属性 计算购物车总价
    const computeTotal = computed(() => {

      let sum = state.list.filter(item => {
        return state.result.includes(item.cart.id)
      }).reduce((preValue, item) => {
        return preValue + item.cart.total
      }, 0)

      return sum.toFixed(2)

    })

    const createOrderClick = () => {
      // 点击结算不用传输数据，直接从数据库中结算

      if (state.result.length == 0) {
        Toast.fail("请选择商品进行结算")
      } else {

        Dialog.confirm({
          title: '生成订单',
          message: '确认生成订单',
        }).then(() => {
          // console.log('to create-order')

          setTimeout(() => {
            router.push('/create-order')
          }, 500)

        }).catch(() => {});

      }
    }

    return {
      ...toRefs(state),
      modifyCartClick,
      checkAllClick,
      openCell,
      groupChange,
      cartDeleteClick,
      computeTotal,
      createOrderClick
    }
  }
}
</script>

<style scoped lang="scss">

.cart {
  margin-top: var(--navbar-height);

  img {
    width: 100%;
  }
}

.content {
  margin-bottom: 100px;
}

.isChoose {
  background-color: #b7ddfa;
}

</style>

<style lang="scss">
.goods-card {
  margin-top: 5px;
  background-color: white;
}

.van-card__price {
  color: red;
}

.delete-button {
  height: 100%;
}

.van-card__price-integer {
  font-size: 22px;
}

.van-card__price {
  font-size: 18px;
}

.van-card__num {
  font-size: 16px;
}
</style>