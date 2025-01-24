<script>
import { useCartStore } from "../stores/cartStore";

export default {
  computed: {
    cartStore() {
      return useCartStore();
    },
  },
  methods: {
    updateQuantity(productId, quantity) {
      this.cartStore.updateQuantity(productId, quantity);
    },
    // وظيفة جديدة لحذف المنتج
    removeItem(productId) {
      this.cartStore.removeFromCart(productId);
    },
  },
};
</script>

<template>
  <div>
    <h2>السلة</h2>
    <!-- عرض جملة "السلة فارغة" إذا كانت السلة فارغة -->
    <div v-if="cartStore.cartItems.length === 0" class="empty-cart-message">
      <p>السلة فارغة</p>
    </div>

    <!-- عرض العناصر في السلة إذا كانت تحتوي على منتجات -->
    <div v-else>
      <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" alt="Product Image" />
        <div>
          <h4>{{ item.name }}</h4>
          <p>{{ item.newPrice }} ر.س</p>
          <div>
            <button
              @click="updateQuantity(item.id, item.quantity - 1)"
              :disabled="item.quantity === 1"
            >
              −
            </button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)">
              +
            </button>
          </div>
        </div>
        <!-- أيقونة الحذف -->
        <button @click="removeItem(item.id)" class="delete-button">
          <i class="pi pi-trash"></i> <!-- أيقونة سلة المهملات من PrimeVue -->
        </button>
      </div>
      <h3>إجمالي السعر: {{ cartStore.totalPrice.toFixed(2) }} ر.س</h3>
    </div>
  </div>
</template>

<style scoped>
.empty-cart-message {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
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

.cart-item p {
  margin: 0;
  color: #555;
}

.cart-item button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.cart-item button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.cart-item span {
  margin: 0 0.5rem;
  font-weight: bold;
}

.delete-button {
  background-color: transparent;
  border: none;
  color: #ff4444;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.delete-button:hover {
  color: #cc0000;
}
</style>
