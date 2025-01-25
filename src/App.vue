<template>
  <Nav/>
   <RouterView />
   <Footer />
</template>
<script>
import { RouterView } from 'vue-router';
import Nav from "./components/layout/Nav.vue"
import Footer from "./components/layout/Footer.vue"
export default{
  name:"App",
  components:{RouterView,Nav, Footer}
}
</script>
<style >

</style>
