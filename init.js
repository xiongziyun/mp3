const fs = require('fs');
const path = require('path');
const arr = []
function readFiles(dir, callback) {
  let completed = 0;
  fs.readdir(dir, (err, files) => {
    if (err) {
      return callback(err);
    }

    if (files.length === 0) {
      // 处理空文件夹的情况
      return callback();
    }

    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) {
          return callback(err);
        }

        if (stat.isFile()) {
          // 处理文件
          if(filePath.endsWith(".mp3") || filePath.endsWith(".wav") || filePath.endsWith(".flac")) {
            arr.push(filePath)
          }
          completed++;
          if (completed === files.length) {
            // 所有文件处理完成
            callback();
          }
        } else if (stat.isDirectory()) {
          // 处理子文件夹
          readFiles(filePath, err => {
            if (err) {
              return callback(err);
            }
            completed++;
            if (completed === files.length) {
              // 所有文件处理完成
              callback();
            }
          });
        }
      });
    });
  });
}


function mkdirJson() {
  // 处理文件夹中的文件列表
  const jsonData = arr.map((v) => {
    str = v.replace(/\\/g, '/')
    const lastIndex = str.lastIndexOf('/');
    const name = str.substring(lastIndex + 1);
    return {
      name,
      singer: "",
      album: "",
      time: "",
      link_url: `./${str}`,
      cover: "",
      link_lrc: "",
    };
  });

  // 将 JSON 数据转换为字符串
  const jsonString = JSON.stringify(jsonData, null, 2); // null 和 2 是可选参数，用于格式化输出
  // 生成 JSON 文件
  fs.writeFile("./source/musiclist.json", jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("JSON 文件已生成");
  });
}

// 传入需要读取的文件夹路径和回调函数
const folderPath = './source';
readFiles(folderPath, err => {
  if (err) {
    console.error('读取文件时出错:', err);
  } else {
    console.log('文件读取完成');
    mkdirJson()
  }
});