<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BlogItem } from "../types";
import { get } from "@/utils/http";
import { timestampToTime } from "@/utils/tools";
import { ElTable, ElTableColumn, ElInput, ElButton } from "element-plus";

defineOptions({
  name: "Admin",
});

const tableData = ref<BlogItem[]>([]);
const searchValue = ref("");

const fetchData = async () => {
  const res = await get("/api/blog/list?isadmin=1", {
    params: {
      keyword: searchValue.value,
    },
  });
  if (res.errno === 0) {
    tableData.value = res.data;
  }
};

const handleEdit = (row: BlogItem) => {
  console.log(row);
};

const handleDelete = (row: BlogItem) => {
  console.log(row);
};

onMounted(() => {
  fetchData();
});
</script>
<template>
  <div>
    <h1>管理中心</h1>
    <div class="admin-list-conatiner">
      <div class="search-container">
        <el-input
          v-model="searchValue"
          style="width: 240px"
          placeholder="请输入标题"
          clearable
        />
        <el-button type="primary" @click="fetchData">搜索</el-button>
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
            <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss">
.admin-list-conatiner {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

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
