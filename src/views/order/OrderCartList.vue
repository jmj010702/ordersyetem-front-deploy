<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center text-h5">
        장바구니 목록
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="auto">
        <v-btn color="secondary" @click="clearCart()">장바구니 비우기</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="createOrder()">주문하기</v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-2" justify="end">
      <v-col cols="auto" class="text-subtitle-2">
        총 수량: {{ totalCount }}개 / 총 가격: {{ totalPrice }}원
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table>
          <thead>
          <tr>
            <th>제품ID</th>
            <th>제품사진</th>
            <th>제품명</th>
            <th>가격</th>
            <th>주문수량</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in getProductsInCart" :key="product.productId">
            <td>{{ product.productId }}</td>
            <td><v-img :src="product.productImage" width="60" height="40" cover class="rounded-lg"/></td>
            <td>{{ product.name }}</td>
            <td>{{ product.productPrice }}</td>
            <td>{{ product.productCount }}</td>
          </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { cartStore } from '@/store/cart';
import axios from 'axios'

export default {
  data(){
    return{
      store: null,
    }
  },
  created(){
    this.store = cartStore();
  },
  computed:{
    getProductsInCart(){
      return this.store.getProductsInCart;
    },

    totalCount() {
      return this.getProductsInCart.reduce((sum, p) => sum + (Number(p.productCount) || 0), 0)
    },

    totalPrice() {
      return this.getProductsInCart.reduce((sum, p) => {
        const price = Number(p.productPrice) || 0
        const count = Number(p.productCount) || 0
        return sum + price * count
      }, 0)
    },
  },
  methods:{
    clearCart(){
      this.store.clearCart();
    },
    async createOrder(){
      try {
        // 1. api 호출
        const data = this.getProductsInCart.map(p => ({
          productId: p.productId,
          productCount: p.productCount,
        }));
        if(data.length > 0) {
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, data);
          alert('주문이 완료되었습니다.');

          // 2. 장바구니 비우기
          this.store.clearCart();
        }
      } catch(e){
        console.log(e);
        alert('주문에 실패했습니다.')
      }
    },
  },
}
</script>