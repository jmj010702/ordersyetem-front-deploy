<template>
  <v-container>
    <v-row class="d-flex justify-content-between mt-5">
      <v-col>
        <v-form>
          <v-row>
            <v-col class="auto">
              <v-select
                  v-model="searchType"
                  :items="searchOPtions"
                  item-title="text"
                  item-value="value"
              />
            </v-col>
            <v-col>
              <v-text-field
                  v-model="searchValue"
                  label="검색어를 입력하세요"
                  @keyup.enter="searchProduct"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn prepend-icon="mdi-magnify" @click="searchProduct()"></v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="auto" v-if="!isAdmin">
        <v-btn class="mr-3" @click="addCart()">장바구니</v-btn>
        <v-btn color="primary" @click="createOrder()">주문하기</v-btn>
      </v-col>
      <v-col v-if="isAdmin" cols="auto">
        <v-btn :to="'/product/create'" color="primary">상품등록</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="product-card" flat>
          <v-card-title class="d-flex align-center justify-space-between">
            <div class="d-flex flex-column">
              <div class="text-subtitle-1 font-weight-bold text-slate-900">{{pageTitle}}</div>
            </div>
          </v-card-title>

          <v-card-text>
            <v-table density="compact" hover class="product-table">
              <thead>
              <tr>
                <th>제품사진</th>
                <th>제품명</th>
                <th>카테고리</th>
                <th>가격</th>
                <th>재고수량</th>
                <th>주문수량</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="product in productList" :key="product.id">
                <td><v-img :src="product.imagePath" width="80" height="60" cover class="rounded-lg"/></td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stockQuantity }}</td>
                <td>
                  <v-text-field
                      v-model.number="product.productCount"
                      type="number"
                      style="width: 65px;"
                  />
                </td>
                <td>
                  <input
                      v-model="product.selected"
                      type="checkbox"
                  />
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { cartStore } from '@/store/cart';
import axios from 'axios'
export default {
  // 화면을 호출하는 쪽에서 넘긴 props 변수를 아래와 같이 받아서 변수로 사용 가능
  props: ['isAdmin', 'pageTitle'],
  data() {
    return {
      isLoading: false,
      isLastPage: false,
      pageSize: 5,
      pageNumber: 0,
      productList: [],
      searchType: "optional",
      searchValue: "",
      searchOPtions: [{text: "선택", value: "optional"}, {text: "상품명", value:"productName"}, {text: "카테고리", value:"category"}],
    }
  },
  created() {
    this.loadData();
    window.addEventListener('scroll', this.scrollHandler);
  },
  methods:{
    scrollHandler(){
      // 현재 화면높이 + 스크롤된 높이 >= 문서 전체 높이 - N : 바닥면이 N만큼 남았을 때 데이터 추가 로드
      const isBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 200;
      if(isBottom && !this.isLoading && !this.isLastPage){
        this.loadData();
      }
    },
    // 데이터 로드가 화면 초기 렌더링 시점 뿐만 아니라 스크롤, 필터링, 검색 등 다양한 상황에서 재호출 될 수 있으므로 별도의 메서드로 분리
    async loadData(){
      try{
        this.isLoading = true;
        // params 라는 객체를 사용하여 쉽게 파라미터 형식으로 url에 붙일 수 있도록 처리
        // ex) http://localhost:8080/product/list?page=0&size=10&productName=사과
        let params ={size: this.pageSize, page: this.pageNumber};
        if(this.searchType === "productName"){
          params.productName = this.searchValue;
        }
        if(this.searchType === "category"){
          params.category = this.searchValue;
        }
        const result = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params});
        const additionalData = result.data.content.map(p => ({...p, productCount : 0, selected : false}));
        if(additionalData.length === 0){
          this.isLastPage = true;
        }
        this.productList = [...this.productList, ...additionalData];
        this.pageNumber++;
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    },
    async createOrder(){
      try{
        const data = this.productList.filter(p => p.selected && p.productCount > 0).map(p => ({
          productId: p.id,
          productCount: p.productCount,
        }));

        if(data.length > 0){
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, data);
          alert('주문이 완료되었습니다.');
          window.location.reload();
        }
      }catch(e){
        console.log(e);
        alert('주문에 실패했습니다.');
      }
    },
    searchProduct(){
      this.isLoading = false;
      this.isLastPage = false;
      this.pageNumber = 0;
      this.productList = [];
      this.loadData();
    },
    addCart(){
      const store = cartStore();

      const data = this.productList.filter(p => p.selected && p.productCount > 0).map(p => ({
        productId: p.id,
        productImage: p.imagePath,
        productName: p.name,
        productPrice: p.price,
        productCount: p.productCount,
      }));

      data.forEach(p => store.addCart(p));
    },
  },
}
</script>

