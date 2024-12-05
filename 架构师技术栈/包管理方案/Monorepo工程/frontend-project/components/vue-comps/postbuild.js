// 将打包后 public 里面的资源删除
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// 获取当前文件的路径
const __dirname = dirname(fileURLToPath(import.meta.url));

const imgPath = path.resolve(__dirname, 'dist/images');
const faviconFile = path.resolve(__dirname, 'dist/favicon.ico');

// 删除 images 文件夹
if (fs.existsSync(imgPath)) {
  fs.rmdirSync(imgPath, { recursive: true });
  console.log('images folder removed', imgPath);
} else {
  console.log('images folder not exist');
}

// 删除 favicon.ico 文件
if (fs.existsSync(faviconFile)) {
  fs.unlinkSync(faviconFile);
  console.log('favicon.ico removed');
} else {
  console.log('favicon.ico not exist');
}
