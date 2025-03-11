<template>
  <button
    class="gy-button"
    :class="[
      `gy-button-${type}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
      },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <i v-if="icon" :class="`gy-icon-${icon}`"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
// 接收一组props属性
defineProps({
  type: {
    type: String,
    default: 'default',
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
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
})

const emit = defineEmits(['click'])

function handleClick(e: Event) {
  emit('click', e)
}
</script>
<script lang="ts">
export default {
  name: 'GyButton',
}
</script>

<style lang="scss" scoped>
.gy-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  color: #606266;
  appearance: none;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;

  &:hover,
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}

.gy-button-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;

  &:hover,
  &:focus {
    background: #66b1ff;
    background-color: #66b1ff;
    color: #fff;
  }
}

.gy-button-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;

  &:hover,
  &:focus {
    background: #85ce61;
    background-color: #85ce61;
    color: #fff;
  }
}

.gy-button-info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;

  &:hover,
  &:focus {
    background: #a6a9ad;
    background-color: #a6a9ad;
    color: #fff;
  }
}

.gy-button-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;

  &:hover,
  &:focus {
    background: #ebb563;
    background-color: #ebb563;
    color: #fff;
  }
}

.gy-button-danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;

  &:hover,
  &:focus {
    background: #f78989;
    background-color: #f78989;
    color: #fff;
  }
}

.gy-button.is-plain {
  &:hover,
  &:focus {
    background: #fff;
    border-color: #489eff;
    color: #409eff;
  }
}

.gy-button-primary.is-plain {
  color: #409eff;
  background: #ecf5ff;

  &:hover,
  &:focus {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}

.gy-button-success.is-plain {
  color: #67c23a;
  background: #c2e7b0;

  &:hover,
  &:focus {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }
}

.gy-button-info.is-plain {
  color: #909399;
  background: #d3d4d6;

  &:hover,
  &:focus {
    background: #909399;
    border-color: #909399;
    color: #fff;
  }
}

.gy-button-warning.is-plain {
  color: #e6a23c;
  background: #f5dab1;

  &:hover,
  &:focus {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }
}

.gy-button-danger.is-plain {
  color: #f56c6c;
  background: #fbc4c4;

  &:hover,
  &:focus {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }
}

.gy-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}

.gy-button.is-circle {
  border-radius: 50%;
  padding: 12px;
}

.gy-button.is-disabled,
.gy-button.is-disabled:focus,
.gy-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}

.gy-button.is-disabled,
.gy-button.is-disabled:focus,
.gy-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}

.gy-button--primary.is-disabled,
.gy-button--primary.is-disabled:active,
.gy-button--primary.is-disabled:focus,
.gy-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #a0cfff;
  border-color: #a0cfff;
}

.gy-button--success.is-disabled,
.gy-button--success.is-disabled:active,
.gy-button--success.is-disabled:focus,
.gy-button--success.is-disabled:hover {
  color: #fff;
  background-color: #b3e19d;
  border-color: #b3e19d;
}

.gy-button--info.is-disabled,
.gy-button--info.is-disabled:active,
.gy-button--info.is-disabled:focus,
.gy-button--info.is-disabled:hover {
  color: #fff;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
}

.gy-button--warning.is-disabled,
.gy-button--warning.is-disabled:active,
.gy-button--warning.is-disabled:focus,
.gy-button--warning.is-disabled:hover {
  color: #fff;
  background-color: #f3d19e;
  border-color: #f3d19e;
}

.gy-button--danger.is-disabled,
.gy-button--danger.is-disabled:active,
.gy-button--danger.is-disabled:focus,
.gy-button--danger.is-disabled:hover {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}

.gy-button [class*='gy-icon-'] + span {
  margin-left: 5px;
}
</style>
