<template>
  <div class="py-4 px-0">
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
            <router-link to="/cart" class="text-black-50 text-decoration-none fw-medium"
              >سلة المشتريات</router-link
            >
          </span>
        </div>
        <div v-if="cartStore.cartItems.length === 0" class="empty-cart-message">
          <div class="text-center d-flex flex-column align-items-center gap-3">
            <div class="nothing d-flex justify-content-center align-items-center">
              <i class="pi pi-lock fs-1"></i>
            </div>
            <span class="text-black-50"> السلة فارغة </span>
<div class="btn-cartt">
  <button class="fw-bold" @click="back">عودة للرئيسية</button>
</div>
          </div>
        </div>

        <div v-else class="m-auto">
          <div class="row">
            <div class="col-lg-8 col-md-12 m-auto">
              <div class="box-cart mb-5" v-for="item in cartStore.cartItems" :key="item.id">
                <div class="d-flex flex-column mb-3">
                  <div
                    class="cart-item p-2 d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <div class="flex-grow-1 d-flex align-items-center flex-wrap gap-3 p-2 box-imag">
                      <div class="img-pr border mt-2 rounded-2">
                        <img :src="item.image" alt="Product Image" />
                      </div>
                      <div class="flex-grow-1">
                        <span class="fw-medium">{{ item.name }}</span>
                        <p>{{ item.newPrice }} ر.س</p>
                      </div>
                    </div>

                    <div class="quantity-control">
                      <button
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        :disabled="item.quantity === 1"
                        class="bg-transparent border-0 text-black-50 fw-medium fs-3"
                      >
                        −
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="bg-transparent border-0 text-black-50 fw-medium fs-3"
                      >
                        +
                      </button>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                      <div class="total">
                        <span> المجموع: {{ cartStore.totalPrice.toFixed(2) }} ر.س</span>
                      </div>
                      <div class="delete-button">
                        <button @click="removeItem(item.id)" class="bg-danger border-0">
                          <i class="pi pi-times text-white"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <div class="box-final border">
                <div class="fw-bold">ملخص الطلب</div>
                <div class="d-flex justify-content-between align-items-center mb-2 mt-3">
                  <div>مجموع المنتجات</div>
                  <span class="fw-bold">{{ cartStore.totalPrice.toFixed(2) }} ر.س</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div>الاجمالى</div>
                  <span class="fw-bold">{{ cartStore.totalPrice.toFixed(2) }} ر.س</span>
                </div>
                <div class="btn-cart mt-3 d-flex justify-content-center align-items-center">
                  <button @click="submitlove">اتمام الطلب</button>
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
import { useCartStore } from "../stores/cartStore";
import { useUserStore } from "../stores/userStore"; // استيراد مخزن المستخدم

export default {
  computed: {
    cartStore() {
      return useCartStore();
    },
    userStore() {
      return useUserStore(); // استخدام مخزن المستخدم
    },
  },
  methods: {
    back(){
this.$router.push("/")
    },
    submitlove() {
      const toast = useToast();

      if (!this.userStore.userLoggedIn) {
        toast.error("يجب تسجيل الدخول لإكمال الطلب", {
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
        this.$router.push("/soon"); // توجيه المستخدم إلى صفحة /soon
      }
    },
    updateQuantity(productId, quantity) {
      this.cartStore.updateQuantity(productId, quantity);
    },
    removeItem(productId) {
      this.cartStore.removeFromCart(productId);
    },
  },
};
</script>
<style scoped>
.btn-cart button {
  border: 1px solid #87d3d8;
  background-color: #aed8e0;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  color: #2f5961;
  font-weight: bold;
  font-size: 14px;
  transition: 0.3s;
  margin: auto;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;

  margin-bottom: 1rem;
  padding-bottom: 1rem;
  position: relative;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.cart-item h4 {
  margin: 0;
  font-size: 1.1rem;
}
.btn-cartt button {
  border: 1px solid #87d3d8;
  background-color: transparent;
  border-radius: 4px;
  padding: 7px;
  width: 200px;
  color: #87d3d8;
  font-size: 14px;
  transition: 0.3s;
}
.btn-cartt button:hover {
  background-color: #aed8e0;
  color: #2f5961;
  font-weight: bold;
}
.cart-item p {
  margin: 0;
  color: #555;
}

.cart-item button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;

  cursor: pointer;
  width: 60px;
}

.cart-item button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.cart-item span {
  margin: 0 0.5rem;
  font-weight: bold;
}
.total span {
  font-size: 12px;
  color: #aed8e0;
}
.delete-button button {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nothing {
  background-color: #ecebf0;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: auto;
}
.delete-button:hover {
  color: #cc0000;
}
.title-page {
  font-size: 12px;
}
.box-cart {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 15px;
}
.quantity-control {
  display: flex;
  /* gap: 10px; */
  align-items: center;
  border: 1px solid #ccc;
  width: fit-content;
  border-radius: 12px;
}
.box-final {
  border-radius: 12px;
  padding: 20px;
}
.box-final span {
  font-size: 12px;
}
@media (max-width: 477px) {
  .cart-item img {
    width: 68px;
    height: 64px;
    object-fit: cover;
  }
}
</style>
