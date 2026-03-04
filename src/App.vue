<!-- 화면의 요소는 template 안에 작업 -->
<template>
  <!-- Vuetify에서는 모든 태그의 최상단에 v-app으로 감싸져있어야 정상적으로 동작 -->
  <v-app>
    <HeaderComponent/>
    <!-- Hello World Vue -->
    <!-- router-view는 현재 url에 매칭된 컴포넌트를 렌더링(화면생성)하는 영역 -->
    <v-main>
      <router-view/>
    </v-main>
    <!-- <div>Footer 요소</div> -->
    <footer-component/>
  </v-app>
</template>

<!-- js의 요소는 script 안에 작업 -->
<script>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

// vue는 export를 통하여 .vue, .js 등의 요소를 다른 화면에서도 import 할 수 있도록 설정.
export default {  //export 요소중 대표요소 defualt(1개)
  // name을 생략시 파일명이 name이 됨
  name: "App",
  components:{
    HeaderComponent, FooterComponent
  }
}
</script>

<!-- css의 요소는 style 안에 작업 -->
<style>
</style>