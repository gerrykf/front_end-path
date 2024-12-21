export default {
  proxy: {
    "/api": {
      target:
        "http://127.0.0.1:5501/%E6%8A%80%E6%9C%AF%E5%BA%94%E7%94%A8%E9%98%B6%E6%AE%B5/vue3/%E6%B7%B1%E5%85%A5/CompositionAPI/demo/mock/",
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
};
