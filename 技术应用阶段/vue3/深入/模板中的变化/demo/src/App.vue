<template>
  <div class="container">
    <div class="list">
      <strong>编辑：</strong>
      <div class="list">
        <CheckEditor
          v-for="item in products"
          :key="item.id"
          v-model="item.sell"
          v-model:title="item.title"
        />
      </div>
    </div>
    <div class="list">
      <strong>销售中：</strong>
      <div>
        <template v-for="(item, index) in sellings">
          <span>{{ index + 1 }}</span>
          <strong>{{ item.title }}</strong>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import CheckEditor from "./components/CheckEditor.vue";

export default {
  name: "App",
  components: {
    CheckEditor,
  },
  setup() {
    const checked = ref(false);
    const title = ref("");

    const defaultSells = [
      {
        id: 1,
        sell: false,
        title: "iphone",
      },
      { id: 2, sell: true, title: "ipad" },
    ];

    const products = ref(defaultSells);
    const sellings = computed(() => {
      return products.value.filter((item) => item.sell);
    });
    return {
      checked,
      title,
      products,
      sellings,
    };
  },
};
</script>
<style scoped>
.container {
  width: 800px;
  margin-top: 50px;
  margin: 50 auto;
}
.list {
  display: flex;
  align-items: center;
  margin: 1em 0;
}
strong {
  margin-right: 1em;
}
</style>
