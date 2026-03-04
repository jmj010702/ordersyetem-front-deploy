<template>
  <v-container>
    <v-row>
      <!-- 한 row의 전체 cols는 12 -->
      <v-col cols="8">helloworld1</v-col>
      <v-col cols="4">helloworld2</v-col>
      <v-col>helloworld3</v-col>
    </v-row>
    <v-row>
      <v-card>
        <v-card-title>
          회원가입
        </v-card-title>
        <v-card-text>
          회원가입을 해주세요
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-simple-table>
        <thead>
        <tr>
          <th>이름</th><th>이메일</th>
        </tr>
        </thead>
        <tbody>
        <tr><td>test</td><td>test@naver.com</td></tr>
        <tr><td>test2</td><td>test2@naver.com</td></tr>
        </tbody>
      </v-simple-table>
    </v-row>
    <v-row>
      <v-card>
        <!-- vuetify와 순수css를 함께 적용하는 것 가능. 그러나, 원하는 정확한 디자인을 적용하기 위해서는 일반적으로 순수css만을 사용 -->
        <v-card-title class="abc" id="signup-title" style="font-size: 30px; ">
          회원가입
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
                label="name"
                type="text" />
            <v-text-field
                label="email"
                type="email" />
            <v-text-field
                label="password"
                type="password" />
            <v-btn color="secondary">제출하기</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
  <v-btn @click="basicPopUp()">기본팝업</v-btn>
  <v-btn @click="cancel()">모달창(취소버튼)</v-btn>
  <!-- v-dialog는 내부적으로 true/false값을 가지고 외부에 공개될지 말지 여부가 결정 -->
  <v-dialog v-model="trueOrFalse" max-width="400px">
    <v-card>
      <v-card-title>
        정말취소하시겠습니까?
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" @click="confirm()">예</v-btn>
        <v-btn color="secondary" @click="reset()">아니오</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default{
  data(){
    return{
      trueOrFalse: false
    }
  },
  methods:{
    basicPopUp(){
      alert("hello world");
    },
    cancel(){
      this.trueOrFalse=true;
    },
    confirm(){
      // 상황에 맞는 적절한 로직
      // 주문 상황이라면 주문 로직이 여기에 들어감
      this.trueOrFalse=false;
    },
    reset(){
      this.trueOrFalse=false;

    }
  }
}
</script>
<style>
#signup-title{
  color: grey;
}
.abc{
  font-family: 'Times New Roman', Times, serif;
}

</style>