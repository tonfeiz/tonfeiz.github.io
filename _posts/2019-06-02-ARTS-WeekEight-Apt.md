---
layout: posts
---
这次介绍一下`apt`(Advanced Package Tool),在基于`Debian`的Linux操作系统下被广泛使用的包管理器。(注：这里的`apt`是`apt-get`与`apt-cache`的结合，但是影响不大`)`   

## 一、简介
在Linux下安装软件的方式有许多种，从源码安装需要经历下面的过程  
`./configure -> make -> make install`  
其中配置这步需要自己配置相关选项，例如安装位置等等。这样做的好处是一切由自己定制，然而坏处在于，如果每个软件都由自己手动安装，很快就会变的很复杂，而且有时候安装位置不统一也会带来额外的负担，因此就有了一些包管理工具，在`Debian`下是`dpkg`和`apt`，在`CentOS`下是`rpm`和`yum`。  

包管理工具能帮助你快速的下载、安装、卸载、更新所需要的软件。  

以前，基于`Debian`的系统使用`dpkg`命令来安装和卸载，然而该命令无法自动发现并下载软件安装的依赖(即一个软件安装可能需要另一个软件存在，若不存在则安装失败)，因此`apt`命令就被发明了。`apt`命令能自动发现并安装软件依赖，大大简化了软件的管理。  

`apt`所获取的软件包一般从网上获得。`Debian`工程维护了超过25000个软件包的中心库用于下载安装。其他库可通过添加到APT的源列表(`/etc/apt/sources.list`)中被`apt`查询(由于国内访问环境不好，一般安装`Ubuntu`之后的第一步就是更换源为国内源)。  

## 二、用法  
这里参考了`man apt`页的输出，对`apt`的关键用法作一个小结。  
  
* `update`: 用于从设置的源下载包信息。其他的命令基于该信息进行包更新或是搜索和显示可用于安装的有效包  
* `upgrade`: 用于更新已经通过源安装在系统中的包。如果需要的话新的依赖包会被下载，但是已经存在的包决不会被移除  
* `full-upgrade`: 和`upgrade`相似，但如果需要更新整个系统则会移除已经安装的包  
* `install`,`remove`,`purge`: 看名字即可  
* `autoremove`: 用于移除之前自动安装的需要的而现在已经不需要的依赖库。  
* `search`: 用于搜索想要的软件  

另外，软件默认安装在`/usr/share`中，可执行文件在`/usr/bin`中，库文件在`/usr/lib`中，下载的软件存放在`/var/cache/apt/archives`中   

## 三、配置文件
* `/etc/apt/sources.list`:获取包的位置  
* `/etc/apt/sources.list.d/`: 其余的源列表片段    
* `/etc/apt/apt.conf`: APT配置文件  
* `/etc/apt/apt.conf.d`: APT配置文件列表片段  
* `/etc/apt/preferences.d/`:版本偏好目录  
* `/var/cache/apt/archives/`:获取的包文件的存储位置  
* `/var/cache/apt/archives/partial/`:传输中的包文件的存储位置  
* `/var/lib/apt/lists`:每个在`sources.list`中指定的包资源的状态信息的存储位置  

