---
title: Vim Configure
date: "2019-04-24"
summary: "vim中的配置是十分重要的内容，不同的用户可以根据自己的喜好将vim配置成自己喜爱的样式。本次就根据vim的帮助文档介绍以下vim配置方面的内容" 
---
vim中的配置是十分重要的内容，不同的用户可以根据自己的喜好将vim配置成自己喜爱的样式。本次就根据vim的帮助文档介绍以下vim配置方面的内容。  

## vimrc文件  
vimrc文件中包含了vim在启动时就会执行的命令。对于我们最喜欢的选项和按键映射，可以放到vimrc中  

vimrc文件的名字叫做`.vimrc`，对于Unix操作系统和Macintosh操作系统来说，它的路径名一般是`~/.vimrc`。  

vimrc文件中可以包含所有能在vim中普通模式下":"后面执行的命令，最简单的设置选项的指令，其一般格式是  
`set <options>`

想要查看有哪些配置可以输入`:options`查看或是在帮助中查看。  

对于特定的配置，可以输入`:help '<option name>'`查看。另外，在设置某个选项时在后面加`&`即可恢复默认设置  

为了使vimrc文件起作用需要退出vim再重新启动  

下面列举一些设置作为例子说明  

`set autoindent`:自动缩进，使用前一行的缩进作为当前行缩进  

```
if has("vms")
  set nobackup
else
  set backup
endif
```
使得vim在覆写一个文件时保存有该文件的备份，而在VMS系统上则不用，因为VMS系统自带有这个功能。  

`set history=50`:在历史记录中保持50个命令和50种搜索模式  
`set ruler`:允许在右下角显示当前游标的位置  
`set showcmd`:显示普通模式下输入的命令  
`set incsearch`:在输入搜索模式下显示和其匹配的内容  
`map Q gq`:这是一个按键映射，将`Q`键映射到`gq`按键上  

```
filetype plugin indent on
```
1. 文件类型检测：当开始编辑一个文件时，vim将会通过文件扩展名试图发现文件的类型。文件类型可被用于语法高亮等用途  
2. 使用文件类型插件文件(filetype plugin files):不同的文件类型有不同的设置。这些公共的有用选项在vim的文件类型插件中  
3. 使用缩进文件：不同类型的文件种类使用不同的缩进  

## 简单的映射
按键映射应该是所有编辑器必备的功能了。在vim中很简单，举例来说，在vimrc文件中添加  
```
:map <F5> i{<Esc>ea}<Esc>
```
上面的这个映射解析为  
1. \<F5\> 映射按键是F5键  
2. i{ 转换为插入模式并输入{  
3. \<Esc\> 退出为普通模式  
4. ea}到单词结尾并输入}  
5. \<Esc\>最后转化为普通模式  

这样，一般情况下输入一个单词，按F5键即可在其两端加上大括号  

## 添加插件
vim可通过添加插件来扩展自己的功能。插件其实就是vim在启动时自动加载的vim脚本文件。在`plugin`文件夹中添加对应文件就可添加插件  

有两种插件：  
* 全局插件：对所有文件都有效  
* 文件类型插件：对特定文件类型才有效  

### 全局插件  
全局插件在启动时自动加载，它们提供了大部分通用的功能。  

添加全局插件只需要两步，获取全局插件，放入对应文件夹  

获取全局插件有许多地方，这里不再详述。若想要使用对应插件，则首先阅读该插件的说明文档看是否有需要注意的地方，然后将文件复制到插件文件夹下。对于Unix来说，位置一般是`~/.vim/plugin`。值得注意的是，不一定要直接放入`plugin`目录下，也可以在其中创建子目录并放入其中  

### 文件类型插件
在使用文件类型插件时，需要使用命令`:filetype plugin on`  

添加文件类型插件需要将它放入特定的文件夹，在Unix环境下就是`~/.vim/ftplugin`.对于文件类型为`filetype`的插件，该插件名字可以为  
* `<filetype>.vim`  
* `<filetype>_<name>.vim`  
* `<filetype>/<name>.vim`  

\<name\>可以是任意的  
