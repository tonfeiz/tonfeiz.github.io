---
title: Envoy Learning Part II 
date: "2019-06-09"
summary: "在完成了docker中运行app之后，需要将envoy作为app的代理。其他服务通过envoy与app进行交互。然而，之前使用了相同的端口号，这容易产生混淆，因此想修改两个端口不一致以区分" 
---
在完成了docker中运行app之后，需要将envoy作为app的代理。其他服务通过envoy与app进行交互。然而，之前使用了相同的端口号，这容易产生混淆，因此想修改两个端口不一致以区分。

## docker compose内容说明
在进一步深入之前，由于对docker compose知识的缺乏，这里去了解了一下其中用到的各个字段，记录如下。  

docker compose中有top-level的key，该key在配置文件中定义了一个区域，例如`build`,`deploy`,`depends_on`,`networks`等。在该key的下面列出了支持他们作为子主题的选项。因此，一般映射是`<key>: <option>: <value>`这样的。  

### Service configuration reference
Service定义(`services:`)包含了每个为了该服务启动的容器的配置，很像给`docker container create`传递参数。与此类似的，网络和卷的定义和`docker network create`和`docker volume create`很像。  

#### build
包含在构建时的配置选项。  

`build`可以被指定为一个包含构建上下文的路径字符串，也可以使用对象的形式指定，例如  
```
version: "3.7"
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
	buildno: 1
```

##### CONTEXT
可以是一个包含Dockerfile的目录路径，也可以是到一个git repo的url  

##### DOCKERFILE
可选的Dockerfile  

#### expose
暴露端口且不向主机发布它们 - 它们将只能由链到的接服务所接触。只有内在的端口可以被指定。  

这里指的是app使用的端口号，而不是docker容器对外暴露的端口号  

#### networks
要加入的网络  

##### ALIASES
在网络上该服务的别名。相同网络中的其他容器可以使用服务名或是此别名来连接到服务的其中一个容器。  

由于`aliases`是网络范围内的，相同的服务可以在不同的网络中使用不同的别名。  

一种通用格式是这样的：  
```
services:
  some-service:
    networks:
      some-network:
        aliases:
         - alias1
	 - alias3
      other-network:
        aliases:
         - alias2
```

#### ports
暴露端口

##### SHORT SYNTAX
指定两个端口号(`HOST:CONTAINER`),或者只有容器端口(一个短暂的host端口将被选择)  

后面的是容器内部的端口，即app监听端口，前面的是暴露端口，即我们访问docker容器的端口  


```
ports:
 - "3000"
 - "3000-3005"
 - "8000:8000"
 - "9090-9091:8080-8081"
 - "49100:22"
 - "127.0.0.1:8001:8001"
 - "127.0.0.1:5000-5010:5000-5010"
 - "6060:6060/udp"
```

##### LONG SYNTAX
较长形式的语法允许对不能被短语法形式表现的配置域。  
* `target`:容器内部的端口  
* `published`:公开暴露的端口  
* `protocol`:端口的协议(`tcp`或是`udp`)  
* `mode`: 在每个节点上都发布一个host端口则是`host`,在需要负载均衡的swarm模式下的端口则是`ingress`  

```
ports:
  - target: 80
    published: 8080
    protocol: tcp
    mode: host
```

## 修改端口
app监听端口仍为8080，将容器暴露端口改为8000，docker-compose文件的格式为  
```
expose:
- "8080"
ports:
- "8000:8080"
```

这样，就可以通过8000端口号访问服务了。

中间由于对端口的配置理解有误，自己尝试了各种端口号配置，记录如下。app的监听端口号不变是8080。  

expose | ports | 访问  | 结果
-|-|-|-
"8000" | "8000:8000" | 8000 |  失败
"8000" | "8000:8080" | 8080 |  失败
"8000" | "8000:8080" | 8000 |  成功
"8000" | "8080:8000" | 8000 |  失败
"8000" | "8080:8000" | 8080 |  失败
"8080" | "8000:8080" | 8000 |  成功
"8080" | "8000:8080" | 8080 |  失败
"8080" | "8080:8000" | 8000 |  失败
"8080" | "8080:8000" | 8080 |  失败

从上面表格可以看出，`expose`的作用感觉不大，`ports`中前面的端口可以自己配置，访问时需访问该端口。后面的端口需要和app监听端口保持一致，否则访问也会失败。 
