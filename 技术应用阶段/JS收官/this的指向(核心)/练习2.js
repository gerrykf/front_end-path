function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = firstName + " " + lastName;
}

// 能否不使用new 来创建用户
var u1 = new User("张", "三");
console.log(u1.fullName);

// 解决
var u2 = {};
User.call(u2, "李", "四");
console.log(u2.fullName);
