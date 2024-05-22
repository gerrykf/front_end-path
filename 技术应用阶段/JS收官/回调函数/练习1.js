const students = [
  {
    id: 76260,
    name: "学生0",
    sex: "女",
    age: 15,
    address: "地址0",
    tel: "13591649358",
  },
  {
    id: 510854,
    name: "学生1",
    sex: "男",
    age: 12,
    address: "地址1",
    tel: "13573107466",
  },
  {
    id: 949498,
    name: "学生2",
    sex: "女",
    age: 14,
    address: "地址2",
    tel: "13513844246",
  },
  {
    id: 122023,
    name: "学生3",
    sex: "女",
    age: 18,
    address: "地址3",
    tel: "13527140743",
  },
  {
    id: 66789,
    name: "学生4",
    sex: "女",
    age: 18,
    address: "地址4",
    tel: "13538786437",
  },
  {
    id: 512611,
    name: "学生5",
    sex: "男",
    age: 19,
    address: "地址5",
    tel: "13506383266",
  },
  {
    id: 876093,
    name: "学生6",
    sex: "女",
    age: 17,
    address: "地址6",
    tel: "13553396152",
  },
  {
    id: 173810,
    name: "学生7",
    sex: "女",
    age: 10,
    address: "地址7",
    tel: "13568352619",
  },
  {
    id: 182351,
    name: "学生8",
    sex: "女",
    age: 10,
    address: "地址8",
    tel: "13539695918",
  },
  {
    id: 421929,
    name: "学生9",
    sex: "女",
    age: 15,
    address: "地址9",
    tel: "13525642484",
  },
  {
    id: 977826,
    name: "学生10",
    sex: "女",
    age: 15,
    address: "地址10",
    tel: "13567511932",
  },
  {
    id: 818005,
    name: "学生11",
    sex: "男",
    age: 19,
    address: "地址11",
    tel: "13566408544",
  },
  {
    id: 791624,
    name: "学生12",
    sex: "男",
    age: 13,
    address: "地址12",
    tel: "13559924120",
  },
  {
    id: 836469,
    name: "学生13",
    sex: "女",
    age: 10,
    address: "地址13",
    tel: "13501047791",
  },
  {
    id: 49887,
    name: "学生14",
    sex: "男",
    age: 11,
    address: "地址14",
    tel: "13534688206",
  },
  {
    id: 225679,
    name: "学生15",
    sex: "女",
    age: 15,
    address: "地址15",
    tel: "13553199070",
  },
  {
    id: 686682,
    name: "学生16",
    sex: "男",
    age: 14,
    address: "地址16",
    tel: "13587596811",
  },
  {
    id: 244650,
    name: "学生17",
    sex: "女",
    age: 17,
    address: "地址17",
    tel: "13575757622",
  },
  {
    id: 10164,
    name: "学生18",
    sex: "女",
    age: 10,
    address: "地址18",
    tel: "13537709677",
  },
  {
    id: 100619,
    name: "学生19",
    sex: "女",
    age: 14,
    address: "地址19",
    tel: "13508526429",
  },
];
// 获取为女性的学生
var result = [];
for (var i = 0; i < students.length; i++) {
  if (students[i].sex === "女") {
    result.push(students[i]);
  }
}
console.log(result);

// 获取年龄小于25岁的女性学生
var result = [];
for (var i = 0; i < students.length; i++) {
  if (students[i].sex === "女" && students[i].age < 25) {
    result.push(students[i]);
  }
}
console.log(result);

/**
 * 上面的代码有很多重复的部分，我们可以将这些重复的部分提取出来，封装成一个函数
 */
function filter(students, cb) {
  var result = [];
  for (var i = 0; i < students.length; i++) {
    // cb是一个回调函数，这个函数的返回值是一个布尔值
    if (cb(students[i])) {
      result.push(students[i]);
    }
  }
  return result;
}

// 获取为女性的学生
var stus = filter(students, function (student) {
  return student.sex === "女";
});

console.log(stus);

// 获取年龄小于25岁的女性学生
var stus = filter(students, function (student) {
  return student.sex === "女" && student.age < 25;
});
