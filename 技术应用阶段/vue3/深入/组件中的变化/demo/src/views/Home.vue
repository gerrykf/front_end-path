<script>
import { ref } from "vue";
import { getAsyncComponent } from "../utils";
import Modal from "../components/Modal.vue";

const Block3 = getAsyncComponent("Block3");
const Block5 = getAsyncComponent("Block5");

export default {
  name: "Home",
  components: {
    Block3,
    Block5,
    Modal,
  },
  setup() {
    const show = ref(false);

    const handleClick = () => {
      show.value = !show.value;
    };
    return { show, handleClick };
  },
};
</script>
<template>
  <div class="home-container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="handleClick">打开蒙层</button>
      </p>
      <Teleport to="body">
        <Modal v-if="show">
          这是一个蒙层

          <button @click="show = false">关闭</button>
        </Modal>
      </Teleport>
    </div>
    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <div class="block big"><Block3 /></div>
    <div class="block big">区域4</div>
    <div class="block mid"><Block5 /></div>
    <div class="block"><h2>区域6</h2></div>
  </div>
</template>
<style scoped>
.home-container {
  display: flex;
  width: 800px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}

.block {
  width: 100px;
  height: 150px;
  margin: 20px 0;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  box-shadow: 0 0 10px #c3c3c3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mid {
  width: 150px;
}
.big {
  width: 200px;
}
</style>
