// 将打包后 public 里面的资源删除掉

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// 获取当前文件所在的目录
const __dirname = dirname(fileURLToPath(import.meta.url))

// 定义要删除的目录和文件
const imagesDir = path.resolve(__dirname, 'dist/images')
const faviconFile = path.resolve(__dirname, 'dist/favicon.ico')

// 删除 dist/images 目录
if (fs.existsSync(imagesDir)) {
  fs.rmSync(imagesDir, { recursive: true, force: true })
  console.log('Deleted directory: ', imagesDir)
} else {
  console.log('No images directory to delete.')
}

// 删除 dist/favicon.ico 文件
if (fs.existsSync(faviconFile)) {
  fs.unlinkSync(faviconFile)
  console.log('Deleted file: ', faviconFile)
} else {
  console.log('No favicon.ico file to delete.')
}
