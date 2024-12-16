<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BlogItem } from "../types";
import { get, post } from "@/utils/http";
import { timestampToTime } from "@/utils/tools";
import {
  ElTable,
  ElTableColumn,
  ElInput,
  ElButton,
  ElMessage,
} from "element-plus";
import BlogForm from "./components/Form.vue";

defineOptions({
  name: "Admin",
});

const tableData = ref<BlogItem[]>([]);
const blogObj = ref<BlogItem | undefined>(undefined);
const searchValue = ref("");
const showForm = ref(false);

const fetchData = async () => {
  const res = await get("/api/blog/list?isadmin=1", {
    params: {
      keyword: searchValue.value,
    },
  });
  if (res.errno === 0) {
    tableData.value = res.data;
  } else {
    ElMessage({
      message: res.message,
      type: "error",
    });
  }
};

const openAdd = () => {
  showForm.value = true;
  blogObj.value = undefined;
};

const openEdit = (row: BlogItem) => {
  console.log(row);
  showForm.value = true;
  blogObj.value = row;
};

const handleAdd = async (row: BlogItem) => {
  delete row.id;
  const res = await post("/api/blog/new", row);
  if (res.errno === 0) {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    fetchData();
  }
};

const handleEdit = async (row: BlogItem) => {
  const res = await post("/api/blog/update", row, {
    params: {
      id: row.id,
    },
  });
  if (res.errno === 0) {
    ElMessage({
      message: "编辑成功",
      type: "success",
    });
    fetchData();
  }
};

const handleDelete = (row: BlogItem) => {
  confirm("确认删除吗？") &&
    post("/api/blog/del", null, { params: { id: row.id } }).then((res) => {
      if (res.errno === 0) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        fetchData();
      }
    });
};

onMounted(() => {
  fetchData();
});
</script>
<template>
  <div>
    <h1>管理中心</h1>
    <div class="admin-list-conatiner">
      <div class="operation">
        <div class="search-container">
          <el-input
            v-model="searchValue"
            style="width: 240px"
            placeholder="请输入标题"
            clearable
          />
          <el-button type="primary" @click="fetchData">搜索</el-button>
        </div>
        <el-button type="primary" @click="openAdd">新增</el-button>
      </div>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50" />
        <el-table-column prop="title" label="标题" width="100" />
        <el-table-column prop="content" label="内容" width="180" />
        <el-table-column prop="author" label="作者" width="100" />
        <el-table-column prop="createtime" label="创建时间" width="180">
          <template #default="{ row }">
            <span>{{ timestampToTime(row.createtime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createtime" label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" @click="openEdit(row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <BlogForm
    v-model:show="showForm"
    :blog="blogObj"
    @handle-add="handleAdd"
    @handle-edit="handleEdit"
  />
</template>
<style scoped lang="scss">
.admin-list-conatiner {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .el-table {
    margin-top: 20px;
  }

  .el-button {
    margin-right: 10px;
  }

  .el-input {
    margin-right: 10px;
  }

  .el-table-column {
    display: flex;
    align-items: center;
  }

  .el-table-column__header {
    display: flex;
    align-items: center;
  }

  .el-table-column__header .cell {
    display: flex;
    align-items: center;
  }

  .el-table-column__header .cell .el-icon {
    margin-left: 5px;
  }

  .el-table-column__header .cell .el-icon-arrow-up {
    margin-top: 5px;
  }

  .el-table-column__header .cell .el-icon-arrow-down {
    margin-bottom: 5px;
  }

  .el-table-column__header .cell .el-icon-arrow-up,
  .el-table-column__header .cell .el-icon-arrow-down {
    cursor: pointer;
  }

  .el-table-column__header .cell .el-icon-arrow-up.active,
  .el-table-column__header .cell .el-icon-arrow-down.active {
    color: #409eff;
  }
}
.search-container {
  display: flex;
  justify-content: start;
  margin-bottom: 20px;

  .el-input {
    margin-right: 10px;
  }

  .el-button {
    margin-right: 10px;
  }

  .el-button:last-child {
    margin-right: 0;
  }

  .el-input {
    width: 240px;
  }

  .el-button {
    width: 80px;
  }

  .el-button {
    margin-right: 10px;
  }

  .el-button:last-child {
    margin-right: 0;
  }
}
</style>
