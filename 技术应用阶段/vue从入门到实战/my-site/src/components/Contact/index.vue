<template>
  <ul class="contact-container">
    <li>
      <a href="">
        <div class="icon">
          <Icon name="home" />
        </div>
        <span>231231231</span>
      </a>
      <div class="pop">
        <img
          src="https://ai.bdstatic.com/file/1E862211BBC64890A993557E222A4A57"
          alt=""
        />
      </div>
    </li>
    <li>
      <a href="">
        <div class="icon">
          <Icon name="about" />
        </div>
        <span>gerrymail@gmail.com</span>
      </a>
      <div class="pop">
        <img
          src="https://ai.bdstatic.com/file/1E862211BBC64890A993557E222A4A57"
          alt=""
        />
      </div>
    </li>
  </ul>
</template>
<script>
import Icon from "../Icon/index.vue";
export default {
  name: "Contact",
  components: {
    Icon,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.contact-container {
  width: 100%;
  height: 300px;
  background-color: transparent;
  list-style: none;
  padding: 0;
  @itemHeight: 30px;
  li {
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    cursor: pointer;
    position: relative;
    padding: 0 5px;
    &:hover .pop {
      display: block;
      transform: scaleY(1);
    }
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
  }
  .icon {
    width: @itemHeight;
    height: @itemHeight;
    font-size: 20px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: aliceblue;
    .icon-container {
      font-size: 20px !important;
    }
  }
  .pop {
    position: absolute;
    width: 150px;
    height: 150px;
    line-height: 150px;
    background-color: #fff;
    top: -150px;
    left: 10%;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: scaleY(0);
    transition: transform 0.3s;
    transform-origin: bottom;

    img {
      width: 140px;
      height: 140px;
      object-fit: cover;
      display: inline;
    }
    // 三角形 从上到下
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-top-color: #fff;
      top: 150px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
