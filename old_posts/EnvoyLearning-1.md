---
title: Envoy Learning Part I 
date: "2019-06-02"
summary: "最近由于公司需要，开始学习一下envoy。envoy的官网教程基本上就是给例子，然而由于缺乏docker、docker-compose等相关知识，在自己搭建envoy过程中遇到了很多问题，因此这里就记录一下学习envoy的过程以及其中所遇到的问题" 
---
最近由于公司需要，开始学习一下envoy。envoy的官网教程基本上就是给例子，然而由于缺乏docker、docker-compose等相关知识，在自己搭建envoy过程中遇到了很多问题，因此这里就记录一下学习envoy的过程以及其中所遇到的问题。  

首先，假设不用envoy，直接写一个简单的返回"Hello, World"网页的应用。  

## 业务逻辑
业务逻辑是用python+flask写的，当然有其他很多方法，利用go等，只是这种方法相对最为简单而已。其代码如下  
```
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return ('Hello world!\n')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=False)
```

* Question: host改成`127.0.0.1`后，在本机上可以，在docker环境下不行，为什么？  
## docker容器配置
接下去将上面的业务逻辑放入docker容器中运行。docker的使用方法就不介绍了。直接给出docker文件如下  

```
FROM envoyproxy/envoy-alpine-dev:latest

RUN apk update && apk add python3 bash curl
RUN pip3 install -q Flask==0.11.1
RUN mkdir /code
ADD ./service.py /code/service.py
ADD ./start_service.sh /usr/local/bin/start_service.sh
RUN chmod u+x /usr/local/bin/start_service.sh
ENTRYPOINT /usr/local/bin/start_service.sh
```

这里用的基准镜像是envoy的镜像，因此需要安装python3、flask等。  

这里用脚本的原因是为了方便后面envoy的使用，目前也可以直接用`CMD`命令代替  

`start_service.sh`的内容如下  
```
#!/bin/sh
python3 /code/hello_world_service.py
```

## docker compose
docker compose主要用于管理多个docker运行时实例，虽然目前只有一个实例，但将来必定会扩展为多个，因此从最开始就使用docker compose来管理。  

docker compse文件的内容如下  
```
version: "3.4"
services:
  service:
    build:
      context: .
      dockerfile: Dockerfile-service
    volumes:
      - ./service-envoy.yaml:/etc/service-envoy.yaml
    networks:
      envoymesh:
        aliases:
          - service1
    environment:
      - SERVICE_NAME=1
    expose:
      - "8080"
    ports:
      - "8080:8080"

networks:
  envoymesh: {}
```

这里值得注意的是，app的8080端口是在docker容器中的，而我们可以选择在实际机器环境中docker容器暴露给我们的端口是什么，这里选择8080只是出于方便，也可以更改。  

