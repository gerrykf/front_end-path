<template>
  <div class="gy-card" :style="width ? { width: width + 'px' } : {}">
    <!-- 里面分为三个部分 -->
    <!-- 1.图片 -->
    <div class="gy-card-img" :style="imgHeight ? { height: imgHeight + 'px' } : {}">
      <img :src="imgSrc" alt="img" />
    </div>
    <!-- 2.描述 -->
    <div v-if="summary" class="gy-card-summary">{{ summary }}</div>
    <div v-else class="gy-card-summary">
      <slot></slot>
    </div>
    <!-- 3.底部 -->
    <div class="gy-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    default: 0,
  },
  imgSrc: {
    type: String,
    default: '',
    required: true,
  },
  imgHeight: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    default: '',
  },
})
</script>
<script lang="ts">
export default {
  name: 'GyCard',
}
</script>

<style lang="scss" scoped>
.gy-card {
  width: 270px;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 6px 10px 0 rgba(95, 101, 105, 0.15);
  padding-bottom: 8px;

  &-img {
    height: 152px;
    margin-bottom: 8px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &-summary {
    padding: 0 8px;
    text-align: left;
    font-size: 14px;
    color: #545c63;
    line-height: 20px;
    height: 40px;
    margin-bottom: 8px;
  }
}
</style>
