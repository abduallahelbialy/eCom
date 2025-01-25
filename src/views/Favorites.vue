<template>
  <div class="favorites-page  ">
    <div class="container-fluid">
      <div class="row">
        <div class="d-flex  gap-2 title-page mb-4">
          <span>
            <router-link to="/" class="text-black text-decoration-none fw-medium">الرئيسية</router-link>
          </span>
          /
          <span>
            <router-link to="/profile" class="text-black-50 text-decoration-none">حسابى</router-link>
          </span>
          /
          <span>
            <router-link to="/favorites" class="text-black-50 text-decoration-none fw-medium">الامنيات</router-link>
          </span>
        </div>
        <div class="d-flex justify-content-center flex-wrap">

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
        <div class="w-75 partTwo">
          <div class="text-fa text-end ">
            <span class="fw-bold">الامنيات</span>
          </div>
          <div v-if="favorites.length > 0">
            <div class="box-fav border mt-3" v-for="product in favorites" :key="product.id">
              <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div class="product-card d-flex justify-content-between w-100">
                  <div class="col-lg-6">
                    <div class="d-flex gap-2 align-items-center">
                      <div class="w-25">
                        <img
                          data-bs-toggle="modal"
                          :data-bs-target="'#productModal' + product.id"
                          :src="product.image"
                          alt="Product Image"
                          class="product-image img-fluid"
                        />
                      </div>
                      <div class="d-flex flex-column">
                        <span class="fw-semibold">{{ product.name }}</span>
                        <span class="old-price">{{ product.newPrice }} ر.س</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="d-flex justify-content-end flex-wrap-reverse">
                      <div class="btn-cart">
                        <button class="" @click="addToCart(product)">
                          <i class="pi pi-shopping-bag"></i> إضافة إلى السلة
                        </button>
                      </div>
                      <div class="m-2 delete-button">
                        <i class="pi pi-times text-white" @click="removeFromFavorites(product)" style="cursor: pointer;"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center d-flex flex-column align-items-center gap-3">
            <div class="nothing d-flex justify-content-center align-items-center">
<i class="pi pi-heart fs-1"></i>
            </div>
            <span class=" text-black-50">الأمنيات غالباً تتحقق !

</span>
          </div>
        </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-for="product in favorites"
      :key="'modal-' + product.id"
      class="modal fade"
      :id="'productModal' + product.id"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header border-0">
            <div class="me-auto close-m bg-danger">
              <i
                class="pi pi-times text-white"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></i>
            </div>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <div class="d-flex justify-content-between bable">
                  <div class="image-container">
                    <img :src="product.image" alt="Product Image" class="modal-image" />
                  </div>
                  <div class="heart-icon position-absolute top-0 start-0 m-2" @click="removeFromFavorites(product)">
                    <!-- <i class="pi pi-trash text-danger"></i> -->
                  </div>

                  <div class="d-flex justify-content-between gap-3">
                    <div class="social-share mt-2">
                      <div class="share-button" @click="toggleShare">
                        <i v-if="!isOpen" class="pi pi-share-alt"></i>
                        <span v-else>x</span>
                      </div>
                      <div v-if="isOpen" class="social-icons">
                        <a href="https://www.facebook.com/" target="blank" class="icon"><i class="pi pi-facebook"></i></a>
                        <a href="https://www.whatsapp.com/?lang=ar_AR" target=" blank" class="icon"><i class="pi pi-whatsapp"></i></a>
                        <a target="blank"  href="https://x.com/?lang=ar" class="icon"><i class="pi pi-twitter"></i></a>
                        <router-link to="#" class="icon"><i class="pi pi-share-alt"></i></router-link>
                        <a href="mailto:expomal@gmail.com" class="icon"><i class="pi pi-envelope"></i></a>
                      </div>
                    </div>
                    <div class="d-flex flex-column gap-2 align-items-center">
                      <h5 class="modal-title" id="modalLabel">{{ product.name }}</h5>
                      <div class="d-flex align-items-center gap-1">
                        <span class="new-price text-danger fw-medium">{{ product.newPrice * product.quantity }} </span>
                        <b>ر.س</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="d-flex">
                  <div class="modal-details">
                    <div class="d-flex flex-column">
                      <label class="text-end mb-3">الكمية</label>
                      <div class="quantity-control d-flex align-items-center gap-2">
                        <button
                          @click="increaseQuantity(product)"
                          class="bg-transparent border-0 text-black-50 fw-medium fs-3"
                        >
                          +
                        </button>
                        <span class="fw-bold">{{ product.quantity }}</span>

                        <button
                          @click="decreaseQuantity(product)"
                          :disabled="product.quantity === 1"
                          class="bg-transparent border-0 text-black-50 fw-medium fs-3"
                        >
                          −
                        </button>
                      </div>
                    </div>
                    <div class="btn-cart mt-3">
                      <button
                        class="btn btn-primary"
                        id="liveToastBtn"
                        @click="addToCart(product)"
                        data-bs-dismiss="modal"
                      >
                        <i class="pi pi-shopping-bag px-1"></i>اضافة للسلة
                      </button>
                    </div>
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
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useCartStore } from "../stores/cartStore";
import { useToast } from "vue-toastification";

export default {
  data(){
    return{
isOpen: false,
    }
  },
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const toast = useToast();

    // تحويل favorites إلى ref لتحديث الواجهة تلقائيًا
    const favorites = ref(userStore.favorites);

    const removeFromFavorites = (product) => {
      userStore.removeFromFavorites(product.id); // حذف العنصر من Pinia Store
      favorites.value = userStore.favorites; // تحديث القائمة يدويًا
      toast.success("تمت إزالة العنصر من المفضلة", {
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

    const addToCart = (product) => {
      cartStore.addToCart(product, product.quantity || 1); // إضافة المنتج إلى السلة
      toast.success("تمت إضافة العنصر إلى السلة", {
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

    const increaseQuantity = (product) => {
      product.quantity = (product.quantity || 1) + 1;
    };

    const decreaseQuantity = (product) => {
      if (product.quantity > 1) product.quantity--;
    };



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
      favorites,
      removeFromFavorites,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      logout,
    };
  },
  methods:{
     toggleShare() {
      this.isOpen = !this.isOpen;
    },
  }
};
</script>

<style scoped>
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
