<script setup lang="ts">
import { ElDialog, ElDescriptions, ElDescriptionsItem } from "element-plus";
import { ref, watch } from "vue";
import { timestampToTime } from "@/utils/tools";
import { BlogItem } from "../types";

const props = defineProps<{
  show: boolean;
  blogItem: BlogItem;
}>();

const emit = defineEmits<{
  "update:show": [value: boolean];
}>();

const localShow = ref(props.show);

watch(
  () => props.show,
  (newVal) => {
    localShow.value = newVal;
  }
);

const descriptions = [
  {
    label: "标题",
    value: props.blogItem.title,
  },
  {
    label: "内容",
    value: props.blogItem.content,
  },
  {
    label: "作者",
    value: props.blogItem.author,
  },
  {
    label: "创建时间",
    value: props.blogItem.createtime,
  },
];

const close = () => {
  emit("update:show", false);
  localShow.value = false;
};
</script>
<template>
  <el-dialog title="详情" v-model="localShow" :border="true" @close="close">
    <el-descriptions :items="descriptions">
      <el-descriptions-item label="标题">
        {{ blogItem.title }}
      </el-descriptions-item>
      <el-descriptions-item label="内容">
        {{ blogItem.content }}
      </el-descriptions-item>
      <el-descriptions-item label="作者">
        {{ blogItem.author }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ timestampToTime(blogItem.createtime) }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
