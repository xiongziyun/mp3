const fs = require("fs");

// 目标文件夹的路径
const folderPath = "./source"; // 替换为目标文件夹的路径

// 读取目标文件夹的内容
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  const arr = files.filter((v) => v.endsWith(".mp3"));
  // 处理文件夹中的文件列表
  const jsonData = arr.map((v) => {
    const name = v.slice(0, -4);
    return {
      name,
      singer: "",
      album: "",
      time: "",
      link_url: `./source/${v}`,
      cover: `./source/${name}.jpg`,
      link_lrc: `./source/${name}.txt`,
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
});
