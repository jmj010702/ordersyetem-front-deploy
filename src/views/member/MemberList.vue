<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center text-h5"> 회원목록 </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
              <tr>
                <th>ID</th>
                <th>이름</th>
                <th>이메일</th>
                <th>상세보기</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="member in memberList" :key="member.id">
                <td>{{ member.id }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>
                  <v-btn :to="`/member/detail/${member.id}`">상세보기</v-btn>
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
import axios from "axios";

export default {
  data() {
    return {
      memberList: [],
    }
  },
  async created() {
    try {
      // 토큰 가져오기
      // const token = localStorage.getItem("accessToken");
      // api 요청
      // const result = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`, {
      //   headers: {Authorization: `Bearer ${token}`}
      // });
      const result = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`);
      this.memberList = result.data;
    } catch (e) {
      alert(e.response.data.error_message);
    }

  }
}
</script>

