<template>
  <div class="py-5 px-0">
    <div class="container">
      <div class="row">
        <div class="d-flex flex-column align-items-center gap-3">
          <div class="logos animated-element">
            <img :src="logo" alt="log" class="img-fluid" />
          </div>
          <div class="logo w-25 animated-element">
            <img :src="soo" alt="log" class="img-fluid" />
          </div>
          <div class="text text-center animated-element">
            <h3 class="mb-3">ترقَّب إطلاق المتجر</h3>
            <div>نعمل على وضع اللمسات الأخيرة لنقدم لك تجربة تسوق متكاملة، قريبًا!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import imga from "../assets/hRhoeJLziPSo9JXQNF7oL7YKXdWg8GYRTqN1jlSP.avif";
import imga2 from "../assets/under-construction.webp";

export default {
  data() {
    return {
      logo: imga,
      soo: imga2,
    };
  },
  mounted() {
    const elements = document.querySelectorAll(".animated-element");
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animate");
      }, index * 200);
    });
  },
};
</script>

<style scoped>
.logos img {
  max-width: 70px;
}

.animated-element {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animated-element.animate {
  opacity: 1;
  transform: translateY(0);
}
</style>

