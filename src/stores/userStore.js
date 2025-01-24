import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: sessionStorage.getItem("userLoggedIn") === "true", // حالة تسجيل الدخول
    userName: sessionStorage.getItem("userName") || "", // اسم المستخدم
    favorites: JSON.parse(sessionStorage.getItem("favorites")) || [], // المنتجات المفضلة
  }),
  actions: {
    login() {
      this.userLoggedIn = true;
      sessionStorage.setItem("userLoggedIn", "true");
    },
    setUserName(name) {
      this.userName = name;
      sessionStorage.setItem("userName", name);
    },
    logout() {
      this.userLoggedIn = false;
      this.userName = "";
      sessionStorage.removeItem("userLoggedIn");
      sessionStorage.removeItem("userName");
    },
    addToFavorites(product) {
      if (!this.favorites.some((fav) => fav.id === product.id)) {
        this.favorites.push(product);
        sessionStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter((fav) => fav.id !== productId);
      sessionStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
