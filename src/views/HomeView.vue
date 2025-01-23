<template>
  <div class="py-4 px-0">
    <div class="container">
      <div class="row">
        <div class="logo">
          <img :src="img" alt="logo" class="img-fluid" />
        </div>
        <div class="tabs-container mt-4 d-flex flex-column align-items-center">
          <div class="tabs d-flex justify-content-center">
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              :class="['tab', { active: activeTab === index }]"
              @click="setActiveTab(index)"
            >
              <div class="d-flex gap-1 align-items-center">
                <i :class="['icon', tab.icon]"></i>
                <span class="label">{{ tab.label }}</span>
              </div>
            </div>
          </div>

          <div class="tab-content mt-4">
            <div v-if="activeTab === 0">
              <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="product-card"
                  
                  
                >
                  <div class="heart-icon position-absolute top-0 start-0 m-2" @click="submitlove">
                    <i class="pi pi-heart"></i>
                  </div>
                  <img data-bs-toggle="modal" :data-bs-target="'#productModal' + product.id" :src="product.image" alt="Product Image" class="product-image" />
                  <span class="product-name text-end d-block mb-3">{{ product.name }}</span>
                  <div class="price-section">
                    <span class="new-price">{{ product.newPrice }} ر.س</span>
                    <span class="old-price">{{ product.oldPrice }} ر.س</span>
                  </div>
                  <div class="btn-cart mt-3">
                    <button @click="submitForm"><i class="pi pi-shopping-bag px-1"></i>اضافة للسلة</button>
                  </div>
                </div>
              </div>

              <div
                v-for="product in products"
                :key="'modal-' + product.id"
                class="modal fade"
                :id="'productModal' + product.id"
                tabindex="-1"
                aria-labelledby="modalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl">
                  <!-- تم تغيير modal-dialog إلى modal-fullscreen -->
                  <div class="modal-content">
                    <div class="modal-header border-0">
                      <div class="me-auto close-m bg-danger  ">
                        <button
                          type="button"
                          class="btn-close "
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          
                        ></button>
                      </div>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-lg-6 col-md-12">
                          <div class="d-flex justify-content-between bable">
                            <div class="image-container">
                              <img
                                :src="product.image"
                                alt="Product Image"
                                class="modal-image "
                              />
                            </div>
                            <div class="heart-icon m-2" @click="submitlove">
                              <i class="pi pi-heart"></i>
                            </div>
                            
                            <div class="d-flex justify-content-between gap-3 ">
                             <div class="social-share mt-2">
   <div class="share-button" @click="toggleShare">
      <i v-if="!isOpen" class="pi pi-share-alt"></i>
      <span v-else>x</span>
    </div>
    <div v-if="isOpen" class="social-icons">
      <router-link to="#" class="icon"><i class="pi pi-facebook"></i></router-link>
      <router-link to="#" class="icon"><i class="pi pi-whatsapp"></i></router-link>
      <router-link to="#" class="icon"><i class="pi pi-twitter"></i></router-link>
      <router-link to="#" class="icon"><i class="pi pi-share-alt"></i></router-link>
      <router-link to="#" class="icon"><i class="pi pi-envelope"></i></router-link>
     
    </div>
  </div>
                              <div class="d-flex flex-column gap-2 align-items-center ">

                              <h5 class="modal-title  " id="modalLabel">{{ product.name }}</h5>
                              <div class="d-flex align-items-center gap-1  ">

                          <span class="new-price">{{ product.newPrice }} </span>
                          <b>ر.س</b>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                          <div class="d-flex">

                          <div class="modal-details ">
                            <div class="d-flex flex-column ">

                            <label class=" text-end mb-3">الكمية</label>
                            <div class="quantity-control d-flex align-items-center gap-2  ">
                              <button @click="increaseQuantity" class=" bg-transparent border-0 text-black-50 fw-medium fs-3">+</button>
                              <span class=" fw-bold">{{ quantity }}</span>
                              <button @click="decreaseQuantity" class=" bg-transparent border-0 text-black-50 fw-medium fs-3">−</button>
                            </div>
                            </div>
                            <div class="btn-cart mt-3">
                              <button class="btn btn-primary" id="liveToastBtn" @click="submitForm">
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

            <!-- تبويب التخفيضات -->
            <div v-if="activeTab === 1">
              <p>محتوى التخفيضات هنا.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from "../assets/hRhoeJLziPSo9JXQNF7oL7YKXdWg8GYRTqN1jlSP.avif";
