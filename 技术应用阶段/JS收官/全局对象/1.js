var module1 = (function () {
  var a = 1;
  var b = 2;
  function c() {
    console.log(a + b);
  }

  return {
    b: b,
    c: c,
  };
})();
