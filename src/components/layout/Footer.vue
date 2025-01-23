<template>
  <div>
    <!-- <ul class="d-flex justify-content-center gap-3">
      <li>home</li>
      <li>about</li>
      <li>contact</li>
      <li>policy</li>
      <li v-if="isLoggedIn">dashboard</li>
      <li v-if="isLoggedIn">profile</li>
    </ul> -->
  </div>
</template>

<script>
import { computed } from 'vue';
import { useUserStore } from '../../stores/userStore'; // تأكد من المسار الصحيح

export default {
  setup() {
    const userStore = useUserStore(); // استخدام مخزن Pinia

    // استخدام computed لمراقبة حالة تسجيل الدخول
    const isLoggedIn = computed(() => userStore.userLoggedIn);

    return {
      isLoggedIn, // إرجاع isLoggedIn للوصول إلى الحالة في الواجهة
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none; /* إزالة النقاط من القائمة */
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
  padding: 8px 16px;
  background-color: #f4f4f4;
  border-radius: 4px;
}

li:hover {
  background-color: #007bff;
  color: white;
}
</style>
