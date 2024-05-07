var user1 = {
  name: "zhangsan",
  address: {
    city: "beijing",
    province: "beijing",
  },
  loves: ["eat", "drink", "play"],
};

var address = user1.address;

address.city = "shanghai";
console.log(user1.address.city);

address = {
  city: "shenzhen",
  province: "guangdong",
};

console.log(address.city, user1.address.city);

const data = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    id: i,
    name: `name${i}`,
    age: Math.floor(Math.random() * 100),
    address: `address${i}`,
  });
}

/**
 * 判断数组中是否包含某个元素
 * @param {Array} arr
 * @param {*} target
 */
function includes(arr, target) {
  let isFind = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      isFind = true;
      break;
    }
  }
  return isFind;
}

/**
 * 修改对象，仅保留需要的属性
 * @param {Object} obj
 * @param {Array<string>} keys
 */
function pick(obj, keys) {
  for (const key in obj) {
    if (!includes(keys, key)) {
      delete obj[key];
    }
  }
}

const obj = {
  name: "zhangsan",
  age: 20,
  address: "beijing",
};

pick(obj, ["name", "age"]);

console.log(obj);
