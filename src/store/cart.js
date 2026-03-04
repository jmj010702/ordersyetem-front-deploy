import { defineStore } from "pinia";

export const cartStore = defineStore('cart', {
    state: () => ({
        // 전역상태관리의 변수값은 화면 새로고침시 전체 초기화
        // 따라서 로컬스토리지에 저장하여 값을 저장하고, 이 때 로컬스토리지에는 모든 값이 문자열로 저장되므로 형변환 필요
        // 또한 객체를 문자열JSON으로 저장시 사용할 때 파싱작업을 수행해야한다.
        totalQuantity: parseInt(localStorage.getItem("totalQuantity")) || 0,
        productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || [],
    }),
    actions: {
        addCart(product) {
            this.totalQuantity += product.productCount;
            localStorage.setItem("totalQuantity", this.totalQuantity);
            const existProduct = this.productsInCart.find(p => p.productId === product.productId);
            if (existProduct) {
                existProduct.productCount += product.productCount;
            } else {
                this.productsInCart.push(product);
            }

            localStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
        },
        clearCart() {
            this.totalQuantity = 0;
            localStorage.removeItem("totalQuantity");
            this.productsInCart = [];
            localStorage.removeItem("productsInCart");
        },
    },
    getters: {
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart,
    }
})