<template>
<div id="address" class="address">

  <navbar>
    <template v-slot:left>
      <i class="iconfont icon-fanhui"></i>
    </template>
    <template v-slot:default>地址管理</template>
  </navbar>

  <div id="content" class="content">
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />

  </div>
</div>
</template>

<script>
import {reactive, toRefs, onMounted} from 'vue'
import {useRouter} from 'vue-router'

import {getAddress} from "@/network/address";

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "Address",
  components: {Navbar},
  setup() {

    const router = useRouter();

    const state = reactive({
      chosenAddressId: 1,
      list: []
    })

    const onAdd = (value) => {
      router.push({
        path: '/address-edit',
        query: {
          type: 'add'
        }
      })
    }

    const onEdit = (addressInfo) => {
      router.push({
        path: '/address-edit',
        query: {
          type: 'edit',
          id: addressInfo.id
        }
      })
    }

    const getAddressList = () => {
      getAddress().then(res => {
        // console.log(res)
        state.list = res.data.addresses.map(item => {
          return {
            id: item.id,
            name: item.recipient,
            tel: item.phone,
            address: item.address,
            isDefault: item.isDefault == 1 ? true : false
          }
        })

        state.list.forEach(item => {
          if (item.isDefault) {
            state.chosenAddressId = item.id
          }
        })

      }).catch(err => {
        console.log(err)
      })
    }

    onMounted(() => {
      getAddressList()
    })

    return {
      ...toRefs(state),
      onAdd,
      onEdit
    }
  }
}
</script>

<style scoped lang="scss">

#content {
  margin-top: var(--navbar-height);
}

</style>

<style lang="scss">

.van-address-list__bottom {
  background-color: #0000;
  bottom: calc(var(--navbar-height) + 10px)
}

</style>