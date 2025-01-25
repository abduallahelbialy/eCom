import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    // تحميل البيانات من localStorage بدلاً من sessionStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {
      cartItems: [],
      totalQuantity: 0,
      totalPrice: 0,
    };

    return {
      cartItems: savedCart.cartItems,
      totalQuantity: savedCart.totalQuantity,
      totalPrice: savedCart.totalPrice,
    };
  },
  actions: {
    // حفظ البيانات في localStorage بدلاً من sessionStorage
    saveToLocalStorage() {
      const cartData = {
        cartItems: this.cartItems,
        totalQuantity: this.totalQuantity,
        totalPrice: this.totalPrice,
      };
      localStorage.setItem("cart", JSON.stringify(cartData));
    },

    addToCart(product, quantity) {
      const existingProduct = this.cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity; // زيادة الكمية
      } else {
        this.cartItems.push({ ...product, quantity });
      }

      this.calculateTotals();
      this.saveToLocalStorage(); // حفظ التغييرات في localStorage
    },

    calculateTotals() {
      this.totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
      this.totalPrice = this.cartItems.reduce(
        (acc, item) => acc + parseFloat(item.newPrice || 0) * item.quantity,
        0
      );
      this.saveToLocalStorage(); // حفظ التغييرات في localStorage
    },

    updateQuantity(productId, quantity) {
      const product = this.cartItems.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
        this.calculateTotals();
        this.saveToLocalStorage(); // حفظ التغييرات في localStorage
      }
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.calculateTotals();
      this.saveToLocalStorage(); // حفظ التغييرات في localStorage
    },
  },
});
