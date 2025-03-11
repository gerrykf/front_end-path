<template>
  <transition name="dialog-fade">
    <div class="gy-dialog_wrapper" v-show="visible">
      <div class="gy-dialog" :style="{ width: width, marginTop: top }">
        <!-- 头部 -->
        <div class="gy-dialog_header">
          <slot name="title">
            <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
            <span class="gy-dialog_title">
              {{ title }}
            </span>
          </slot>
          <!-- 关闭按钮 -->
          <button class="gy-dialog_headerbtn" @click="handleClose">
            <i class="gy-icon-close"></i>
          </button>
        </div>
        <!-- 中间区域：默认插槽 -->
        <div class="gy-dialog_body">
          <slot></slot>
        </div>
        <!-- 底部 -->
        <div class="gy-dialog_footer">
          <!-- 如果footer不传递内容，则不显示footer -->
          <slot name="footer" v-if="$slots.footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '提示',
  },
  width: {
    type: String,
    default: '50%',
  },
  top: {
    type: String,
    default: '15vh',
  },
  visible: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['close'])
function handleClose() {
  emits('close')
}
</script>
<script lang="ts">
export default {
  name: 'GyDialog',
}
</script>

<style lang="scss" scoped>
.gy-dialog_wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);

  .gy-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;

    &_header {
      padding: 20px 20px 10px;

      .gy-dialog_title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }

      .gy-dialog_headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;

        .gy-icon-close {
          color: 909399;
        }
      }
    }

    &_body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }

    &_footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;

      :deep(.gy-button:first-child) {
        margin-right: 20px;
      }
    }
  }
}

.dialog-fade-enter-active {
  animation: fade 0.3s;
}

.dialog-fade-leave-active {
  animation: fade 0.3s reverse;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
