<script setup lang="ts">
import { onMounted, ref } from "vue";
import { get } from "@/utils/http";
import { timestampToTime } from "@/utils/tools";
import { BlogItem } from "../types";
import { ElTable, ElTableColumn, ElInput, ElButton } from "element-plus";
import Details from "../components/Details.vue";

const list = ref<BlogItem[]>([]);
const selectedBlog = ref<BlogItem>({} as BlogItem);
const showDetails = ref(false);

const fetchData = async () => {
  const res = await get("/api/blog/list");
  console.log("res:", res);
  if (res.errno === 0) {
    list.value = res.data;
  }
};

const handleShowDetails = (item: BlogItem) => {
  selectedBlog.value = item;
  showDetails.value = true;
};

onMounted(() => {
  fetchData();
});
</script>
<template>
  <div>
    <h1>列表界面</h1>
    <!-- 写一段个人博客的列表 -->
    <div class="list-container">
      <div class="list-item" v-for="item in list" :key="item.id">
        <h2>
          标题：
          <span @click="handleShowDetails(item)">{{ item.title }}</span>
        </h2>
        <p>内容：{{ item.content }}</p>
        <p>作者：{{ item.author }}</p>
        <p>创建时间：{{ timestampToTime(item.createtime) }}</p>
      </div>
    </div>
  </div>

  <Details v-model:show="showDetails" :blogItem="selectedBlog" />
</template>
<style scoped lang="scss">
.list-container {
  display: flex;
  flex-wrap: wrap;

  .list-item {
    width: 30%;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    h2 {
      font-size: 20px;
      margin: 0;
      span {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    p {
      margin: 5px 0;
    }

    p:last-child {
      color: #999;
    }

    &:hover {
      box-shadow: 0 0 10px #ccc;
    }

    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
