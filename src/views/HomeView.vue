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
              <h5 class="text-end mb-4">احدث المنتجات</h5>
              <ProdcutsPage />
            </div>

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

import ProdcutsPage from "../components/products/ProdcutsPage.vue";

export default {
  components: { ProdcutsPage },
  data() {
    return {
      activeTab: 0,
      img: image,

      tabs: [
        { label: "المتجر", icon: "pi pi-shop" },
        { label: "تخفيضات", icon: "pi pi-tags" },
      ],
    };
  },
  methods:{
    setActiveTab(index) {
      this.activeTab = index;
    },
  }
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
</style>
