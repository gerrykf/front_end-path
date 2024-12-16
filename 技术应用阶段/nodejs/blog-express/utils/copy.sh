#!/bin/sh
# 到指定目录
cd D:/LearnFolder/front_end-path/技术应用阶段/nodejs/blog-1/logs
# 复制文件 并重命名 为当前日期  
cp access.log $(date +%Y-%m-%d).access.log
# 清空文件
echo "" > access.log