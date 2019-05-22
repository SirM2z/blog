const fs = require('fs');
const path =require('path');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const { nowJsonTemplate } = require('./template');

// 创建 now.json
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

fsExtra.remove(resolveApp('now.json'));

const postPaht = resolveApp('public/post');

const addTemplate = `,
    {
      "src": "%path-to-post-src%",
      "status": 301,
      "headers": { "Location": "%path-to-post-redirect%" }
    }`;

// fs.readdir promise 化
function fsReaddirPromise(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, function(err, fileList) {
      if (err) {
        console.log(chalk.yellow('fsReaddirPromise err:', err));
        reject(err);
        return;
      }
      resolve(fileList);
    });
  })
}

// 写入 now.json
function writeNowJson(str) {
  fs.open(resolveApp('now.json'), 'w', (e, fd) => {
    if (e) throw e;
    fs.write(fd, str, 'utf8', (e) => {
      if (e) throw e;
      fs.closeSync(fd);
      console.log(chalk.green('now.json 生成完毕'));
    });
  });
}

// 遍历目录 深度优先
async function main() {
  let addStr = '';
  // 遍历 post 下年份
  const yearRes = await fsReaddirPromise(postPaht);
  for(let i = 0; i < yearRes.length; i++) {
    // 遍历年份下月份
    const pathToYear = path.resolve(postPaht, yearRes[i]);
    const monthRes = await fsReaddirPromise(pathToYear);
    for (let j = 0; j < monthRes.length; j++) {
      // 遍历月份下文章
      const pathToMonth = path.resolve(postPaht, yearRes[i] + '/' + monthRes[j]);
      const postRes = await fsReaddirPromise(pathToMonth);
      postRes.forEach(postItem => {
        const postPathSrc = `/post/${postItem}`;
        const postPathRedirect = `/post/${yearRes[i]}/${monthRes[j]}/${postItem}`;
        let str = addTemplate.replace(/%path-to-post-src%/g, postPathSrc);
        str = str.replace(/%path-to-post-redirect%/g, postPathRedirect);
        addStr = addStr + str;
      })
    }
  }
  const resultStr = nowJsonTemplate.replace(/%fill%/g, addStr);
  writeNowJson(resultStr);
}

main();
