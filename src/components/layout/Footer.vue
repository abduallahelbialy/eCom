<template>
  <div class=" footer">
    <div class="container">
<div class="row">
<div class="col-lg-3 col-md-8">
  <div class="logo">
    <img :src="imga" alt="logo" class=" img-fluid">
  </div>
</div>
<div class="col-lg-3 col-md-8" v-if="isLoggedIn">
  <span class=" fw-bold fs-6 ">حسابى</span>
  <ul class="mt-3">
    <li class="mb-2">
      <router-link to="/Notifications" class="text-decoration-none ">الاشعارات</router-link>
    </li>
    <li class="mb-2">
      <router-link to="/orders" class="text-decoration-none ">الطلبات</router-link>
    </li>
    <li class="mb-2">
      <router-link to="/pending" class="text-decoration-none ">طلبات بانتظار الدفع</router-link>
    </li>
    <li class="mb-2">
      <router-link to="/favorites" class="text-decoration-none ">الامنيات</router-link>
    </li>
    <li class="mb-2">
      <router-link to="/profile" class="text-decoration-none ">حسابى</router-link>
    </li>
    <li class="mb-2">
      <router-link  class="text-decoration-none text-danger " @click="logout">تسجيل الخروج</router-link>
    </li>
  </ul>
</div>
<div class="col-lg-3 col-md-8">
  <span class=" fw-bold fs-6 ">روابط مهمة
</span>

</div>
<div class="col-lg-3 col-md-8">
  <span class=" fw-bold fs-6 ">
    تواصل معنا

</span>
<div class="d-flex gap-2 align-items-center mt-3">
  <i class="pi pi-phone"></i>
  <span>01028924906</span>
</div>

</div>
</div>

    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useUserStore } from '../../stores/userStore'; // تأكد من المسار الصحيح
import logo from "../../assets/hRhoeJLziPSo9JXQNF7oL7YKXdWg8GYRTqN1jlSP.avif"
import { useToast } from 'vue-toastification';
export default {
  data (){
    return{
      imga:logo
    }
  },
  setup() {
    const userStore = useUserStore();

    const isLoggedIn = computed(() => userStore.userLoggedIn);
      const toast = useToast();
     const logout = () => {
      userStore.logout();
      toast.success("تم تسجيل الخروج بنجاح", {
        position: "top-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: true,
      });
    };
    return {
      isLoggedIn,
      logout
    };
  },
};
</script>

<style scoped>
.footer{
  background-color: #fafafa;
  /* margin-top: 50rem; */
  padding: 20px;
}
.logo img{
max-width: 60px;
}
ul {
  list-style-type: none;

}
li a{
  color: #000;
  font-size: 14px;
  font-weight: 500;
}

/* li {
  cursor: pointer;
  padding: 8px 16px;
  background-color: #f4f4f4;
  border-radius: 4px;
}

li:hover {
  background-color: #007bff;
  color: white;
} */
</style>
