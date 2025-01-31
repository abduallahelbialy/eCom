<template>
  <header class="py-4 px-0" v-if="$route.path !== '/soon'" >
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-between align-items-center">
          <!-- ///side menue/////// -->
          <div>
            <button
              class="border-0 bg-transparent btn-outline-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <i class="pi pi-bars fs-4"></i>
            </button>
            <div
              class="offcanvas offcanvas-end px-3"
              tabindex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div class="offcanvas-header">
                <div class="w-25">
                  <img :src="img" alt="logo" class="img-fluid" />
                </div>
                <div class="position-relative">
                  <div class="icon position-absolute" data-bs-dismiss="offcanvas">
                    <span
                      class="pi pi-times m-auto d-flex justify-content-center align-items-center text-white"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="offcanvas-body">
                <div class="mb-3">
                  <router-link to="/dd" class="text-decoration-none">كهرباء</router-link>
                </div>
                <div class="mb-3">
                  <router-link to="/dd" class="text-decoration-none">تخفضيات</router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- ///side menue/////// -->
          <!-- ///search menue/////// -->
        <div class="logooo" v-if="$route.path !== '/'">
    <img :src="img" alt="logo" class="img-fluid" />
  </div>
  <div class="flex-grow-1">


    <div class="position-relative">
        <input type="text"
               class="form-control rounded-pill search-bar pe-5"
               placeholder="ادخل كلمة البحث"
               aria-label="Search">
        <button class="btn position-absolute top-50 end-0 translate-middle-y" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
        </button>
    </div>
  </div>
          <!-- ///search menue/////// -->
          <div class="group-icon d-flex gap-4 align-items-center">
            <div class="user-icon" @click="toggleModal">
              <span v-if="!isLoggedIn"><i class="pi pi-user fs-4"></i></span>
              <div v-else class="user-menu">
                <span class="user-name" @click="toggleMenu">
                  <img :src="imUser" alt="imageUser" class="img-fluid imageUser" />
                </span>
                <div v-if="showMenu" class="custom-dropdown-menu" @click.stop>
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
                    <i class="pi pi-shopping-cart"></i >طلبات بانتظار الدفع
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
             <router-link  to="/cart" class=" text-black text-decoration-none">
             <div>

            <div class="position-relative num" >


              <span class="text-white d-flex justify-content-center align-items-center">{{ cartStore.totalQuantity }}</span>
            </div>
            <i class="pi pi-shopping-bag fs-4"></i>
             </div>
            </router-link>
            <div class="mt-2">

            <span class="price">{{ cartStore.totalPrice.toFixed(2) }}<b>ر.س</b></span>
            </div>

          </div>
          <!-- Modal  Bootstrap -->
          <div
            class="modal fade"
            :class="{ show: showModal }"
            tabindex="-1"
            role="dialog"
            :style="{ display: showModal ? 'block' : 'none' }"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <button
                    type="button"
                    class="close me-auto border-0 text-danger bg-transparent fs-3"
                    @click="closeModal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="icon-user-m mb-3">
                    <i class="pi pi-user"></i>
                  </div>
                  <h5 class="modal-title text-center">تسجيل الدخول</h5>
                  <div v-if="!emailSent">
                    <label for="email" class="mb-2">البريد الإلكتروني</label>
                    <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      placeholder="your@email.com"
                    />
                    <p v-if="emailError" class="error">{{ emailError }}</p>
                  </div>
                  <div v-else>
                    <p class="text-center otp mt-3">
                      رقم التحقق مطلوب لاكمال العملية <br />لقد تم إرسال رمز التحقق في رسالة إليكم
                    </p>
                    <p class="text-center">{{ email }}</p>
                    <div class="d-flex justify-content-center gap-2">
                      <input
                        v-for="i in 4"
                        :key="i"
                        v-model="otp[i - 1]"
                        type="text"
                        maxlength="1"
                        class="form-control text-center otp-input"
                        @input="handleOtpInput(i)"
                        @keydown.delete="handleOtpDelete(i)"
                      />
                    </div>
                    <p v-if="codeError" class="error">{{ codeError }}</p>
                  </div>
                </div>
                <div class="modal-footer border-0">
                  <button v-if="!emailSent" type="button" class="btn-log" @click="sendEmail">
                    دخول
                  </button>
                  <div v-else>
                    <div class="btn-otp">
                      <button type="button" class="btn-log m-auto" @click="verifyCode">تحقق</button>
                    </div>
                    <div class="text-center mt-3 m-auto">
                      <span v-if="!canResend">يمكنك إعادة الإرسال بعد {{ countdown }} :00</span>
                      <button v-else class="btn btn-link p-0 text-danger" @click="resendCode">
                        إعادة الإرسال
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="showModal" class="modal-backdrop fade show"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "../../stores/userStore";
import image from "../../assets/hRhoeJLziPSo9JXQNF7oL7YKXdWg8GYRTqN1jlSP.avif";
import imageUser from "../../assets/download.webp";
import { useCartStore } from "../../stores/cartStore";

