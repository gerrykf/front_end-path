<template>
  <nav class="menu-container">
    <a
      v-for="item in menus"
      :key="item.link"
      :class="{ selected: isSelected(item) }"
      @click="goTo(item.link)"
    >
      <div>
        <Icon :name="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </a>
  </nav>
</template>
<script>
import "../../styles/var.less";
import Icon from "../Icon/index.vue";
export default {
  name: "Menu",
  components: {
    Icon,
  },
  data() {
    return {
      menus: [
        {
          link: "/",
          title: "首页",
          icon: "home",
        },
        {
          link: "/blog",
          title: "文章",
          icon: "about",
          startWith: true,
        },
        {
          link: "/about",
          title: "关于",
          icon: "about",
        },
        {
          link: "/empty",
          title: "空",
          icon: "empty",
        },
      ],
    };
  },
  computed: {},
  methods: {
    isSelected(item) {
      const link = item.link.toLowerCase();
      const curPathName = location.pathname.toLowerCase();
      if (item.startWith) {
        return curPathName.startsWith(link);
      } else {
        return curPathName === link;
      }
    },
    goTo(path) {
      location.href = path;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../styles/var.less";
.menu-container {
  color: @gray;
  width: 100%;
  a {
    display: flex;
    align-items: center;
    padding: 0px 50px;
    height: 45px;
    div {
      margin-right: 10px;
    }
    &.selected {
      background-color: @primary;
      color: @white;
      cursor: pointer;
    }
  }
}
</style>
