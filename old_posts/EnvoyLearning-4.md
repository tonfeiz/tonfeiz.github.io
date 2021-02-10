---
title: Envoy Learning Part IV
date: "2019-06-17"
summary: "本周对envoy的介绍文档仔细的阅读了一遍(还没有读完)。在此将笔记记录如下" 
---
本周对envoy的介绍文档仔细的阅读了一遍(还没有读完)。在此将笔记记录如下。  

## What is Envoy 
Envoy是一个L7的代理以及通讯总线，被用于大规模现代SOA架构。  

Envoy认为:  
**网络对应用应当是透明的。当网络和应用发生了问题，应该可以很简单就定位到问题的源头**  

Envoy有下列特性：  

**Out of process architecture**：Envoy是一个自包含进程，与应用服务一同启动。这有两大好处：  
* 与任意应用语言都能工作  
* 由于不是库的形式，Envoy可以快速部署和升级  

**现代C++11代码**: 既有速度又有生产力  

**L3/L4过滤架构**: Envoy在其核心是一个L3/L4的网络代理。可插入的`filter chain`机制使过滤器能被写出来用于完成不同的TCP代理任务并插入到主服务器中。  

**HTTP过滤架构**：Envoy提供一层额外的HTPP过滤层。  

**HTTP L7 路由**: 在HTTP模式下，Envoy支持一个路由子系统。该系统能基于路径、内容和运行时值等路由和重定向请求。  

**多种支持**： gRPC,MongDB L7, Dynamo DB L7等  

**服务发现和动态配置**： Envoy可选的提供了动态配置API层。该层允许Envoy动态的更新：后端`cluster`中的`host`,后端`clusters`,HTTP 路由，监听 sockets等  

**健康检查**： 构建Envoy网格的建议方式是将服务发现作为最终一致的过程。Envoy包含一个健康检查子系统，能可选的主动检查上游服务cluster的健康情况。  
**高级负载均衡**:  

## Architecture overview
### Terminoogy
**Host**: 能进行网络通信的一个实体(移动手机上的应用，服务器等)。一台硬件上可能有多个Host  

**Downstream**: 一个下游host连接到Envoy，发送请求并接收回应  

**Upstream**: 一个上游host从Envoy接收连接和请求并作出回应  

**Listener**: 一个Listener是一个命名了的网络位置(例如端口，Unix域socket等)，该位置可以被下游客户端连接。Envoy会暴露一个或多个listener供下游host连接  

**Cluster**: 一个cluster是逻辑上相似的一组上游host，Envoy连接到这些host。Envoy通过服务发现找到cluster中的成员，通过健康检查判断该成员是否健康，通过负载均衡策略路由请求  

**Mesh**: 一组协调起来提供一致的网络拓扑的host。在本文档中，"Envoy mesh"是指一组分布式系统中组成了消息传递基础的Envoy代理  

**Runtime configuration**: 带外实时配置系统，与Envoy一同部署  

### Thread model
Envoy使用单进程多线程架构。单个*master*线程控制偶尔发生的协调任务，一些*worker*线程处理监听、过滤和转发任务。一旦一个连接被一个listener接受，该连接的剩余生命就和该worker线程绑定了。这使得Envoy大部分是单线程的(`embarrassingly parallel`),一小部分更复杂的代码处理worker线程之间的协调。通常Envoy是完全非阻塞的，大部分情况下建议工作线程的数量和硬件线程的数量一致。  

### Listeners
Envoy配置支持在一个进程中设置任意数量的listener。通常我们建议不管设置的listener有多少，每个机器都设置一个Envoy。  

每个listener都通过一些网络层(L3/L4)过滤器独立的配置。当listener接收到了一个新的连接，配置好的本地连接过滤器堆栈将会被实例化并开始处理一系列的事件。  

Listener也可以配置一些listener过滤器。该过滤器在网络层过滤器之前被使用，可以操纵连接的元数据。通常这是为了影响连接后续怎么被过滤器或者cluster处理。  

Listener也可以通过`listener discovery service`(LDS)动态的获取。  

### Listener filters
Listener filters的主要目的是使得以后增加系统集成函数更简单(通过不改变Envoy的核心功能)。  

Listener filters的API相对简单因为最终是对新接受的sockets进行操作。  

### Network(L3/L4) filters
网络层过滤器是Envoy连接处理的核心。有三种不同种类的网络过滤器：  
* 读：当Envoy从下游连接收到信息时，读过滤器被调用  
* 写：当Envoy要发送数据给下游连接时，写过滤器被调用  
* 读/写：不管Envoy收到数据还是发送数据，读/写过滤器都会被调用  

网络层过滤器的API相对简单，因为最终过滤器对原始字节和一小部分的连接事件(例如TLS握手，连接断开等)进行操作。  

### HTTP connection management
Envoy有一个内置的网络层过滤器`HTTP connection manager`。该过滤器将原始字节转化为HTTP层的信息和事件。它也处理所有HTTP连接和请求共同的功能。  

#### HTTP protocols
Envoy的`HTTP connection manager`原生支持HTTP/1.1,WebSockets和HTTP/2。Envoy设计为最先支持HTTP/2复用代理。HTTP/2的术语被用来描述系统组件。例如，HTTP请求和响应在流上发生。一个`codec`API被使用来转化协议。以HTTP/1.1为例，`codec`将协议的序列/管道能力转化为像HTTP/2一样(对更高层来说)。  

#### HTTP header sanitizing  
`HTTP connection manager`出于安全考虑提供许多不同的首部净化措施。  

