import MemberCreate from "@/views/member/MemberCreate.vue";
import MemberLogin from "@/views/member/MemberLogin.vue";
import MemberList from "@/views/member/MemberList.vue";
import MemberDetail from "@/views/member/MemberDetail.vue";
import MemberMyPage from "@/views/member/MemberMyPage.vue";


export const memberRouter = [
    {
        path: "/member/create",
        name: "MemberCreate",
        component: MemberCreate
    },
    {
        path: "/member/login",
        name: "MemberLogin",
        component: MemberLogin
    },
    {
        path: "/member/list",
        name: "MemberList",
        component: MemberList
    },
    {
        path: "/member/detail/:memberId",
        name: "MemberDetail",
        component: MemberDetail
    },
    {
        path: "/member/myPage",
        name: "MemberMyPage",
        component: MemberMyPage,

    },

]