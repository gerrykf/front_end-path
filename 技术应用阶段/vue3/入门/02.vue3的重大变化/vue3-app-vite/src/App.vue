<template>
  <p>
    <button @click="increment">count:{{ count }}</button>
  </p>
</template>

<script>
export default {
  data: () => ({
    count: 0,
  }),
  methods: {
    increment() {
      this.count++;
      console.log(this);
    },
  },
};
</script>
