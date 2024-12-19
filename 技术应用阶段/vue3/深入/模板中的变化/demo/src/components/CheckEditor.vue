<script>
export default {
  name: "CheckEditor",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: String,
    titleModifiers: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    console.log(props.titleModifiers);
    const handleChecked = (e) => {
      emit("update:modelValue", !props.modelValue);
    };

    const handleTextChange = (e) => {
      let value = e.target.value;
      if (props.titleModifiers.trim) {
        value = value.trim();
      }
      emit("update:title", value);
    };

    return {
      handleChecked,
      handleTextChange,
    };
  },
};
</script>
<template>
  <div class="check-editor">
    <div class="check-editor-inner">
      <!-- <div class="checkbox checked"></div> -->
      <div
        :class="['checkbox', { checked: modelValue }]"
        @click="handleChecked"
      ></div>
      <input
        type="text"
        class="editor"
        :value="title"
        @change="handleTextChange"
      />
    </div>
  </div>
</template>
<style scoped>
.check-editor {
  cursor: pointer;
}

.check-editor-inner {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 10px;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox.checked,
.checkbox:hover {
  background-color: white;
}

.checkbox.checked::after {
  content: "";
  width: 10px;
  height: 10px;
  background-color: #1f7fed;
  border-radius: 2px;
}

.editor {
  border: none;
  outline: none;
  margin-left: 5px;
  border-bottom: 1px solid #e2e2e2;
  font-size: inherit;
}
</style>
