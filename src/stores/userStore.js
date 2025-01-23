import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: sessionStorage.getItem("userLoggedIn") === "true", // استعادة الحالة من sessionStorage
    userName: sessionStorage.getItem("userName") || "", // استعادة اسم المستخدم من sessionStorage
  }),
  actions: {
    login() {
      this.userLoggedIn = true; // تغيير حالة تسجيل الدخول إلى true
      sessionStorage.setItem("userLoggedIn", "true"); // حفظ الحالة في sessionStorage
    },
    setUserName(name) {
      this.userName = name; // تعيين اسم المستخدم
      sessionStorage.setItem("userName", name); // حفظ اسم المستخدم في sessionStorage
    },
    logout() {
      this.userLoggedIn = false; // إعادة تعيين حالة تسجيل الدخول
      this.userName = ""; // إعادة تعيين اسم المستخدم
      sessionStorage.removeItem("userLoggedIn"); // إزالة الحالة من sessionStorage
      sessionStorage.removeItem("userName"); // إزالة اسم المستخدم من sessionStorage
    },
  },
});