import imgProduct from "../assets/ba45e5ce-3de9-427a-94c1-c267f5f514be-500x500-kEuWThmVIFNvRUJomzpfyVKSWW57xoc2w9GQxzzk.webp";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
       isOpen: false,
      img: image,
      activeTab: 0,
      quantity: 1,
      tabs: [
        { label: "المتجر", icon: "pi pi-shop" },
        { label: "تخفيضات", icon: "pi pi-tags" },
      ],
      products: [
        {
          id: 1,
          name: "سماعة",
          newPrice: 90,
          oldPrice: 150,
          image: imgProduct,
        },
        {
          id: 2,
          name: "ساعة",
          newPrice: 250,
          oldPrice: 400,
          image: imgProduct,
        },
        {
          id: 3,
          name: "ساعة",
          newPrice: 250,
          oldPrice: 400,
          image: imgProduct,
        },
        {
          id: 4,
          name: "ساعة",
          newPrice: 250,
          oldPrice: 400,
          image: imgProduct,
        },
      ],
    };
  },
  methods: {
     submitForm() {
      const toast = useToast();
      toast.success("تم اضافة المنتج بنجاح");
      // Add form submission logic here
    },
     submitlove() {
      const toast = useToast();
      toast.success("غير مسموح الا بعد تسجيل الدخول");
      // Add form submission logic here
    },
    toggleShare() {
      this.isOpen = !this.isOpen;
    },
    setActiveTab(index) {
      this.activeTab = index;
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
  },
};
</script>

<style scoped>
.logo img {
  max-width: 160px;
}
.tabs-container {
  border-top: 1px solid #eee;
}
.tabs {
  width: 100%;
  max-width: 600px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  flex: 1;
  position: relative;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab.active::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #87d3d8;
  border-radius: 4px;
}

.tab.active {
  color: #87d3d8;
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
.icon {
  font-size: 24px;
}

.label {
  margin-top: 5px;
}

.tab-content {
  padding: 20px;
  text-align: center;
}
.product-card {
  width: 260px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
}
.heart-icon {
  font-size: 1.5rem;
  color: #e74c3c;
  transition: color 0.3s ease;
  font-size: 14px;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.titlex {
  position: relative;
  bottom: 225px;
  left: -30px;
}
.titlex::after {
  content: "";
  position: absolute;
  bottom: -7px;
  right: 0;
  width: 500px;
  height: 2px;
  background-color: #eee;
}
.heart-icon:hover {
  color: #fff;
  background: #e74c3c;
}
.product-image {
  width: 100%;
  border-radius: 8px;
}

.product-name {
  margin: 10px 0 5px;
  font-size: 18px;
}

.price-section {
  display: flex;
  gap: 10px;
  font-size: 14px;
}

.new-price {
  color: #e74c3c;
  font-weight: bold;
}
.list-so {
  top: 10px;
  left: -16px;
}
.old-price {
  color: #aaa;
  text-decoration: line-through;
}

/* .modal-body-content {
  display: flex;
  align-items: center;
} */

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
.close-m{
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

  .bable{
    flex-direction: column !important;
  }
}
@media (max-width:799px) {

  .bable{
    flex-direction: column !important;
  }
}
@media (max-width:992px) {

  .bable{
    flex-direction: column !important;
  }
}
</style>

