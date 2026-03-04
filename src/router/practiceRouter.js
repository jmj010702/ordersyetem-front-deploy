import TestVue from "@/components/practice/0_TestVue.vue";
import TestVue2 from "@/components/practice/0_TestVue2.vue";
import ModelComponent from "@/components/practice/1_ModelingComponent.vue";
import ConditionalComponent from "@/components/practice/2_ConditionalComponent.vue";
import HookComponent from "@/components/practice/3_HookComponent.vue";
import vuetifyComponent from "@/components/practice/4_VuetifyComponent.vue";
import RouteComponent from "@/components/practice/5_RouteComponent.vue";
import RouteComponent2 from "@/components/practice/5_RouteComponent2.vue";
import RouteComponent3 from "@/components/practice/5_RouteComponent3.vue";
import RouteStore from "@/components/practice/6_StoreTestComponent.vue";

export const practiceRouter = [

    {
        path: "/practice/test",
        name: "TestVue",    //문자열형식으로 지정. 관례적으로 붙임.
        component: TestVue  //문자열형식이 아니다.
    },
    {
        path: "/practice/test2",
        name: "TestVue2",
        component: TestVue2
    },
    {
        path: "/practice/modeling",
        name: "ModelingComponent",
        component: ModelComponent
    },
    {
        path: "/practice/conditional",
        name: "ConditionalComponent",
        component: ConditionalComponent
    },
    {
        path: "/practice/hook",
        name: "HookComponent",
        component: HookComponent
    },
    {
        path: "/practice/vuetify",
        name: "vuetifyComponent",
        component: vuetifyComponent
    },
    {
        path: "/practice/route",
        name: "RouteComponent",
        component: RouteComponent
    },
    {
        path: "/practice/route2",
        name: "RouteComponent2",
        component: RouteComponent2
    },
    {
        path: "/practice/route3/:productId",
        name: "RouteComponent3",
        component: RouteComponent3
    },
    {
        path: "/practice/store",
        name: "RouteStore",
        component: RouteStore
    },
]