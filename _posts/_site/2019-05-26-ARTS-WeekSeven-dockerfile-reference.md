# Dcokerfile reference
`docker build`从一个`Dockerfile`和*环境(context)*中构建一个镜像。构建的环境是一个指定`路径(PATH)`或`URL`处的文件集。`PATH`是本地文件系统的目录，`URL`是一个Git库的位置。  

build命令是被Docker守护程序执行的，而不是客户端。build过程的第一步就是把整个上下文(递归的)传送给守护程序。最好的做法是从一个空文件夹作为上下文开始并将Dockerfile保持在该目录中。只把需要build Dockerfile的文件加到目录中。  

可以指定repository以及？  
```
docker build -t shykes/myapp .
```

Docker守护程序一个一个地执行`Dockerfile`中的指令，在必要时把指令执行的结果commit到新的镜像中。守护程序将自动清理你传送过去的上下文。  

## 格式
`Dockerfile`的格式为
```
# Comment
INSTRUCTION arguments
```
指令不是大小写敏感的，但传统上均是大写  

`Dockerfile`必须以`FROM`指令开头。`FROM`指令指定了你正在构造的镜像的基本镜像(*Base Image*)。`FROM`之前只能是`ARG`指令，它声明了`FROM`要使用的参数  

## FROM
```
FROM <image> [AS <name>]
```
或者
```
FROM <image>[:<tag>] [AS <name>]
```
或者
```
FROM <image>[@<digest>] [AS <name>]
```
`FROM`指令初始化一个新的构建阶段并且为接下来的指令设置了基本镜像。  
* `FROM`可以在一个`Dockerfile`内出现许多次以创建多个镜像或者将一个构建阶段作为另一个构建阶段的依赖。  
* 可以通过添加`AS name`给一个新的构建阶段命名。  
* `tag`或者`digest`是可选的。如果忽视它们，builder会默认给一个`latest`标志。  

## RUN
`RUN`有两种形式：  
* `RUN <command>`(*shell*形式，命令在一个shell中执行，Linux中默认是`/bin/sh -c`)  
* `RUN ["executable", "param1", "param2"]`(*exec*形式)  
`RUN`执行将在当前镜像的顶部新层次上执行任何命令并提交(commit)结果。  

分层次的`RUN`指令和生成的提交(commit)是Docker的核心概念。  

## CMD
`CMD`有三种形式：  
* `CMD ["executable", "param1", "param2"]`(较好的形式)  
* `CMD ["param1", "param2"]`(作为*ENTRYPOINT*的默认参数)  
* `CMD command param1 param2`  
一个`Dockerfile`中只能有一个`CMD`指令。如果有多个则只有最后一个起作用  

**`CMD`指令的主要作用是为正在执行的容器提供默认(入口)。**  

> 注意：不要把`RUN`和`CMD`搞混。`RUN`会运行一个命令并提交结果。`CMD`不会在构建时执行任何动作，而是为镜像指定了要执行的命令。  

## EXPOSE
```
EXPOSE <port> [<port>/<protocol>...]
```
`EXPOSE`指令告诉Docker容器在运行时的监听网络端口。可以指定是TCP还是UDP，默认是TCP。  

`EXPOSE`指令并不发布端口。它是作为构建镜像的人和运行容器的人之间的一种文档存在。想要在运行容器时发布端口，在`docker run`时使用`-p`标志来发布和映射一个或更多端口。  

## ENV
```
ENV <key> <value>
ENV <key>=<value>...
```
`ENV`指令将环境变量`<key>`设置为值`<value>`。该值将被接下去的指令使用。  

## ADD
`ADD`有两种形式：  
* `ADD [--chown=<user>:<group>] <src>... <dest>`  
* `ADD [--chown=<user>:<group>] ["src", ... "<dest>"]`(这种形式是因为有些路径中包含空格因而被需要)  

`ADD`指令从`<src>`复制新的文件、目录或者远程文件的URL并将它们添加到镜像文件系统中的路径`<dest>`中  

`ADD`遵循下面的规则：  
* `<src>`路径必须在构建的*环境(context)*中;你不能`ADD ../something /something`,因为`docker build`的第一步是将环境文件夹以及其子文件夹发送给docker守护程序  
* 如果`<src>`是一个目录，则目录的所有内容都会被复制，包括文件系统元数据(目录本身不会被拷贝，仅仅是它的内容)  
* ....  

## COPY
`COPY`有两种形式：  
* `COPY [--chown=<user>:<group>] <src>... <dest>`
* `COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]`  

`COPY`指令从`<src>`复制新的文件或目录并将它们添加到容器文件系统中的路径`<dest>`中  

## ENTRYPOINT
`ENTRYPOINT`有两种形式：  
* `ENTRYPOINT ["executable", "param1", "param2"]`(*exec*形式，较好)  
* `ENTRYPOINT command param1 param2`  

`ENTRYPOINT`允许你配置(configure)一个将作为可执行文件被运行的容器  

例如，下列命令将启动nginx，在端口80监听：
```
docker run -i -t --rm -p 80:80 nginx
```

`docker run <image>`的命令行参数将在执行形式`ENTRYPOINT`下的所有元素之后被添加，并且将覆盖`CMD`形式的元素。  

只有最后一个`ENTRYPOINT`指令是有效的  

## VOLUME
```
VOLUME ["/data"]
```

`VOLUME`指令使用指定的名字创建一个挂载点并将它作为从原始本地或是其他容器获取数据的挂载卷。  

`docker run`命令初始化新创建的卷时会包括基本镜像中在指定位置的数据。例如：  
```
FROM ubuntu
RUN mkdir /myvol
RUN echo "hello world" > /myvol/greeting
VOLUME /myvol
```
这会创造一个镜像，该镜像的`docker run`会在`/myvol`创造一个新的挂载点并将`greeting`文件复制到新创建的挂载点  

## WORKDIR
```
WORKDIR /path/to/workdir
```

`WORKDIR`为例如`RUN`,`CMD`,`ENTRYPOINT`,`COPY`等指令设置工作目录。