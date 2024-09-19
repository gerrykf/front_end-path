<template>
  <!-- https://v2.cn.vuejs.org/v2/guide/class-and-style.html#%E7%BB%91%E5%AE%9A-HTML-Class -->
  <i
    :class="['icon-container', 'iconfont', fontClass]"
    :style="{ fontSize: size + 'px' }"
  ></i>
</template>
<script>
const classMap = {
  home: "icon-shouye",
  about: "icon-guanyu_o",
};

export const types = Object.keys(classMap);

export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  computed: {
    fontClass() {
      return classMap[this.name] || this.name;
    },
  },
};
</script>
<style>
@import url("//at.alicdn.com/t/c/font_4687021_kbs77ojf4mi.css");
</style>
<style scoped></style>
