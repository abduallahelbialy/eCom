<template>
  <div class="favorites-page">
    <div class="container-fluid">
      <div class="row">
        <div class="d-flex align-items-center gap-2 title-page mb-4">
          <span>
            <router-link to="/" class="text-black text-decoration-none fw-medium"
              >الرئيسية</router-link
            >
          </span>
          /
          <span>
            <router-link to="/profile" class="text-black-50 text-decoration-none"
              >حسابى</router-link
            >
          </span>
          /
        </div>
<div class="d-flex  justify-content-center flex-wrap">

        <div class="w-25">
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
        <div class="w-75 partTwo ">
          <div class="text-fa text-end ">
            <span class="fw-bold"> حسابى</span>
          </div>

  <div class="container ">
    <form @submit.prevent="saveProfile">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName" class="form-label">الاسم الأول</label>
          <input
            id="firstName"
            v-model="profile.firstName"
            type="text"
            class="form-control"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName" class="form-label">الاسم الأخير</label>
          <input
            id="lastName"
            v-model="profile.lastName"
            type="text"
            class="form-control"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="birthDate" class="form-label">تاريخ الميلاد</label>
          <input
            id="birthDate"
            v-model="profile.birthDate"
            type="date"
            class="form-control"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="gender" class="form-label">الجنس</label>
          <select
            id="gender"
            v-model="profile.gender"
            class="form-select"
          >
            <option value="">حدد نوع الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>
         <div class="col-md-6 mb-3">
          <label for="email" class="form-label">البريد الإلكتروني</label>
          <input
            id="email"
            v-model="profile.email"
            type="email"
            class="form-control"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label for="phone" class="form-label">رقم الجوال</label>
          <div class="input-group">

            <input
              id="phone"
              v-model="profile.phone"
              type="text"
              class="form-control"
            />
          </div>
        </div>

      </div>
      <button type="submit" class="btn btn-primary bg-bu border-0 p-2 w-100">حفظ</button>
    </form>

    <div class="mt-4">
      <h5 class="text-end">إعدادات</h5>
      <div class="box-shwitch border p-2 rounded-2  ">

      <div class="form-check form-switch mb-3 ">
        <input
          class="form-check-input "
          type="checkbox"
          id="marketing"
          v-model="profile.marketing"
        />
        <div>
 <label class="form-check-label fw-medium small" for="marketing">
          الرسائل الترويجية
        </label>
        <p class=" small">يمكنك التحكم في تعطيل أو تفعيل الرسائل الترويجية من المتجر.
</p>

        </div>
      </div>
      </div>
      <div class="d-flex justify-content-between align-items-center box-del rounded-2 p-3 flex-wrap gap-3 border">
        <div class="d-flex flex-column">
          <span class="fw-bold small">تعطيل السحاب</span>
          <span class="small" > يمكنك حذف حسابك من المتجر ، بما في ذلك طلباتك السابقة ومنتجات قائمة الأمنيات.
</span>
        </div>
        <div class="btn-danger">
          <button class="btn btn-danger py-2 px-2">تعطيل الحساب</button>
        </div>
      </div>
    </div>
  </div>


        </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { useProfileStore } from '.././stores/profilE';
import { useUserStore } from "@/stores/userStore";

export default {
  setup() {
      const userStore = useUserStore();
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
    const profileStore = useProfileStore();
    const toast = useToast();

    // تحميل البيانات عند التهيئة
    profileStore.loadProfileFromSession();

    const saveProfile = () => {
      profileStore.updateProfile(profileStore.$state);
      toast.success("تم حفظ البيانات بنجاح!"); // عرض رسالة نجاح
    };

    return {
      profile: profileStore.$state,
      saveProfile,
      logout
    };
  },
};
</script>


<style scoped>

.form-control {
  padding: 8px;
}
.small{
  font-size: 12px;
}
.nothing {
  background-color: #ecebf0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: auto;
}

.bg-bu{
  background-color: #9cc6ce;
  color: #2f5961;
}
.custom-dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
}

.favorites-page {
  padding: 40px 0;
  position: relative;


}
.title-page {
  font-size: 12px;
    height: 30vh;
padding: 20px 40px;
  background-color: #9cc6ce;
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
  top: -108px;
  right: 6px;
  background-color: white;
  background-attachment: fixed;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px;
  min-width: 300px;
}
.delete-button{
   border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;

}
.custom-dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
}

.box-fav{
  padding: 10px;
  width: fit-content;
  border-radius: 12px;
}
.custom-dropdown-menu a:hover {
  background-color: #eee;
}
.product-card {
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  padding: 10px;
  /* width: 200px; */
  text-align: center;

}
.product-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
}
/* .btn {
  display: flex;
  align-items: center;
  gap: 5px;
} */
.pi-trash {
  font-size: 1.2rem;
}
.modal-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
.btn-cart button {
  border: 1px solid #87d3d8;
  background-color: transparent;
  border-radius: 4px;
  padding: 7px;
  width: 200px;
  color: #87d3d8;
  font-size: 14px;
  transition: 0.3s;
}
.btn-cart button:hover {
  background-color: #aed8e0;
  color: #2f5961;
  font-weight: bold;
}
.modal-image {
  width: 100%;
  max-width: 450px;
  border-radius: 8px;
}

.modal-details {
  flex: 1;
  margin-top: 20rem;
}

.quantity-control button {
  padding: 0 8px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
}

.quantity-control span {
  margin: 0 8px;
}
.close-m {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  padding: 5px;
}

.btn-cart button {
  width: 100%;
}
.quantity-control {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid #ccc;
  width: fit-content;
  border-radius: 12px;
}
.share-button {
  cursor: pointer;
  /* padding: 10px 20px; */
  width: 30px;
  height: 30px;
  border: 1px solid #eee;
  color: #6b7280;
  border-radius: 50%;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-icons {
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  padding: 5px;
}

.icon {
  color: #000;
  font-size: 18px;
  transition: color 0.3s;
}

.icon:hover {
  color: #0056b3;
}
@media (max-width:477px) {
.user-menu {

    display: none;
}
.partTwo{
  width: 100% !important;
}
.title-page {
  background-color: transparent;
  height: 0;
}
}
@media (max-width:799px) {
.user-menu {

    display: none;
}

.title-page {
  background-color: transparent;
  height: 0;
}
}
@media (max-width:992px) {
.user-menu {

    display: none;
}

.title-page {
  background-color: transparent;
  height: 0;
}
}
@media (max-width:1024px) {
.user-menu {

    display: none;
}

.title-page {
  background-color: transparent;
  height: 0;
}

}
</style>
