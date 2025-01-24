import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cart from "../views/Cart.vue";
import Favorites from "../views/Favorites.vue";
import Notifications from "../views/Notifications.vue";
import Orders from "../views/Orders.vue";
import pending from "../views/pending_orders.vue";
import profile from "../views/profile.vue";
import Soon from "../views/Soon.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
    {
      path: "/favorites",
      name: "Favorites",
      component: Favorites,
    },
    {
      path: "/Notifications",
      name: "Notifications",
      component: Notifications,
    },
    {
      path: "/orders",
      name: "Orders",
      component: Orders,
    },
    {
      path: "/pending",
      name: "pending",
      component: pending,
    },
    {
      path: "/profile",
      name: "profile",
      component: profile,
    },
    {
      path: "/soon",
      name: "Soon",
      component: Soon,
    },
  ],
});

export default router
