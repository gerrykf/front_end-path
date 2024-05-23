var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
img1.onload = () => {
  console.log("图片加载完成 onload");
  img1.style.display = "block";
  setTimeout(() => {
    img2.style.display = "block";
  }, 3000);
};
