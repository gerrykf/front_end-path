<script setup lang="ts">
  import GyButton from './Button.vue';

  defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '50%',
    },
  });

  const emit = defineEmits<{
    'update:show': [value: boolean];
  }>();

  const slots = defineSlots();

  const handleShow = () => {
    emit('update:show', false);
  };
</script>
<script lang="ts">
  export default {
    name: 'GyDialog',
  };
</script>
<template>
  <Transition name="dialog-fade">
    <div v-show="show" class="gy-dialog">
      <div class="gy-dialog-mask" @click="handleShow"></div>
      <div class="gy-dialog-content" :style="width ? { width: width } : {}">
        <div class="gy-dialog-header">
          <slot name="header">提示</slot>
          <div class="gy-dialog-close" @click="handleShow">x</div>
        </div>

        <div class="gy-dialog-body">
          <slot>内容</slot>
        </div>

        <div class="gy-dialog-footer">
          <slot name="footer">
            <gy-button type="primary" @click="handleShow">确定</gy-button>
            <gy-button type="default" @click="handleShow">取消</gy-button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped lang="scss">
  .dialog-fade-enter-active,
  .dialog-fade-leave-active {
    transition: opacity 0.3s;
  }

  .dialog-fade-enter,
  .dialog-fade-leave-to {
    opacity: 0;
  }

  .gy-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;

    .gy-dialog-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .gy-dialog-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      color: #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .gy-dialog-header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        .gy-dialog-close {
          position: absolute;
          right: 20px;
          cursor: pointer;
          font-size: 30px;
        }

        .gy-dialog-title {
          font-size: 20px;
          color: #333;
        }
      }

      .gy-dialog-body {
        margin-bottom: 20px;
      }

      .gy-dialog-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;

        .gy-button {
          margin: 0 10px;
        }
      }
    }
  }
</style>
