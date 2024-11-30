<template>
  <div class="pager-container" v-if="pageNumber > 0">
    <a :class="{ disabled: current === 1 }" @click="handleClick(1)">
      |&lt;&lt;
    </a>
    <a :class="{ disabled: current === 1 }" @click="handleClick(current - 1)">
      &lt;&lt;
    </a>
    <a
      v-for="n in numbers"
      :key="n"
      :class="{ active: current === n }"
      @click="handleClick(n)"
    >
      {{ n }}
    </a>
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(current + 1)"
    >
      &gt;&gt;
    </a>
    <a
      :class="{ disabled: current === pageNumber }"
      @click="handleClick(pageNumber)"
    >
      &gt;&gt;|
    </a>
  </div>
</template>
<script>
export default {
  name: "Pager",
  props: {
    current: {
      type: Number,
      default: 1,
    },
    /** 总条数 */
    total: {
      type: Number,
      default: 0,
    },
    /** 页容量 */
    limit: {
      type: Number,
      default: 10,
    },
    /** 可见页码数 */
    visibleNumber: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
        return;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
        return;
      }
      if (newPage === this.current) return;
      this.$emit("pageChange", newPage);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";

.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 5px;
    font-family: cursive;
    user-select: none;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @dark;
      font-weight: bold;
    }
  }
}
</style>
