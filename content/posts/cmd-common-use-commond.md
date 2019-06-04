---
title: "命令行常用命令"
date: 2017-03-27 22:44:42
lastmod: 2017-03-27 22:44:42
draft: false
keywords: ["commond", "常用命令", "cmd", "linux", "git"]
description: "命令行常用命令"
tags: ["Commond"]
categories: ["linux"]
author: "Ryan"
---

---
## npm加速
- --registry=http://registry.npm.taobao.org

---
## git
- `git --version`查看版本号
- `git config --global user.username <USerNamE>` 告诉Git你的GitHub账号
- `git config --global user.name "<Your Name>"` 设定名字
- `git config --global user.email "<youremail@example.com>"` 设定电子邮箱
- `git init` 把当前文件夹设定成一个Git 专案文件夹
- `git diff` 查看对档案的修改
- `git status` 检查你的 仓库repository 的 现况status，看看是否存在任何修改
- `git add <FILENAME>` 准备 提交 commit 对于一个档案的修改
- `git add -A` 加上-A，会将新增档案跟删除档案的动作一起记录下来
- `git add .` 准备 提交 commit 对于所有档案的修改
- `git commit -m "<your commit message>"` commit(或储存）您所准备好的修改并附上一个简短的异动说明
- `git remote add <REMOTENAME> <URL>` 新增 远端 remote 连结
- `git remote set-url <REMOTENAME>` 帮一个 远端 remote 设定位址
- `git remote -v` 检视 远端 remote 连结
- `git pull <REMOTENAME> <BRANCHNAME>` 收取 Pull 远端 remote 的程式
- `git push <REMOTENAME>` 推送 Push 电脑上的程式到 远端 remote
- `git push <REMOTENAME> --delete <BRANCHNAME>` 刪除 远端remote 分支branch
- `git clone <URLFROMGITHUB>` 下载 程式库 repository
- `git branch` 列出所有的 分支 branches
- `git branch <BRANCHNAME>` 新增 分支 branch
- `git branch -M <NEWBRANCHNAME>` 重新命名目前所在的 分支 branch
- `git branch -d <BRANCHNAME>` 刪除本机的 分支branch
- `git checkout <BRANCHNAME>` 切换正在工作的 分支branch
- `git checkout -b <BRANCHNAME>` 新增并切换到新的 分支 branch
- `git fetch --dry-run` 在收取更新前先检查 远端 remote 是否有变动
- `git merge <BRANCHNAME>` 合并Merge 分支branch 到目前的 分支branch

---
## tsd命令
- `tsd query node --action install`
- `tsd query express --action install`

---
## webstom快捷键
### 查找/代替
- `ctrl+shift+N` (双击shift) 通过文件名快速查找工程内的文件（必记）
- `ctrl+shift+alt+N` 通过一个字符快速查找位置（必记）
- `F3` 查找下一个
- `shift+F3` 查找上一个
- `ctrl+F` 在文件内快速查找代码
- `ctrl+R` 文件内代码替换
- `ctrl+shift+R` 指定目录内代码批量替换
- `ctrl+shift+F` 指定目录内代码批量查找
- `shift + F6`可以重命名文件名，函数名，局部变量，标签名；函数名可以搜索引用的文件。
### 界面操作
- `alt+[0-9]` 快速拆合功能界面模块
- `ctrl+tab` 切换代码选项卡（还要进行此选择，效率差些）
- `alt+<-或->` 切换代码选项卡
- `Ctrl+Up/Down` 代码向上/下移动
- `Ctrl+B` 快速打开光标处的类或方法
- `Ctrl+E` 最近打开的文件
- `Ctrl+shift+c` 拷贝文件路径
### 代码编辑
- `Ctrl+/` 或 `Ctrl+Shift+/` 注释（// 或者/*…*/ ）
- `ctrl+D` 复制当前行
- `ctrl+W` 选中单词
- `ctrl+z` 撤销
- `ctrl+shift+z` 反撤销
- `ctrl+<-或->` 以单词作为边界跳光标位置
- `alt+Insert` 新建一个文件或其他
- `ctrl+alt+L` 格式化代码
- `shift+tab/tab` 减少/扩大缩进（可以在代码中减少行缩进）
- `ctrl+Y` 删除一行
- `shift+enter` 重新开始一行（无论光标在哪个位置）

---
## vs2012快捷键
- 回到上一个光标位置：`Ctrl + -`；
- 框式选择：`Shift+Alt+方向键（或鼠标）`
- 在当前行的上面插入空行：`Ctrl+Enter`
- 在当前行的下面插入空行：`Ctrl+Shift+Enter`
- 快速隐藏或显示当前代码段：`Ctrl+M,M`
- 快速切换窗口：`Ctrl+Tab`
- 生成解决方案：`Ctrl+Shift+B`
- 注释：`Ctrl+K+C`
- 取消注释：`Ctrl+K+U`
- 全屏显示/退出全屏显示：`SHIFT + ALT + ENTER`
- 查找所有引用：`Shift+F12`

---
## sublime命令
- `subl file`: 使用Sublime Text打开file文件
- `subl folder`: 使用Sublime Text打开folder文件夹
- `subl`: 使用Sublime Text当前文件夹

---
## sublime快捷键
### 通用
- `↑↓←→`：上下左右移动光标，注意不是不是KJHL！
- `Alt`：调出菜单
- `Ctrl + Shift + P`：调出命令板（Command Palette）
- `Ctrl + ``：调出控制台
### 编辑
- `Ctrl + Enter`：在当前行下面新增一行然后跳至该行
- `Ctrl + Shift + Enter`：在当前行上面增加一行并跳至该行
- `Ctrl + ←/→`：进行逐词移动
- `Ctrl + Shift + ←/→`进行逐词选择
- `Ctrl + ↑/↓`移动当前显示区域
- `Ctrl + Shift + ↑/↓`移动当前行
### 选择
- `Ctrl + D`：选择当前光标所在的词并高亮该词所有出现的位置，再次Ctrl + D选择该词出现的下一个位置，在多重选词的过程中，使用Ctrl + K进行跳过，使用Ctrl + U进行回退，使用Esc退出多重编辑
- `Ctrl + Shift + L`：将当前选中区域打散
- `Ctrl + J`：把当前选中区域合并为一行
- `Ctrl + M`：在起始括号和结尾括号间切换
- `Ctrl + Shift + M`：快速选择括号间的内容
- `Ctrl + Shift + J`：快速选择同缩进的内容
- `Ctrl + Shift + Space`：快速选择当前作用域（Scope）的内容
### 查找&替换
- `F3`：跳至当前关键字下一个位置
- `Shift + F3`：跳到当前关键字上一个位置
- `Alt + F3`：选中当前关键字出现的所有位置
- `Ctrl + F/H`：进行标准查找/替换，之后：
- `Alt + C`：切换大小写敏感（Case-sensitive）模式
- `Alt + W`：切换整字匹配（Whole matching）模式
- `Alt + R`：切换正则匹配（Regex matching）模式
- `Ctrl + Shift + H`：替换当前关键字
- `Ctrl + Alt + Enter`：替换所有关键字匹配
- `Ctrl + Shift + F`：多文件搜索&替换
### 跳转
- `Ctrl + P`：跳转到指定文件，输入文件名后可以：
- `符号跳转`：输入@symbol跳转到symbol符号所在的位置
- `# 关键字跳转`：输入#keyword跳转到keyword所在的位置
- `: 行号跳转`：输入:12跳转到文件的第12行。
- `Ctrl + R`：跳转到指定符号
- `Ctrl + G`：跳转到指定行号
### 窗口
- `Ctrl + Shift + N`：创建一个新窗口
- `Ctrl + N`：在当前窗口创建一个新标签
- `Ctrl + W`：关闭当前标签，当窗口内没有标签时会关闭该窗口
- `Ctrl + Shift + T`：恢复刚刚关闭的标签
### 屏幕
- `F11`：切换普通全屏
- `Shift + F11`：切换无干扰全屏
- `Alt + Shift + 2`：进行左右分屏
- `Alt + Shift + 8`：进行上下分屏
- `Alt + Shift + 5`：进行上下左右分屏
- 分屏之后，使用`Ctrl + 数字键`跳转到指定屏，使用`Ctrl + Shift + 数字键`将当前屏移动到指定屏

---
## cmd命令
- `盘符+冒号`：进入盘
- `dir`：文件夹里内容
- `cd+文件夹名`：进入当前存在的文件夹
- `cd`：返回上层目录
- `mkdir`：创建目录

---
## cocos命令
- `cocos new hello -l js`  新建项目
- `cocos run -p web`       进入文件夹，把项目跑起来
- `cocos compile -p ios|android|mac`  编译（android --ap19 指定版本  编译完导入eclipse就可以
- `cocos compile -p ios|android -m release`  打包
- `cocos compile -p web -m release`  打包到web

---
## windows密钥
- `Retial`：为零售版密钥
- `VOL`：为批量授权密钥
- `OEM`：为预装系统密钥
### 查看
- `slmgr.vbs -dli` 显示：操作系统版本、部分产品密钥、许可证状态
- `slmgr.vbs -dlv` 显示：最为详尽的激活信息，包括：激活ID、安装ID、激活截止日期
- `slmgr.vbs -xpr` 显示：是否彻底激活
- `slmgr.vbs -ipk` 更换Windows 7 序列号
- `slmgr.vbs -ato` 激活Windows 7

---
## 常用DNS
- 114 DNS `114.114.114.114`/`114.114.115.115`
- 阿里 AliDNS `223.5.5.5`/`223.6.6.6`
- 百度 BaiduDNS `180.76.76.76`
- DNSPod DNS+ `119.29.29.29`/`182.254.116.116`
- CNNIC SDNS `1.2.4.8`/`210.2.4.8`
- oneDNS `112.124.47.27`/`114.215.126.16`
- DNS 派
- 电信/移动/铁通 `101.226.4.6`/`218.30.118.6`
- DNS 派 联通 `123.125.81.6`/`140.207.198.6`
- Google DNS `8.8.8.8`/`8.8.4.4`
- OpenDNS `208.67.222.222`/`208.67.220.220`
- V2EX DNS `199.91.73.222`/`178.79.131.110`
- OpenerDNS `42.120.21.30`（无添加剂）

---
## 锁定屏幕
- `reg delete "HKEY_CLASSES_ROOT\lnkfile" /v IsShortcut /f & taskkill /f /im explorer.exe`
- `start explorer.exe`

---

## 笔记本设置无线
- `netsh wlan set hostednetwork mode=allow ssid=mywifi key=12345678`
- `netsh wlan start hostednetwork`

---
