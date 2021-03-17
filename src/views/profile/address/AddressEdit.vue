<template>
  <div id="address-edit" class="address-edit">

    <navbar>
      <template v-slot:left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template v-slot:default>{{ showTitle }}</template>
    </navbar>

    <div id="content" class="content">

      <van-address-edit
          show-postal
          :address-info="address"
          :show-delete='showDelete'
          show-set-default
          :show-area=showArea
          @save="onSave"
          @delete="onDelete(address.id)"
          @change-detail=""
      />

    </div>

  </div>
</template>

<script>
import {ref, reactive, toRefs, onMounted, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import {Toast} from 'vant'

import {addAddress, getAddressByAddressId, delAddress} from "@/network/address";

import Navbar from "@/components/content/navbar/Navbar";

export default {
  name: "AddressEdit",
  components: {Navbar},
  setup() {

    const router = useRouter()
    const route = useRoute();

    const showArea = ref(false)

    const state = reactive({
      address: []
    })

    const getAddressById = () => {
      let addId = route.query.id
      getAddressByAddressId(addId).then(res => {
        // console.log(res)

        state.address = {
          id: res.data.id,
          name: res.data.recipient,
          tel: res.data.phone,
          addressDetail: res.data.address,
          postalCode: res.data.postalCode,
          isDefault: res.data.isDefault == 1 ? true : false
        }

      }).catch(err => {
        console.log(err)
      })
    }

    onMounted(() => {
      getAddressById()
    })

    const showTitle = computed(() => {
      return route.query.type == 'add' ? '新增地址' : '编辑地址'
    })

    const showDelete = computed(() => {
      return route.query.type == 'add' ? false : true
    })

    const onSave = (content) => {

      Toast.loading("保存中...")

      const data = {
        id: content.id,
        recipient: content.name,
        address: content.addressDetail,
        phone: content.tel,
        postalCode: content.postalCode,
        isDefault: content.isDefault
      }
      addAddress(data).then(res => {
        // console.log(res)

        if (res.code == 200) {
          Toast.success("保存成功")

          setTimeout(() => {
            router.push('/address')
          }, 500)

        }

      }).catch(err => {
        console.log(err)
      })

      Toast.clear()
    }

    const onDelete = (id) => {
      delAddress(id).then(res => {
        if (res.code === 200) {
          Toast.success('删除成功');

          setTimeout(() => {
            router.push('/address')
          }, 500)

        }
      }).catch(err => {
        console.log(err)
      })
    }

    return {
      ...toRefs(state),
      showArea,
      showTitle,
      showDelete,
      onSave,
      onDelete
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

</style>