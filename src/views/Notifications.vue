<template>
  <div class="favorites-page">
    <div class="container">
      <div class="row">
        <div class="d-flex align-items-center gap-2 title-page mb-4">
          <span>
            <router-link to="/" class="text-black text-decoration-none fw-medium">الرئيسية</router-link>
          </span>
          /
          <span>
            <router-link to="/profile" class="text-black-50 text-decoration-none">حسابى</router-link>
          </span>
          /
          <span>
            <router-link to="/Notifications" class="text-black-50 text-decoration-none fw-medium">الاشعارات</router-link>
          </span>
        </div>
        <div class="col-lg-3">
          <div class="user-menu">
            <div class="custom-dropdown-menu">
              <router-link to="/Notifications" class="bg-transparent">
                <div class="d-flex gap-2 align-items-center link-list p-2">
                  <i class="pi pi-bell"></i>
                  الاشعارات
                </div>
              </router-link>
              <router-link to="/orders" class="bg-transparent">
                <div class="d-flex gap-2 align-items-center link-list p-2">
                  <i class="pi pi-shopping-bag"></i>
                  الطلبات
                </div>
              </router-link>
              <router-link to="/pending" class="bg-transparent">
                <div class="d-flex gap-2 align-items-center link-list p-2">
                  <i class="pi pi-shopping-cart"></i>
                  طلبات بانتظار الدفع
                </div>
              </router-link>
              <router-link to="/favorites" class="bg-transparent">
                <div class="d-flex gap-2 align-items-center link-list p-2">
                  <i class="pi pi-star"></i>
                  الامنيات
                </div>
              </router-link>
              <router-link to="/profile" class="bg-transparent">
                <div class="d-flex gap-2 align-items-center link-list p-2">
                  <i class="pi pi-user-edit"></i>
                  حسابى
                </div>
              </router-link>
              <router-link class="text-danger" to="/" @click="logout">
                <div class="d-flex gap-2 align-items-center link-list p-2">
                  <i class="pi pi-sign-out text-danger fw-bold"></i>
                  تسجيل الخروج
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-md-12 py-5 mt-5 px-2">
          <div class="text-fa text-end pt-5 mt-5 px-0">
            <span class="fw-bold">الاشعارات</span>
          </div>

          <div  class="text-center d-flex flex-column align-items-center gap-3">
            <div class="nothing d-flex justify-content-center align-items-center">
<i class="pi pi-bell fs-1"></i>
            </div>
            <span class=" text-black-50">
لا توجد إشعارات


</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useToast } from 'vue-toastification';



export default {
  setup (){
     const userStore = useUserStore();
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
    return{
      logout
    }
  }

};
</script>

<style scoped>
.favorites-page {
  padding: 20px 0;
  height: 30vh;
  background-color: #9cc6ce;
}
.title-page {
  font-size: 12px;
}
.user-menu {
  position: relative;
}
.link-list{
  font-size: 11px;
  font-weight: bold;

}
.nothing{
  background-color: #ecebf0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: auto;

}
.link-list:hover{
  background-color: #eee;
  border-radius: 4px;

}
.custom-dropdown-menu {
  position: absolute;
  top: 49px;
  right: 6px;
  background-color: white;
  background-attachment: fixed;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
  min-width: 300px;
}

.custom-dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
}


.custom-dropdown-menu a:hover {
  background-color: #eee;
}












@media (max-width:477px) {
.user-menu {

    display: none;
}
.favorites-page{
  background-color: transparent;
  height: 0 !important;
}
.col-lg-9{
  padding: 1rem !important;
  margin-top: 1rem !important;
}
}
</style>
