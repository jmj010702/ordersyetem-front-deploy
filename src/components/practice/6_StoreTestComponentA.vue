<template>
  <h1>store Component A</h1>
  <div>지역변수값 : {{ count }}</div>
  <v-btn @click="incrementCount()">지역변수 count 값 증가</v-btn>

  <div>전역변수값 : {{getStoredCount}}</div>
  <v-btn @click="incrementStoreCount()">전역변수 count 값 증가</v-btn>
</template>
<script>
import {practiceStore} from "@/store/practice";

export default {
  data() {
    return {
      count: 0,
    }
  },
  // computed : 훅 함수이며 종속된 데이터가 변경되면 함수를 실행하여 값을 재계산해서 보내줌
  computed: {
    getStoredCount() {
      const store = practiceStore();
      return store.getCount;
    }
  },
  methods: {
    incrementCount() {
      this.count++;
    },
    incrementStoreCount() {
      const store = practiceStore();
      store.incrementCount();
    }
  },
}
</script>