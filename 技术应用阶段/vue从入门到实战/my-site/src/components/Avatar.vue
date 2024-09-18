<template>
  <!-- https://v2.cn.vuejs.org/v2/guide/class-and-style.html#%E7%BB%91%E5%AE%9A%E5%86%85%E8%81%94%E6%A0%B7%E5%BC%8F -->
  <img
    class="avatar-img"
    :src="url"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>
<script>
export default {
  name: "Avatar",
  // https://v2.cn.vuejs.org/v2/guide/components-props.html
  props: {
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 100,
    },
  },
};
</script>
<style scoped>
/** scoped：带有作用域的样式 */
.avatar-img {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
