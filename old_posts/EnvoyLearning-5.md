---
title: Envoy Learning Part V 
date: "2019-06-28"
summary: "本次继续阅读Envoy的文档" 
---
本次继续阅读Envoy的文档。  

### Health checking
主动健康检查可以在每个上游cluster上配置。Envoy支持三种不同类型的健康检查：  
* **HTTP**: Envoy会发送HTTP请求给上游host。默认情况下，如果host是健康的，它会期待收到一个200回应。  
* **L3/L4**: Envoy会发送可配置的字节缓冲给上游host。它期待在回应中该字节缓冲被回射(echo)。  
* **Redis**: Envoy会发送Redis的PING命令并期待收到PONG回应。  

#### HTTP health checking filter
Envoy包括了一个可被安装在配置好的HTTP监听器上的健康检查过滤器。该过滤器有几种操作模式：  
* **No pass through**: 该模式下，健康检查请求不会传送给本地服务。Envoy会根据当前服务器的状态(draining state)发回200或503响应  
* **No pass through, computed from upstream cluster health**: 在该模式下，Envoy会根据上游的一个或多个cluster中是否存在指定比例的服务器可用来返回200或503响应。  
* **Pass through**: 该模式下，健康检查请求会传送给本地服务。  
* **Pass through with caching**: 该模式下，Envoy会传送健康检查请求给本地服务，然后会缓存结果一段时间。  

### Connection pooling
对于HTTP流量来说，Envoy支持在底层线协议(HTTP/1.1或HTTP/2)之上一层的抽象连接池。使用的过滤器代码不需要知道底层协议是否支持真正的复用。底层实现实际上有下面的高层属性。  

#### HTTP/1.1
HTTP/1.1连接池在需要时就像上游host获取连接(最大不超过熔断限制)。请求在连接可用时与其绑定。连接可用有几种原因，例如一个连接已经处理完了之前的请求，一个新的连接已经准备好接收请求。  

#### HTTP/2
HTTP/2连接池对每个上游host获取一个连接。所有的请求都通过该连接复用。如果收到了GOAWAY帧或者连接数达到了最大流限制，连接池会创建一个新的连接并且排空已经存在的连接。  

### Load balancing
#### What is Load Balancing?
负载均衡指的是将流量分给一个cluster中的不同host的方法。Envoy提供了不同的负载均衡策略。从高层看，可以把这些策略分为两种：全局负载均衡和分布式负载均衡。  

##### Distributed Load Balancing
分布式负载均衡指的是让Envoy自己基于上游hosts的位置决定负载如何分给端点。  
##### Global Load Balancing
全局负载均衡指的是有一个全局的authority决定负载应该怎样在hosts之间分布。对Envoy来说，这可以通过控制面完成。控制面可以通过指定不同的参数(例如优先级、本地权重、端点权重和端点健康等)来分发负载。  

一个简单的例子是控制面基于网络拓扑给hosts设置不同的优先级来确保需要更少的网络跳数的hosts优先被选择。  

##### Both Distributed and Global
大部分复杂的部署会同时使用两种方法。例如，全局负载均衡可以被用来定义高级路由优先级和权重，而分布式负载均衡可以被用来对系统变化做出反应。  

#### Supported load balancers
当过滤器需要获取到上游cluster中的某个host的连接，cluster manager会使用负载均衡策略来决定选择哪个host。  

##### Weight round robin
每个有效的上游host以循环方式被选择。如果`weights`被分配给本地的端点，则`weighted round robin`策略会被使用。较高权重的端点在循环中出现的次数会更多。  

##### Weighted least request
最少请求负载均衡依据是否有host的权重大于1来使用不同的算法。  
* 都是权重1：一种O(1)算法。该算法随机选择N个可用的hosts，然后选择活跃请求最少的host。  
* 不都是权重1：如果cluster中的某个host权重大于1(即便这些host权重都相等)，负载均衡器会使用`weighted round robin`方式，且每个host的权重会根据host的请求负载动态的变化。  

##### Ring hash
环形哈希负载均衡器对上游的hosts采用一致性哈希算法。每个host通过对它的地址哈希被映射到一个环上；每个请求通过对它的某些性质进行哈希然后找到环上最近的host被路由到某个host上。  

每个host被哈希和放在环上的次数和它的权重成正比。例如，如果host A权重为1而host B权重为2，则环上可能有1个A和2个B。然而这不会提供我们所希望的2:1分割环，因为可能它们被计算出来的哈希值很接近导致环上它们也很近。所以每个host的数量需要同时乘以某个数，例如100个A和200个B。  

当基于优先级的负载均衡被使用，优先级级别也是通过哈希被选择的。  

#### Priority levels
在负载均衡期间，Envoy通常只考虑设置在最高优先级的hosts。当最高优先级的端点是健康的，所有的流量都会流往在该优先级的端点。当该优先级的端点变得不健康之后，流量才会流到优先级低一级的端点。  

总体系统可以通过设置`overprovisioning factor`(默认是1.4))过载。如果80%的某优先级的端点是健康的，则该级别仍然被认为是健康的因为80*1.4 > 100.  

