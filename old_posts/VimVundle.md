---
title: Vim Vundle 
date: "2019-05-01"
summary: "vim有非常之多的插件，因此需要一个插件管理器来管理这些插件。而Vundle就是这一利器" 
---
vim有非常之多的插件，因此需要一个插件管理器来管理这些插件。而Vundle就是这一利器。  

Vundle是vim bundle的缩写。它能自动跟踪`.vimrc`中的插件，安装、更新、卸载插件。Vundle自动管理插件的运行时目录并会在安装和更新后自动重新生成帮助tag。  

## Vundle的安装设置  
1. 首先输入`git clone https://github.com/VundleVim/Vundle.vim.git ~/vim/bundle/Vundle.vim`  
2. 将下列内容保存到~/.vimrc中  

```
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
Plugin 'tpope/vim-fugitive'
" plugin from http://vim-scripts.org/vim/scripts.html
Plugin 'L9'
" Git plugin not hosted on GitHub
Plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)
Plugin 'file:///home/gmarik/path/to/plugin'
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Avoid a name conflict with L9
Plugin 'user/L9', {'name': 'newL9'}

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList          - list configured plugins
" :PluginInstall(!)    - install (update) plugins
" :PluginSearch(!) foo - search (or refresh cache first) for foo
" :PluginClean(!)      - confirm (or auto-approve) removal of unused plugins
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
``` 

3.安装配置好的bundle:打开vim并输入`:PluginInstall`  

## 插件  
### 配置插件  
Vundle跟踪`.vimrc`中的`Plugin`命令。每个`Plugin`命令让Vundle使能脚本并将其加入|runtimepath|中。  

每个`Plugin`命令有一个指向脚本的URI。在URI后面可选择接受第二个参数。这个参数必须是一个目录。每个键值对都是一个配置选项。  

下面是一些配置选项  
1. 'rtp':设置repo中的一个目录为vim插件所在目录。该目录将被加入\|runtimepath\|中  
2. 'name':将放置配置脚本的本地拷贝的目录名字  

### 支持的URI
1. Github:当user/repo被传递给`Plugin`时Github被使用,例如  
`Plugin 'VundleVim/Vundle.vim' => https://github.com/VundleVim/Vundle.vim` 
2. Vim Scripts:没有'/'的单词都被认为从Vim Scripts中获取  
`Plugin 'ctrlp.vim' => https://github.com/vim-scripts/ctrlp.vim`
3. 本地插件  
`Plugin 'file:///path/from/root/to/plugin'`

### 基本使用方式
`:PluginInstall` 安装`.vimrc`中配置的所有插件，也可以在后面跟上插件名特定安装  
`:PluginUpdate` 更新插件  
`:PluginSearch` 需要有`curl`,搜索指定插件  
`:PluginList` 列举已经安装的插件列表  
`:PluginClean` 清除不在`.vimrc`而在安装目录下的插件


