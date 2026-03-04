<template>
  <MemberDetail
  :isMyPage="true"
  />

  <OrderList
  :isMyPage="true"
  />
</template>

<script>
import OrderList from "@/views/order/OrderList.vue";
import MemberDetail from "@/views/member/MemberDetail.vue";

export default {
  components: {
    MemberDetail, OrderList,
  }
}
</script>