#### Route table configuration
每个`HTTP connection manager`过滤器有一个关联的路由表。路由表可以是静态的，也可以通过`RDS`API动态指定。  

### HTTP filters
Envoy在`HTTP connection manager`内支持HTTP级别的过滤器。过滤器不需要知道底层的物理协议(HTTP/1.1,HTTP/2等)。有三种HTTP级别的过滤器：  
* **Decoder**: 当manager解码部分请求流(首部、实体等)时，该过滤器被调用  
* **Encoder**: 当manager编码部分响应流(首部、实体等)时，该过滤器被调用  
* **Decoer/Encoder**: 上述两种情况均会调用该过滤器  

### HTTP routing
Envoy包含一个HTTP路由过滤器。这对处理边缘流量和构建服务对服务Envoy网格十分有用。Envoy也有配置为前向代理的能力。在前向代理配置中，网格客户端可以通过适当的配置它们的http代理为Envoy来加入。在一个较高的层次上看，路由器接受一个到来的HTTP请求，将它和上游的cluster匹配，获取一个到上游cluster中的host的连接池，然而转发请求。路由过滤器有如下特性：  
* 将域名映射到一系列路由规则集合的虚拟主机  
* 前缀和完整的路径匹配规则  
* 虚拟主机层次的TLS重定向  
* 路由层次的路径/主机重定向  
* 路由层次的直接(非代理的)HTTP响应  
* 显式主机重写  
* 前缀重写  
* 通过HTTP首部或者路由配置的请求重试  

#### Route table
`HTTP connection manager`的配置中有被所有配置好的HTTP过滤器使用的路由表。虽然路由过滤器是路由表的主要使用者，其他过滤器也能访问该路由表  

### Upstream clusters
#### Cluster manager
Envoy的`cluster manager`管理所有的上游`clusters`。`clusters`的数量是任意的。  

上游的`cluster`和`host`从网络/HTTP过滤器栈中抽象出来。`cluster manager`给过滤器栈暴露API以允许过滤器获取到一个上游`cluster`的L3/L4连接，或是到上游`cluster`的抽象HTTP连接池的句柄。过滤器决定是否需要L3/L4连接或是新的HTTP流，`cluster manager`则管理负载均衡、线程本地存储、上游连接类型、知道哪些`hosts`是可用并且健康的这些功能。  

`cluster manager`知道的`clusters`可通过静态配置或是通过`cluster discovery service`(CDS) API动态配置。  

##### Cluster warming
当cluster通过服务器引导或是CDS初始化时，它们被"预热"了。这意味着`clusters`不可用直到下面的操作发生：  
* 初始化服务发现负载(DNS解析，EDS更新等)  
* 初始主动健康检查通过(如果主动健康检查被配置)  

前面的举措确保了Envoy在用一个`cluster`进行服务时对该`cluster`有准确的映像。  

当谈论`cluster warming`时，`cluster`变得可用意味着：  
* 对于新加入的`clusters`，在它被预热之前对于Envoy看上去是不存在的，如果HTTP路由到该`cluster`则会引发404或503  
* 对于更新`cluster`，老的`cluster`会继续存在并提供服务。当新的`cluster`被预热了，它会原子的和老的`cluster`互换这样就不会发生流量中断的情况  

### Service discovery
当上游的`cluster`在配置中定义了，Envoy需要知道如何解析`cluster`中的成员。这被称为服务发现。  
#### Supported service discovery types
##### Static
`Static`是最简单的服务发现种类。配置中显式的指定每个上游`host`的被解析的网络名字(IP地址/端口，unix域socket等)  

##### Strict DNS
当使用`strict DNS`服务发现时，Envoy会持续异步的解析指定的DNS目标。每个返回的IP地址将被认为是上游`cluster`中的一个显式`host`。这意味着如果查询返回了三个IP地址，Envoy会认为`cluster`中有三个`host`，并且都可以被负载均衡到。  

##### Logical DNS
`Logical DNS`使用和`strict DNS`相似的解析策略。然而，当一个新的连接需要被初始化时，一个`logical DNS cluster'`只使用返回结果中的第一个IP地址。因此，一个逻辑连接池可能包含对不同上游`hosts`的许多物理连接。  

##### Endpoint discovery service(EDS)
`Cluster`成员在Envoy术语中叫做`endpoint`。Envoy通过发现服务从每个`cluster`中获取`endpoints`。EDS由于下面的原因是推荐的服务发现机制：  
* Envoy有显式的每个上游`host`的知识(和通过DNS解析负载均衡器相比)并能作出更智能的负载均衡决策  
* 在每个`host`的`discovery API`响应中携带的额外属性能告知Envoy`host`的负载均衡比，状态等。这些额外的属性可被Envoy网格使用。  

#### On eventually consistent service discovery
Envoy从最开始的设计目标就是服务发现不需要全一致性，而是假设进出的`host`是最终一致的。我们建议在部署服务对服务的Envoy网格配置时，使用最终一致的服务发现(伴随主动健康检查)来决定`cluster`是否健康。这一范式有下列好处：  
* 所有的健康决策被完全分布了。因此，网络分区问题被优雅的解决了  
* 当健康检查被一个上游`cluster`配置，Envoy使用一个2×2矩阵来决定是否路由到该`host`  

**Discovery Status** | **Health Check OK** | **Healtch Check Failed**
--|--|--
Discovered | Route | Don't Route
Absent | Route | Don't Route/Delete  