export default {
  data() {
    return {
      img: image,
      imUser: imageUser,
    };
  },
   computed: {
    cartStore() {
      return useCartStore();
    },
  },
  setup() {
    const userStore = useUserStore(); // استخدام مخزن Pinia

    const showModal = ref(false);
    const showMenu = ref(false); // حالة إظهار القائمة
    const email = ref("");
    const emailSent = ref(false);
    const otp = ref(["", "", "", ""]); // 4 خانات لرمز التحقق
    const emailError = ref(""); // رسالة خطأ البريد الإلكتروني
    const codeError = ref(""); // رسالة خطأ رمز التحقق
    const countdown = ref(30); // عداد تنازلي
    const canResend = ref(false); // حالة إعادة الإرسال

    let timer;

    const isLoggedIn = computed(() => userStore.userLoggedIn);

    const toggleModal = () => {
      if (!isLoggedIn.value) {
        showModal.value = !showModal.value;
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const toggleMenu = () => {
      console.log("تم النقر على user-name");
      showMenu.value = !showMenu.value;
    };

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value) {
        emailError.value = "البريد الإلكتروني مطلوب";
        return false;
      } else if (!emailPattern.test(email.value)) {
        emailError.value = "البريد الإلكتروني غير صحيح";
        return false;
      } else {
        emailError.value = "";
        return true;
      }
    };

    const sendEmail = () => {
      if (validateEmail()) {
        emailSent.value = true;
        startCountdown();
      }
    };

    const handleOtpInput = (index) => {
      if (otp.value[index - 1] && index < 4) {
        document.querySelector(`.otp-input:nth-child(${index + 1})`).focus();
      }
      if (otp.value.every((digit) => digit !== "")) {
        verifyCode();
      }
    };

    const handleOtpDelete = (index) => {
      if (!otp.value[index - 1] && index > 1) {
        document.querySelector(`.otp-input:nth-child(${index - 1})`).focus();
      }
    };

    const verifyCode = () => {
      const code = otp.value.join("");
      if (code.length === 4) {
        userStore.login();
        closeModal();
      } else {
        codeError.value = "رمز التحقق يجب أن يكون 4 أرقام";
      }
    };

    const startCountdown = () => {
      countdown.value = 30;
      canResend.value = false;
      timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(timer);
          canResend.value = true;
        }
      }, 1000);
    };

    const resendCode = () => {
      startCountdown();
    };

    const editProfile = (event) => {
      event.preventDefault();
    };

    const logout = (event) => {
      event.preventDefault();
      userStore.logout();
      showMenu.value = false;
      emailSent.value = false;
      email.value = "";
      otp.value = ["", "", "", ""];
      emailError.value = "";
      codeError.value = "";
    };





    const handleClickOutside = (event) => {
      const userMenu = document.querySelector(".user-menu");
      const dropdownMenu = document.querySelector(".custom-dropdown-menu");
      if (userMenu && !userMenu.contains(event.target) && dropdownMenu && !dropdownMenu.contains(event.target)) {
        showMenu.value = false;
      }
    };



    onMounted(() => {
      if (emailSent.value) {
        startCountdown();
      }
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      clearInterval(timer);
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      showModal,
      showMenu,
      email,
      emailSent,
      otp,
      emailError,
      codeError,
      countdown,
      canResend,
      isLoggedIn,
      toggleModal,
      closeModal,
      toggleMenu,
      sendEmail,
      verifyCode,
      editProfile,
      logout,
      handleOtpInput,
      handleOtpDelete,
      resendCode,
    };
  },
};
</script>

<style scoped>

/* .search-bar {
    transition: width 0.3s ease-in-out;
    width: 100%;
}

.search-bar:focus {
    width: 250px;
} */


.icon {
  width: 40px;
  height: 40px;
  background-color: #ee4444;
  border-radius: 50%;
  right: 265px;
  top: 59px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.search {
  position: relative;
}
.user-icon {
  cursor: pointer;
}
.logooo img{
  max-width: 80px;
  padding: 10px;
}
.num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ee4444;
  left: 9px;
  top: 13px;
  font-size: 12px;
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  color: #ccc;
  pointer-events: none;
}
.btn-otp {
  display: block;
  width: 366px !important;
  margin: auto;
}
.form-control {
  padding: 10px;
}
input[type="search"] {
  padding-right: 35px;
}
a:active {
  color: #ee4444;
}
a:hover {
  color: #ee4444;
}
.price {
  color: #4b5563;
}
.otp {
  font-size: 14px;
  color: #9ca3af;
  font-weight: 500;
}
.user-menu {
  position: relative;
}
.btn-log {
  background-color: #aed8e0;
  border: 1px solid #aed8e0;
  color: #2f5961;
  width: 100%;
  padding: 7px;
  border-radius: 4px;
}
.link-list{
  font-size: 11px;
  font-weight: bold;

}
.link-list:hover{
  background-color: #eee;
  border-radius: 4px;

}
.form-control:focus {
  box-shadow: #aed8e0;
  border-color: #aed8e0 !important;
  outline: 0;
}

.custom-dropdown-menu {
  position: absolute;
  top: 49px;
  left: 6px;
  background-color: white;
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
  background-color: #f1f1f1;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.modal {
  display: none;
  align-content: center;
}

.modal.show {
  display: block;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
.imageUser {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.icon-user-m {
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: #9ca3af;
}
.modal-content {
  padding: 0px;
  width: 79%;
  margin: auto;
}
.otp-input {
  width: 50px;
  height: 50px;
  font-size: 18px;
  text-align:left;
}
.search-icon {
  cursor: pointer;
}
/* ///media////////////// */
@media (max-width: 477px) {
  .offcanvas {
    max-width: 90%;
  }
  .search-bar{
    display: none;
  }
  .icon {
    width: 40px;
    height: 40px;
    background-color: #ee4444;
    border-radius: 50%;
    right: 215px;
    top: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
 .btn-otp{
  width: 250px !important;
 }
 .logooo{
  display: none;
 }
  .custom-dropdown-menu {
   position: absolute;
        left: -151px;
        background-color: white;
        /* border: 1px solid #ccc; */
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        padding: 10px;
        min-width: 291px;
  }
  /* .icon {
    right: 219px;
  }
  .search {
    display: none;
  } */
}





</style>
