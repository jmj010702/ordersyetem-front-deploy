import OrderList from "@/views/order/OrderList.vue";
import OrderCartList from "@/views/order/OrderCartList.vue";

export const orderRouter = [
    {
        path: "/order/list",
        name: "OrderList",
        component: OrderList
    },
    {
        path: "/order/cart",
        name: "OrderCartList",
        component: OrderCartList
    },

]