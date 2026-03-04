import productCreate from "@/views/product/ProductCreate.vue";
import productList from "@/views/product/ProductList.vue";


export const productRouter = [
    {
        path: "/product/create",
        name: "productCreate",
        component: productCreate
    },
    {
        path: "/product/list",
        name: "productList",
        component: productList,
        props: {isAdmin:false,pageTitle:"상품목록"}
    },
    {
        path: "/product/manage",
        name: "productManage",
        component: productList,
        props:{isAdmin:true,pageTitle:"상품관리"}
    },
]