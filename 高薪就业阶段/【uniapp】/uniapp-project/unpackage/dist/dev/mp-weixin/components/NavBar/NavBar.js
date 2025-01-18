"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "NavBar",
  setup(__props) {
    const statusHeight = common_vendor.ref(20);
    const getSystemInfo = async () => {
      const systemInfo = await common_vendor.index.getSystemInfo();
      common_vendor.index.__f__("log", "at components/NavBar/NavBar.vue:26", systemInfo);
      systemInfo.statusBarHeight && (statusHeight.value = systemInfo.statusBarHeight);
      common_vendor.index.__f__("log", "at components/NavBar/NavBar.vue:28", statusHeight.value);
    };
    common_vendor.onMounted(() => {
      getSystemInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: statusHeight.value + "rpx",
        b: common_vendor.p({
          type: "search",
          color: "#999"
        })
      };
    };
  }
});
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/NavBar/NavBar.js.map
