## 快速搭建服务器

使用 json-server 快速搭建服务器

```shell
npm install json-server
```

创建一个 db.json 文件

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

在 package.json 中添加一个脚本

```json
"scripts": {
  "server": "json-server --watch db.json"
}
```

## 快速搭建模板

https://v3.bootcss.com/examples/starter-template/
