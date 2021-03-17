import {getCart} from "@/network/cart";

import {ADDTOCART} from "@/store/mutations-types";

const actions = {

  updateCartCount({commit}) {
    getCart().then(res => {
      // console.log('updateCartCount', res)

      if (res.data !== null) {
        commit(ADDTOCART, res.data.length || 0)
      } else {
        commit(ADDTOCART, 0)
      }

    }).catch(err => {

    })
  }

}

export default actions;