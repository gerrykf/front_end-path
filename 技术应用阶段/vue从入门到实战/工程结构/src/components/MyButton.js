var myButton = {
  // 组件的数据必须是一个函数(是为了避免组件之间的数据共享，因为data返回的是一个对象，对象是引用类型，每次使用这个组件时都是返回的新对象)
  data: function () {
    return {
      count: 0,
    };
  },
  template: '<button @click="count++">你点击了{{ count }}次</button>',
};

export default myButton;
