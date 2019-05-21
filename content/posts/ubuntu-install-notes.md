---
title: "Ubuntu 安装及配置"
date: 2017-01-24 20:22:04
lastmod: 2017-01-24 20:22:04
draft: false
keywords: ["Ubuntu", "linux", "install", "notes", "安装及配置"]
description: "Ubuntu 安装及配置"
tags: ["Ubuntu"]
categories: ["Ubuntu"]
author: "ryan"

---

# 分区

- 逻辑分区，200M，起始，Ext4日志文件系统，/boot；（引导分区200M足够）
- 逻辑分区，4000M，起始，交换空间，无挂载点；（交换分区swap，一般不大于物理内存）
- 逻辑分区，15000M，起始，Ext4日志文件系统，/；（系统分区”/”或称作”/root”装系统和软件，15G以上足够）
- 逻辑分区，剩余空间数，起始，Ext4日志文件系统，/home；（home分区存放个人文档）
- 分区设置好后，查看/boot分区的编号，然后在下边的“安装启动引导区的设备”下拉框中选择/boot分区的编号，点击安装。一直到你安装成功，当然中途需要你设置一个用户名和密码的（这个就不说了吧）

# 科学上网

### 安装shadowsocks-qt5，github地址
```shell
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
```
### 安装genpac生成智能翻墙列表
```shell
# 安装pip
sudo apt-get install python-pip
# 安装genpac
pip install genpac
pip install --upgrade genpac
pip uninstall genpac
genpac -p "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --output="autoproxy.pac" --gfwlist-url="https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" --user-rule-from="user-rules.txt"
```
### 设置智能代理

- 进入代理设置 System settings > Network > Network Proxy
- 设置Method为Automatic
- 设置Configuration URL为autoproxy.pac文件的路径

```#例如 file:///home/用户名/Documents/autoproxy.pac```

# 系统清理

## 卸载libreOffice

```sudo apt-get remove libreoffice-common```

##  删除Amazon的链接

```sudo apt-get remove unity-webapps-common ```

# 系统美化

## unity-tweak-tool

```sudo apt-get install unity-tweak-tool```

## Flatabulous主题

### 主题：
```shell
sudo add-apt-repository ppa:noobslab/themes
sudo apt-get update
sudo apt-get install flatabulous-theme
```

### 图标：
```shell
sudo add-apt-repository ppa:noobslab/icons
sudo apt-get update
sudo apt-get install ultra-flat-icons

sudo apt-add-repository ppa:numix/ppa
sudo apt-get update
udo apt-get install numix-icon-theme-circle
```

## 字体

```Monaco```字体下载：[官方下载](https://github.com/fangwentong/dotfiles/raw/master/ubuntu-gui/fonts/Monaco.ttf)

```文泉驿微米黑```字体下载：[官方下载](http://sourceforge.net/projects/wqy/files/wqy-microhei/0.2.0-beta/wqy-microhei-0.2.0-beta.tar.gz/download)

命令行安装：```sudo apt-get install fonts-wqy-microhei```

- 双击字体文件安装

## 工具安装

### uget+aria2

uget安装：
```shell
sudo add-apt-repository ppa:plushuang-tw/uget-stable
sudo apt-get update
sudo apt-get sudo apt-get update
```
aria2安装：
```sudo apt-get install aria2```

### vscode

官网下载

### oh-my-zsh

github [地址](https://github.com/robbyrussell/oh-my-zsh)

### terminator终端

安装：```sudo apt-get install terminator```

配置：```vim ~/.config/terminator/config```

主题：github [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)

### chrome

[chrome官网](https://www.google.com/chrome/browser/desktop/index.html)

### git安装

```sudo apt-get install git```

### 压缩软件RAR

```sudo apt-get install rar```

### wps

官网下载

### dropbox

官网下载deb包
```shell
sudo apt-get install proxychains
sudo vi /etc/proxychains.conf //修改 socks4 127.0.0.1 9050 为 socks5 127.0.0.1 1080
proxychains dropbox start -i
```


### 网易云音乐

官网下载

### 启动栏:Docky

```sudo apt-get install docky  ```

### wine安装

```shell
sudo dpkg --add-architecture i386
sudo add-apt-repository ppa:wine/wine-builds
sudo apt-get update
sudo apt-get install --install-recommends winehq-devel
sudo winecfg
winecfg 
```
