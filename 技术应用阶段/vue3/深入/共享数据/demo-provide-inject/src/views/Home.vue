<script>
import { inject } from "vue";
export default {
  name: "Home",
  components: {},
  setup() {
    const vari = inject("foo");
    console.log(vari);
    return {};
  },
};
</script>
<template>
  <div class="home-container">Home</div>
</template>
<style scoped>
.home-container {
  display: flex;
  width: 800px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}
</style>
