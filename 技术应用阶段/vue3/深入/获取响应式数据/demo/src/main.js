import { reactive, ref, watchEffect, readonly } from "vue";

const state = reactive({
  a: 0,
  b: 1,
});

window.state = state;

const imState = readonly(state);
window.imState = imState;
