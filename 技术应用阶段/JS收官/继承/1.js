function inherit(Child, Parent) {
  /**
   * Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
   */
  Object.setPrototypeOf(Child.prototype, Parent.prototype); // 继承User的原型
  // 继承User的原型
}

function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.playFreeVideo = function () {
  console.log("观看免费视频,偶尔跳出广告");
};

function VipUser(name, age, level) {
  // 使用call 改变this指向 将this指向ViPUser
  User.call(this, name, age);
  this.level = level;
}

inherit(VipUser, User);

VipUser.prototype.playFreeVideo = function () {
  console.log("观看免费视频时去除广告");
};

VipUser.prototype.playPayVideo = function () {
  console.log("观看付费视频");
};

var user = new User("张三", 20);
console.log(user);
user.playFreeVideo();

var vipUser = new VipUser("张三", 20, 3);

console.log(vipUser);
vipUser.playFreeVideo();
vipUser.playPayVideo();
