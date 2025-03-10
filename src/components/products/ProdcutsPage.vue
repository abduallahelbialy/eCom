<template>
  <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
    <div v-for="product in products" :key="product.id" class="product-card">
      <div class="heart-icon position-absolute top-0 start-0 m-2" @click="toggleFavorite(product)">
        <i class="pi pi-heart" :class="{ 'text-danger': isFavorite(product) }"></i>
      </div>

      <img
        data-bs-toggle="modal"
        :data-bs-target="'#productModal' + product.id"
        :src="product.image"
        alt="Product Image"
        class="product-image"
      />
      <span class="product-name text-end d-block mb-3">{{ product.name }}</span>
      <div class="price-section">
        <span class="new-price">{{ product.newPrice }} ر.س</span>
        <span class="old-price">{{ product.oldPrice }} ر.س</span>
      </div>
      <div class="btn-cart mt-3">
        <button @click="submitForm(product)">
          <i class="pi pi-shopping-bag px-1"></i>اضافة للسلة
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
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
                <div class="heart-icon position-absolute top-0 start-0 m-2" @click="toggleFavorite(product)">
                  <i class="pi pi-heart" :class="{ 'text-danger': isFavorite(product) }"></i>
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
                      <span class="new-price">{{ product.newPrice * product.quantity }} </span>
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
                      @click="submitForm(product)"
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
</template>


<script>
import image from "../../assets/hRhoeJLziPSo9JXQNF7oL7YKXdWg8GYRTqN1jlSP.avif";
// import imgProduct from "../../assets/ba45e5ce-3de9-427a-94c1-c267f5f514be-500x500-kEuWThmVIFNvRUJomzpfyVKSWW57xoc2w9GQxzzk.webp";
import { useToast } from "vue-toastification";
import { useCartStore } from "../../stores/cartStore";
import { useUserStore } from "../../stores/userStore";

export default {
  name: "ProductsPage",
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
      products: [], // سيتم ملء هذه المصفوفة من الـ API
    };
  },
  computed: {
    cartStore() {
      return useCartStore();
    },
    userStore() {
      return useUserStore();
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        this.products = data.products.map(product => ({
          id: product.id,
          name: product.title,
          newPrice: product.price,
          oldPrice: Math.round(product.price * 1.2), // مثال على السعر القديم
          image: product.thumbnail,
          quantity: 1,
        }));
      } catch (error) {
        console.error('فشل جلب البيانات:', error);
      }
    },
    submitForm(product) {
      const toast = useToast();
      toast.success("تم اضافة المنتج بنجاح");

      if (product.quantity > 0 && !isNaN(product.newPrice)) {
        this.cartStore.addToCart(product, product.quantity);
        product.quantity = 1;
      } else {
        console.error("هناك خطأ في الكمية أو السعر");
      }
    },
    toggleFavorite(product) {
      const toast = useToast();

      if (!this.userStore.userLoggedIn) {
        toast.error("يجب تسجيل الدخول لإضافة العنصر إلى المفضلة", {
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
      } else {
        if (this.userStore.favorites.some((fav) => fav.id === product.id)) {
          this.userStore.removeFromFavorites(product.id);
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
        } else {
          this.userStore.addToFavorites(product);
          toast.success("تمت إضافة العنصر إلى المفضلة", {
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
        }
      }
    },
    isFavorite(product) {
      return this.userStore.favorites.some((fav) => fav.id === product.id);
    },
    toggleShare() {
      this.isOpen = !this.isOpen;
    },
    increaseQuantity(product) {
      product.quantity++;
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) product.quantity--;
    },
  },
  mounted() {
    this.fetchProducts(); // جلب البيانات عند تحميل المكون
  },
};
</script>
<style scoped>
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
  /* width: 260px; */
  /* max-height: 400px; */
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
@media (max-width: 477px) {
  .bable {
    flex-direction: column !important;
  }
}
@media (max-width: 799px) {
  .bable {
    flex-direction: column !important;
  }
}
@media (max-width: 992px) {
  .bable {
    flex-direction: column !important;
  }
}
</style>
