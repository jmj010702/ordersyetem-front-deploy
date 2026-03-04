<template>
<!--  새로고침 라우팅-->
  <v-btn href="/practice/route2">일반 라우팅</v-btn>
  <v-btn @click="hrefRouting()">일반 라우팅(함수)</v-btn>
<!--  라우팅 부분만 변경됨-->
  <v-btn :to="'/practice/route2'">SPA 경로기반 라우팅</v-btn>
  <v-btn @click="spaRouting1()">SPA 경로기반 라우팅(함수)</v-btn>

  <v-btn :to="{name:'RouteComponent2'}">SPA 이름기반 라우팅</v-btn>
  <v-btn @click="spaRouting2()">SPA 이름기반 라우팅(함수)</v-btn>

  <v-btn @click="goToProduct()">상품 상세조회</v-btn>
</template>
<script>

export default {
  data() {
    return {
      id:1,
    }
  },
  methods: {
    hrefRouting() {
      // 화면 전체에 새로고침이 발생하는 라우팅 방식
      // 특징 1: 화면상에 모든 컴포넌트가 새롭게 created
      // 특징 2: 화면에 깜빡임으로 인해 사용자 경험이 떨어질 수 있음
      window.location.href = "5_RouteComponent2.vue"
    },
    spaRouting1() {
      // spa방식 : single page application
      // 특징 1: 새롭게 라우트되는 컴포넌트만 created
      // 특징 2: 새로고침없는 페이지로드
      this.$router.push("/practice/route2");
    },
    spaRouting2() {
      this.$router.push({name: "RouteComponent2"});
    },
    goToProduct() {
      this.$router.push("/practice/route3/" + this.id);

    }

  }
}
</script>