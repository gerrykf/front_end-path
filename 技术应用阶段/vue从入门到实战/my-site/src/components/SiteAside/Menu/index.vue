<template>
  <nav class="menu-container">
    <RouterLink
      :exact="item.exact"
      :to="item.link"
      active-class="selected"
      v-for="item in menus"
      :key="item.link"
    >
      <div>
        <Icon :name="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>
<script>
import "../../../styles/var.less";
import Icon from "../../Icon/index.vue";
export default {
  name: "Menu",
  components: {
    Icon,
  },
  data() {
    return {
      menus: [
        {
          name: "home",
          link: "/",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "blog",
          link: "/blog/123",
          title: "文章",
          icon: "about",
          exact: false, // 严格匹配
        },
        {
          name: "about",
          link: "/about",
          title: "关于",
          icon: "about",
          exact: true,
        },
        {
          name: "empty",
          link: "/empty",
          title: "空",
          icon: "empty",
          exact: true,
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
      this.$router.push(path);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../styles/var.less";
.menu-container {
  color: @gray;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    padding: 0px 50px;
    height: 45px;
    &.selected {
      background-color: @primary;
      color: @white;
      cursor: pointer;
      transform: all 0.3s;
    }
    div {
      margin-right: 10px;
    }
  }
}
</style>
