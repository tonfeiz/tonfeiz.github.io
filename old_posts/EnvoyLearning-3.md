---
title: Envoy Learning Part III
date: "2019-06-10"
summary: "上回修改了docker容器以及app实际监听的端口号。现在app在容器内部的8080端口号上监听，而我们访问则通过容器发布的8000端口号访问。接下去终于进入了正题，即使用envoy来代理对该app的访问" 
---
上回修改了docker容器以及app实际监听的端口号。现在app在容器内部的8080端口号上监听，而我们访问则通过容器发布的8000端口号访问。接下去终于进入了正题，即使用envoy来代理对该app的访问。  

## 实现过程
首先小小的修改一下`docker-compose.yaml`文件。在其中`service`下面添加一个选项`volumes`,如下所示  
```
volumes:
    - ./service-envoy.yaml:/etc/service-envoy.yaml
```
这句话的意思是把当前目录下的配置文件`service-envoy.yaml`挂在到容器中的`/etc`目录下。

然后把`expose`和`ports`选项改成下面的样子：  
```
expose:
    - "80"
ports:
    - "8000:80"
```

至于为什么要改成这样，在后面马上会提到。

接下去修改一下启动脚本，其中添加了`envoy`的启动，如下所示：  
```
#!/bin/sh
python3 /code/hello_world_service.py &
envoy -c /etc/service-envoy.yaml
```

最后，最关键的就是`service-envoy.yaml`文件了。`service-envoy.yaml`文件和官网提供的例子很像，其内容如下：  
```
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: service
              domains:
              - "*"
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: local_service
          http_filters:
          - name: envoy.router
            typed_config: {}
  clusters:
  - name: local_service
    connect_timeout: 0.25s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: local_service
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: 0.0.0.0
                port_value: 8080
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8081
```  
这里的选项非常之多，我这里暂且不做详细的解释，在下面我阅读了envoy的官方文档，并将其中涉及到的重要选项列举一下。  

这里我只大概说一下文件所表达的意思。首先，`envoy`根据该文件创建了一个`listener`和`cluster`,`listener`监听在端口号80上,`cluster`则监听在在端口号8080上。`listener`根据过滤器的配置过滤、转发请求。这里的`listener`将前缀为`/`的所有请求转发给名字叫做`local_service`的`cluster`,由`cluster`再给出回应。  

这里尤其要注意的是端口号。此处`listener`的监听端口号是容器内部的端口号。因此在做端口映射时，主机端口应当映射到该端口，也因此`docker-compose.yaml`中的文件中的端口相关选项做了修改。`cluster`的端口号应当是业务逻辑，即app中的监听端口号。  

## 相关envoy选项含义  

```
* `static_resources`: 静态指定的资源  
  * `listeners`: 静态的监听者
    * `address`: 监听者监听的地址。通常，该地址应当是唯一的  
    * `filter_chains`: 一系列用于该监听者的过滤器链  
      * `filters`: 过滤器列表。注意：如果过滤器列表是空的，则连接默认将会关闭  
        * `name`: 要实例化的滤波器的名字。该名字必须匹配一个支持的滤波器。内置的滤波器包括：  
          * `envoy.echo`  
          * `envoy.http_connection_manager`  
          * `envoy.tcp_proxy`
        还有一些，这里不列出了  
        * `config`与`typed_config`: 与选定的过滤器名字相关，下面以`envoy.http_connection_manager`为例  
          * `codec_type`: 编码译码类型  
          * `stat_prefix`: 发送统计信息时人可阅读的前缀。  
          * `route_config`: `connection_manager`的路由表。  
            * `name`: 路由配置的名字。  
            * `virtual_hosts`: 组成路由表的虚拟主机列表  
              * `name`: 虚拟主机的逻辑名字。当发送特定的统计信息时被使用，但和路由无关  
              * `domains`: 将匹配到该虚拟主机的域名。也可以使用通配符匹配  
              * `routes`: 将被匹配的路由列表。第一个匹配的路由将被使用  
                * `match`: 路由匹配参数  
                * `route`: 将请求路由给上游的`cluster`  
                  * `cluster`: 指定请求将要传给哪个上游`cluster`  
          * `http_filters`: http的过滤器列表  
            * `name`: 要实例的过滤器名字。一些特定的过滤器包括  
              * `envoy.buffer`  
              * `envoy.gzip`  
              * `envoy.rate_limit`  
              * `envoy.router`  
```
