<template>
  <div class="site-aside-container">
    <div class="avatar">
      <Avatar
        url="https://avatars.githubusercontent.com/u/47231161?v=4"
        :size="100"
      />
    </div>
    <Menu />
    <Contact />
    <div class="footer">
      <p>© 2021 Gerry</p>
    </div>
  </div>
</template>

<script>
import Avatar from "../../components/Avatar/index.vue";
import Menu from "./Menu/index.vue";
import Contact from "./Contact/index.vue";
export default {
  name: "SiteAside",
  components: {
    Avatar,
    Menu,
    Contact,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="less" scoped>
@import "../../styles/var.less";
.site-aside-container {
  min-width: 250px;
  max-width: 250px;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;

  .avatar {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer {
    margin: 20px 0;
    color: @words;
  }
}
</style>
