import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    firstName: "عبدالله",
    lastName: "البلاد",
    email: "tth31770@gmail.com",
    phone: "1113051656",
    countryCode: "+20",
    gender: "",
    birthDate: "",
    marketing: true,
  }),

  actions: {
    // تحديث البيانات وتخزينها في sessionStorage
    updateProfile(newData) {
      this.$patch(newData);
      sessionStorage.setItem("profile", JSON.stringify(this.$state));
    },

    // استرجاع البيانات من sessionStorage
    loadProfileFromSession() {
      const savedProfile = sessionStorage.getItem("profile");
      if (savedProfile) {
        this.$patch(JSON.parse(savedProfile));
      }
    },
  },
});
