<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center text-h5">
            회원 상세조회
          </v-card-title>
          <v-card-text>
            <v-table>
              <tbody>
              <tr>
                <td>ID:</td>
                <td>{{ member.id }}</td>
              </tr>
              <tr>
                <td>이름:</td>
                <td>{{ member.name }}</td>
              </tr>
              <tr>
                <td>email:</td>
                <td>{{ member.email }}</td>
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
import axios from "axios";

export default {
  props: ['isMyPage'],
  data() {
    return {
      member: {},
    }
  },
  async created() {
    try {
      if (this.isMyPage) {
        const result = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myinfo`);
        this.member = result.data;
      } else {
        // this.$route.params.memberId 해당 코드의 memberId는 해당 라우터의 변수명과 같아야 함
        const memberID = this.$route.params.memberId;
        const result = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/detail/${memberID}`);
        this.member = result.data;
      }
    } catch (e) {
      alert(e.response.data.error_message);
    }


  }
}
</script>
