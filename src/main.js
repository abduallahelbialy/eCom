import './assets/main.css'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(PrimeVue);
app.use(Toast);


app.mount('#app')
