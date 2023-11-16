#!/usr/bin/env node
import fs from 'fs/promises';
import  path from 'path';
import { exec } from 'child_process';
import {convertTagToJs} from './fileparse/fileparse.js'

// 获取命令行参数，假设 a.tag 是第一个参数
const scriptPath = process.argv[2];

// 如果没有提供脚本路径，输出错误信息并退出
if (!scriptPath) {
  console.error('Usage: qzingui <script_path>');
  process.exit(1);
}
// 将相对路径解析为绝对路径
const absoluteScriptPath = path.resolve(process.cwd(), scriptPath);
console.log(absoluteScriptPath)

// 使用 fs.promises.stat 获取文件的状态信息
fs.stat(absoluteScriptPath)
  .then(stats => {
    // 如果是文件，则继续处理
    if (stats.isFile()) {
      return absoluteScriptPath ;
    } else {
      throw new Error('Provided path is not a file.');
    }
  })
  .then(absoluteScriptPath => {
    // 将脚本内容写入同名的 .js 文件
    const jsFilePath = path.join(path.dirname(absoluteScriptPath), `${path.basename(absoluteScriptPath, '.tag')}.js`);
    
     convertTagToJs(absoluteScriptPath,jsFilePath);
     return jsFilePath;
  })
  .then(jsFilePath => {
    console.log(jsFilePath);
    // 执行 qzingui 命令
    const qzinguiCommand = `node ${jsFilePath}`;
    exec(qzinguiCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      }
      console.log(stdout);
    });
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });