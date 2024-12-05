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
  });
</script>
<script lang="ts">
  export default {
    name: 'GyCard',
  };
</script>
<template>
  <div class="gy-card" :style="width ? { width: width + 'px' } : {}">
    <!-- 里面分为三部分 -->
    <!-- 图片 -->
    <div class="gy-card-img" :style="imgHeight ? { height: imgHeight } : {}">
      <img :src="imgSrc" alt="图片" />
    </div>
    <!-- 描述 -->
    <div v-if="summary" class="gy-card-summary">{{ summary }}</div>
    <div v-else class="gy-card-summary">
      <slot>内容</slot>
    </div>
    <!-- 底部 -->
    <div class="gy-card-footer">
      <slot name="footer">底部</slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .gy-card {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: hidden;
    .gy-card-img {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .gy-card-summary {
      padding: 10px;
      font-size: 14px;
      color: #333;
    }
    .gy-card-footer {
      padding: 10px;
      font-size: 12px;
      color: #666;
      background-color: #f8f8f8;
    }
  }
</style>
