import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    // استرجاع البيانات من sessionStorage عند التحميل
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || {
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
    // حفظ البيانات في sessionStorage
    saveToSessionStorage() {
      const cartData = {
        cartItems: this.cartItems,
        totalQuantity: this.totalQuantity,
        totalPrice: this.totalPrice,
      };
      sessionStorage.setItem("cart", JSON.stringify(cartData));
    },

    addToCart(product, quantity) {
      const existingProduct = this.cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity; // زيادة الكمية
      } else {
        this.cartItems.push({ ...product, quantity });
      }

      this.calculateTotals();
      this.saveToSessionStorage(); // حفظ التغييرات في sessionStorage
    },

    calculateTotals() {
      this.totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
      this.totalPrice = this.cartItems.reduce(
        (acc, item) => acc + parseFloat(item.newPrice || 0) * item.quantity,
        0
      );
      this.saveToSessionStorage(); // حفظ التغييرات في sessionStorage
    },

    updateQuantity(productId, quantity) {
      const product = this.cartItems.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
        this.calculateTotals();
        this.saveToSessionStorage(); // حفظ التغييرات في sessionStorage
      }
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      this.calculateTotals();
      this.saveToSessionStorage(); // حفظ التغييرات في sessionStorage
    },
  },
});
