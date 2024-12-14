<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElDialog,
  ElMessage,
} from "element-plus";
import { BlogItem } from "@/views/types";

const props = defineProps<{
  show: boolean;
  blog?: BlogItem;
}>();

const emit = defineEmits<{
  "update:show": [value: boolean];
  handleAdd: [row: BlogItem];
  handleEdit: [row: BlogItem];
}>();

const localShow = ref(props.show);
const form = ref({
  title: "",
  content: "",
});

watch(
  () => props.blog,
  (val) => {
    if (val) {
      form.value.title = val.title || "";
      form.value.content = val.content || "";
    }
  },
  {
    deep: true,
  }
);

const close = () => {
  emit("update:show", false);
  resetForm();
  localShow.value = false;
};

watch(
  () => props.show,
  (val) => {
    localShow.value = val;
  }
);

const rules = ref({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
});
const submitForm = async () => {
  if (!form.value.title || !form.value.content) {
    ElMessage.error("请填写完整");
    return;
  }
  if (props.blog?.id) {
    emit("handleEdit", { ...form.value, id: props.blog.id });
  } else {
    emit("handleAdd", form.value);
  }
  close();
};

const resetForm = () => {
  form.value.title = "";
  form.value.content = "";
};

onMounted(() => {
  resetForm();
});
</script>
<template>
  <el-dialog
    :title="blog ? '编辑' : '新增'"
    :model-value="localShow"
    width="50%"
    @close="close"
    destroy-on-close
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          v-model="form.content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
