<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    cicle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['click']);

  const slots = defineSlots();

  const handleClick = (e: Event) => {
    emit('click', e);
  };
</script>
<script lang="ts">
  export default {
    name: 'GyButton',
  };
</script>
<template>
  <button
    class="gy-button"
    :class="[
      `gy-button-${props.type ? props.type.toString() : 'default'}`,
      {
        'is-plain': props.plain,
        'is-round': props.round,
        'is-circle': props.cicle,
        'is-disabled': props.disabled,
      },
    ]"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <i v-if="props.icon" :class="`gy-icon-${props.icon}`"></i>
    <span v-if="slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<style scoped lang="scss">
  .gy-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    height: 32px;
    padding: 4px 20px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    background-color: #fff;
    transition: 0.1s;
    &:hover {
      background-color: #f5f7fa;
    }

    &.gy-button-default {
      color: #606266;
      background-color: #fff;
      border-color: #dcdfe6;
      &:hover {
        background-color: #f5f7fa;
      }
    }

    &.gy-button-primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      &:hover {
        background-color: #66b1ff;
        border-color: #66b1ff;
      }
    }
    &.gy-button-success {
      color: #fff;
      background-color: #67c23a;
      border-color: #67c23a;
      &:hover {
        background-color: #85ce61;
        border-color: #85ce61;
      }
    }
    &.gy-button-warning {
      color: #fff;
      background-color: #e6a23c;
      border-color: #e6a23c;
      &:hover {
        background-color: #ebb563;
        border-color: #ebb563;
      }
    }
    &.gy-button-danger {
      color: #fff;
      background-color: #f56c6c;
      border-color: #f56c6c;
      &:hover {
        background-color: #f78989;
        border-color: #f78989;
      }
    }
    &.is-plain {
      color: #fff;
      background-color: transparent;
      border-color: rgba(255, 255, 255, 0.3);
      &:hover {
        background-color: #f5f7fa;
      }
      &.gy-button-primary {
        color: #409eff;
        background-color: rgba(64, 158, 255, 0.3);
        border-color: rgba(64, 158, 255, 0.6);
        &:hover {
          background-color: rgba(64, 158, 255, 0.5);
        }
      }
      &.gy-button-success {
        color: #67c23a;
        background-color: rgba(103, 194, 58, 0.3);
        border-color: rgba(103, 194, 58, 0.6);
        &:hover {
          background-color: rgba(103, 194, 58, 0.5);
        }
      }
      &.gy-button-warning {
        color: #e6a23c;
        background-color: rgba(230, 162, 60, 0.3);
        border-color: rgba(230, 162, 60, 0.6);
        &:hover {
          background-color: rgba(230, 162, 60, 0.5);
        }
      }
      &.gy-button-danger {
        color: #f56c6c;
        background-color: rgba(245, 108, 108, 0.3);
        border-color: rgba(245, 108, 108, 0.6);
        &:hover {
          background-color: rgba(245, 108, 108, 0.5);
        }
      }
    }
    &.is-round {
      border-radius: 20px;
    }
    &.is-circle {
      width: 32px;
      border-radius: 50%;
      padding: 8px;
    }
    &.is-disabled {
      cursor: not-allowed;
      color: #dfdfdf;
      background-color: #7a7a7a;
      border-color: #cecece;
    }
  }
</style>
