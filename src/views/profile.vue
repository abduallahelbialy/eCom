<template>
  <div class="favorites-page">
    <div class="container">
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
      <div class="d-flex justify-content-between align-items-center box-del rounded-2 p-3 flex-wrap gap-3">
        <div class="d-flex flex-column">
          <span class="fw-bold">تعطيل السحاب</span>
          <span > يمكنك حذف حسابك من المتجر ، بما في ذلك طلباتك السابقة ومنتجات قائمة الأمنيات.
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
.favorites-page {
  padding: 20px 0;
  height: 30vh;
  background-color: #9cc6ce;
}
.box-del{
  font-size: 12px;
  border: 1px solid #ddd;
  padding: 10px;

}
.title-page {
  font-size: 12px;
}
.user-menu {
  position: relative;
}
.link-list {
  font-size: 11px;
  font-weight: bold;
}
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
.link-list:hover {
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

.custom-dropdown-menu a:hover {
  background-color: #eee;
}
.form-check-input:checked {
    background-color: green;
    border-color: green;
    padding: 9px;
}
@media (max-width: 477px) {
  .user-menu {
    display: none;
  }
  .favorites-page {
    background-color: transparent;
    height: 0 !important;
  }
  .col-lg-9 {
    padding: 1rem !important;
    margin-top: 1rem !important;
  }
}
</style>
