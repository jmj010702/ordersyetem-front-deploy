<template>
    <div> hookComponent </div>
    <button @click="moveScreen()">다른 화면으로 이동(라우트 방식)</button>
    <div>{{ count1 }}</div>
    <button @click="increment()">count1값 증가</button>
    <div>computed된값: {{ doubleCount }}</div>
</template>

<script>
export default {
    data() {
        return {
            count1: 0,
        }
    },
    // 화면이 열리기전(vue인스턴스가 생성되기전) 실행되는 함수 
    // ex: 목록 조회 , 상세 조회와 같은 조회 상황에 사용 
    created() {
        console.log("created 테스트")
    },
    // 컴포넌트가 화면상에서 제거(이동)될 때 실행되는 함수 
    // EX) 채팅(알림)화면을 벗어나 다른 화면으로 이동시에 실시간 연결종료 요청할 때
    // 물리적 화면을 통째로 끄면 안나감
    beforeUnmount() {
        console.log("beforeUnmount 테스트")
    },
    // 특정 변수값의 변경사항을 인지하여 함수를 자동실행하는 hook함수  
    // ex) 검색어 입력시 자동완성 api호출 / keyup
    watch: {
        // 인지하고자 하는 변수값과 일치되는 함수명 사용
        count1() {
            console.log("count1값이 변했습니다")
        }
    },
    // 화면 전체의 변경사항을 인지하는 hook함수 
    updated() {
        console.log("update함수 테스트")
    },
    // watch랑 유사 / 종속된 데이터가 변경될 때 함수를 실행하여 값을 재계산해서 리턴하는 함수 
    // ex) 장바구니 수량 보여줄 때 
    computed: {
        // this.count1이 변경되면, doubleCount함수가 실행되고, doubleCount를 변수처럼 사용가능 
        doubleCount() {
            return this.count1 * 2;
        }
    },
    methods: {
        moveScreen() {
            this.$router.push("/practice/conditional")
        },
        increment() {
            this.count1++;
        },
    }
}
</script>