优先级逻辑和整数健康分数一同工作。某个级别的健康分数是(该级别的健康host百分比)*(过载系数)，最大100%.P=0的端点接收(级别0的健康分数)百分比的流量，其余的流向P=1.例如，当50%的P=0的端点是健康时，它们将收到50\*1.4=70%的流量。  

健康分数代表了一个级别现在处理流量的能力。因此，如果所有级别的健康分数总和小于100，则Envoy认为现在没有足够的健康端点来处理所有的流量。该总和叫做归一化健康总分(normalized total health)。当归一化健康总分比100低时，流量会依据按照该小于100的总量归一化来分布。  

#### Degraded endpoints
Envoy支持将特定的端点标记为降级的，意味着它们能接收流量，但只有在没有足够的健康hosts时才可以。  

路由到降级的hosts可以被认为是路由到低优先级的hosts。在高优先级的hosts变为非健康之后，流量被分给低优先级的hosts。在健康hosts的数量不能处理100%的负载时，流量会分给降级的hosts。


### Outlier detection
Outlier检测和驱逐是动态决定一个上游cluster中的hosts是否与其他不同并将该host从健康的负载均衡集中移除的过程。性能可能通过不同的方式衡量，例如连续失败数，短时成功率，短时延迟等。Outlier检测是被动健康检测的一种。Outlier检测是集群配置(cluster configuration)的一部分，需要过滤器来报告错误，超时和重置。目前http router,tcp proxy和redis proxy这三种过来器支持outlier检测。  

检测到的错误分为两类：外部的和本地的。外部产生的错误发生在上游服务器回应收到的请求之时。例如，HTTP服务器返回错误码500或者redis服务器返回无法解码的负载。这些错误发生在Envoy成功连接到host之后。本地错误发生在Envoy与上游host的连接发生问题之时，例如超时、TCP重置、不能连接到特定的端口等。  

检测到的错误类型依赖于过滤器种类。http router过滤器既能检测本地错误也能检测外部错误。tcp proxy过滤器由于不了解高层协议，因此只能检测本地错误。  
默认情况下本地错误和外部错误不分开，也就是它们会一起累加。能通过配置`outlier_detection.split_external_local_origin_errors`选项把它们分开。  

#### Ejection algorithm
根据outlier检测的种类，驱逐outlier的过程可以是内联的(例如连续5xx)，也可以是有指定的间隔的(例如周期性的成功率)。驱逐算法按照下面的步骤工作：  
1. 一个host被决定为outlier  
2. 如果没有host被驱逐，Envoy会马上驱逐该host。否则的话，它会检查以确定驱逐的hosts数量在允许的阈值之下。如果已经驱逐的hosts数量在该阈值之上，则该host不会被驱逐 
3. 该host会被驱逐一段微秒级别的时间。驱逐意味着该host被标记为不健康并且在负载均衡期间不会被使用(除非负载均衡器处于panic状态)。等待时间由配置`outlier_detection.base_ejection_time_ms`和该host被拒绝的次数相乘决定——因此该host被拒绝的次数越多，它就越不易被加入集群。  

#### Detection types
Envoy支持下面的几种检测类型。  

##### Consecutive 5xx
默认情况下该检测类型将所有生成的错误都纳入考虑。非HTTP过滤器检测到的错误都会被映射到HTTP 5xx。  

在分离模式下，该检测模式只会考虑外部错误而忽视内部错误。  

##### Consecutive Gateway Failure
该检测类型是5xx错误的子集，叫做网关错误(502, 503或者504)，并且只被http router支持。  

##### Consecutive Local Origin Failure
该类型只有当配置`outlier_detection.split_external_local_origin_errors`为真时才有效。它只会考虑本地错误。如果Envoy重复性地不能连接到一个上游host或与该上游host的通信重复得被中断，该host将被驱逐。  

##### Success Rate
基于成功率的outlier驱逐模式从cluster中的每个host中合计出成功率，然后基于统计上的outlier检测以一定间隔驱逐hosts。  

### Circuit breaking
熔断是分布式系统中的关键成分。快速的失败和尽快对下流背压几乎总是好的。Envoy mesh的一个主要好处是Envoy在网络层实施熔断限制而不是必须对每个应用单独配置和编码。Envoy支持各种类型的分布式的熔断：  
* **Cluster maximum connections**: Envoy将和上游cluster的所有hosts建立的最大连接数。实际中只对HTTP/1.1集群有用因为HTTP/2对每个host建立单个连接。如果该熔断器溢出则`upstream_cx_overflow`计数器会增加。  
* **Cluster maximum pending requests**: 等待一个准备好的连接池连接时最大的将被列入队列中的请求数。由于HTTP/2的请求通过单个连接发送，该熔断器只在初始连接创建时有效，因为马上请求就会被复用了。对于HTTP/1.1，当没有足够的上游连接处理请求时该请求就会被加入等待队列，所以该熔断器在进程的生命期都会起作用。如果该熔断器溢出则`upstream_rq_pending_overflow`会增长。  

* **Cluster maximum requests**: 给定时间时能给所有hosts的最大请求数量。实际中只对HTTP/2集群有效因为HTTP/1.1集群通过最大连接数限制了。如果该熔断器溢出则`upstream_rq_pending_overflow`会增长。    

* **Cluster maximum active retries**: 
