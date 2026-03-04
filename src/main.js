// import시에 중괄호가 있으면, export된 여러항목중 하나를 선택하여 imoport하는 경우
// import시에 중괄호가 없으면, default(대표요소) 요소를 imoport하는 경우
import {createApp} from 'vue'
import App from './App.vue'        //App1 같이 이름병경하여 사용가능 ./App.vue의 export된 값이 1개이므로
import {router} from './router'; //router1 같이 이름을 바꾸면 안됨
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import axios from "axios";
import {createPinia} from "pinia";


const app = createApp(App);
// axios의 모든 요청을 인터셉팅하여 모든 요청마다 엑세스 토큰을 자동으로 포함
axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        // 에러가 발생시, 사용자의 본래요청의 화면으로 되돌아가야함
        return Promise.reject(error);
    }
)

// 모든 axios요청에서 401을 받을경우에 interceptor를 통해 rt를 통한 at 재발급
// rt마저 만료되었을때는 login창으로 이동
axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                // rt 만료시 아래 코드에서 에러가 터짐
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-at`, {refreshToken: refreshToken});
                const accessToken = response.data.accessToken;
                localStorage.setItem("accessToken", accessToken);
                console.log("갱신성공")
                window.location.reload();
            } catch (e) {
                console.log("갱신 실패", e);
                localStorage.clear();
                window.location.href = "/member/login";
            }
        }
        return Promise.reject(error);
    }
)

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify);


app.mount('#app');