import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: localStorage.getItem("userLoggedIn") === "true", // حالة تسجيل الدخول
    userName: localStorage.getItem("userName") || "", // اسم المستخدم
    favorites: JSON.parse(localStorage.getItem("favorites")) || [], // المنتجات المفضلة
  }),
  actions: {
    login() {
      this.userLoggedIn = true;
      localStorage.setItem("userLoggedIn", "true");
    },
    setUserName(name) {
      this.userName = name;
      localStorage.setItem("userName", name);
    },
    logout() {
      this.userLoggedIn = false;
      this.userName = "";
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("userName");
    },
    addToFavorites(product) {
      if (!this.favorites.some((fav) => fav.id === product.id)) {
        this.favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter((fav) => fav.id !== productId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
