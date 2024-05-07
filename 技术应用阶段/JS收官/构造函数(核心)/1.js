var person = {
  firstName: "Bill",
  lastName: "Gates",
  //   fullName:person.firstName + " " + person.lastName, // 此时persion=undefined 还未赋值当前对象
  sayHi: function () {
    return console.log(person.fullName);
  },
};

person.fullName = person.firstName + " " + person.lastName;

person.sayHi(); // Bill Gates

// 上面的代码创建多个人的对象时，就会创建多个对象，这样会占用更多的内存空间，而且代码也不容易维护。--------------------------

function createPerson(firstName, lastName) {
  var obj = {};
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.fullName = firstName + " " + firstName;
  obj.sayHi = function () {
    return console.log(obj.fullName);
  };

  return obj;
}

var person1 = createPerson("Bill", "Gates");
person1.sayHi(); // Bill Gates
var person2 = createPerson("Steve", "Jobs");
person2.sayHi(); // Steve Jobs

// 把createPerson 改造成一个构造函数--------------------------

// 构造函数的名称首字母大写
function Person(firstName, lastName) {
  // var this = {};// 隐式创建

  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = firstName + " " + lastName;
  this.sayHi = function () {
    return console.log(this.fullName);
  };

  // return this;// 隐式返回
}

var person1 = new Person("Bill", "Gates");
person1.sayHi(); // Bill Gates
var person2 = new Person("Steve", "Jobs");
person2.sayHi(); // Steve Jobs
