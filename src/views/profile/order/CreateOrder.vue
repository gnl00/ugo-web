<template>
  <div id="create-order" class="create-order" v-cloak>

    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>生成订单</template>
    </navbar>

    <div id="wrapper" class="wrapper">
      <div id="content" class="content">

        <van-contact-card
            type="edit"
            :name="currentContact.recipient + '  ' +currentContact.address"
            :tel="currentContact.phone"
            @click="onEdit" />

        <van-card v-for="(item, index) in orderList"
            :num="item.cart.quantity"
            :price="Number(item.cart.price).toFixed(2)"
            :title="item.goodsName"
            :thumb="item.picture[0]"
        />

      </div>

      <van-submit-bar :price="showTotal * 100" button-text="提交订单" @submit="payClick" />

    </div>

  </div>
</template>

<script>
import {ref, toRefs, reactive, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'

import {Toast} from 'vant';

import {getDefaultAddress} from "@/network/address";

import Navbar from "@/components/content/navbar/Navbar";
import {createOrder} from "@/network/order";

export default {
  name: "CreateOrder",
  components: {Navbar},
  setup() {

    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const state = reactive({
      currentContact: {},
      orderList: []
    })

    const defaultAddress = () => {
      getDefaultAddress().then(res => {
        state.currentContact = res.data

      }).catch(err => {
        console.log(err)
      })
    }

    const getOrderDetail = () => {

      createOrder().then(res => {
        // console.log(res)
        if (res.code === 200) {
          // console.log(res)

          state.orderList = res.data

          store.dispatch('updateCartCount')

        } else {
          Toast.fail("订单生成失败 " + res.msg)
        }

      }).catch(err => {
        console.log(err)
      })

    }

    const showTotal = computed(() => {
      return state.orderList.reduce((preValue, item) => {
        return preValue + item.cart.total
      }, 0)
    })

    const onEdit = () => {
      router.push('/address')
    }

    onMounted(() => {
      defaultAddress()
      getOrderDetail()
    })

    const payClick = () => {
      Toast.loading("处理中...")
    }

    return {
      ...toRefs(state),
      payClick,
      showTotal,
      onEdit
    }
  }
}
</script>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}
#create-order {
  margin-top: var(--navbar-height);
  margin-bottom: calc(var(--navbar-height) + 55px);
}

.van-card {
  border-radius: 10px;
}

.van-submit-bar {
  margin-bottom: 50px;
  z-index: 8;
}

</style>