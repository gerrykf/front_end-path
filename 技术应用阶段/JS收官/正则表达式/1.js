var reg = /^.+@[^\s\.]+(\.[^\s\.]+){1,2}$/;

var reg2 = /^[1-9]\d*$/;

var reg3 = /^([1-9]\d*|([1-9]\d*|0).\d{1,2})$/;

var str = "abcabcabc";

console.log(reg.test(str)); // true

var newStr = str.replace(reg, "A");
console.log(newStr); // AbcAbcAbc

/**
 * [] 匹配方括号内的任意一个字符
 * [^] 匹配方括号内的任意一个字符之外的字符
 * \. 匹配点号
 * \/ 匹配斜杠
 * \\ 匹配反斜杠
 * \d 匹配数字 [0-9]
 * \D 匹配非数字 [^0-9]
 * \w 匹配单词字符 [a-zA-Z0-9_]
 * \W 匹配非单词字符 [^a-zA-Z0-9_]
 * \s 匹配空白字符 [ \t\n\x0B\f\r]
 * \S 匹配非空白字符 [^ \t\n\x0B\f\r]
 * /^/ 匹配字符串的开始位置
 * /$/ 匹配字符串的结束位置
 *
 */
