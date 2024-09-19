<template>
  <div>
    <Pager
      :current="current"
      :limit="pageSize"
      :total="total"
      @pageChange="handlePageChange($event)"
    />
  </div>
</template>

<script>
import Pager from "./index.vue";

export default {
  name: "Test",
  components: {
    Pager,
  },
  data() {
    return {
      current: 1,
      pageSize: 20,
      total: 200,
    };
  },
  methods: {
    handlePageChange(page) {
      this.current = page;
      console.log("请求当前页数据", page);
    },
  },
};
</script>
