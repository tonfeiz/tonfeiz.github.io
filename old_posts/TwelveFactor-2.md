---
title: Twelve Factor Part II
date: "2019-04-15"
summary: "Backing services; Build, release and run; processes" 
---
Twelve Factor Part Two  
Backing services  
Build, release and run  
processes  

## 四、支持服务(Backing services)  
*backing services*应当被视为附加资源  

*backing services*是app通过网络使用的服务，并且这些服务被视为它基本操作的一部分。举例来说，数据存储服务(MySQL等)、消息队列系统(RabbitMQ)和缓存系统(Memcached)都属于这种服务。  

*backing services*包括本地管理的服务和第三方服务。本条的要点就在于，不管哪类服务对app来说都应当没有区别，都被看作附加资源，都可以通过URL或者配置中的locator/credential访问。  

对于app来说，一个*backing services*应当和另一个同样功能的*backing services*完成无缝替换——不需要更改任何代码。这就是因为把它们看作附加资源而使其变成松耦合带来的好处  

## 五、构建、发行和运行  
严格的区分构建和运行阶段  

一个*codebase*通过下面三个阶段被转换为一个部署：  
* 构建阶段将代码转换成一批可执行文件。构建阶段获取提供者的依赖并编译二进制文件和资源  
* 发行阶段将构建完成的东西和部署当前的配置结合起来。发行阶段完成的东西随时可以在执行环境中运行  
* 运行阶段在执行环境中运行，启动app的一些进程  

twelve-factor app严格的区分上面这三个阶段，这样就不能对运行阶段的代码作任何修改，也可以方便的回滚到上一个发行版本。每个发行版本应该有一个独一无二的ID作为标识。任何发行版本都不应该被改动，想要改动则需要新的发行版本  

运行时可执行文件应当自动在任何场合(如服务器重启，进程崩溃后重启)自动执行。  

## 六、进程  
将app作为一个或多个无状态进程执行  

进程应当是无状态的，不共享任何东西。需要持久化的数据应当被存在一个有状态的*backing service*中，通常是一个数据库  

进程的内存空间或者文件系统可以被作为一个简短的，单个的事务(transaction)缓存处理。twelve-factor app从不假设在内存或是磁盘上缓存的东西在未来的请求或是工作中会是有效的——有多种情况会导致它们是失效的或被清除。  、

sticky session将用户的session数据保存在app的进程内存中并期望从相同的访问者来的请求被路由到同样的进程。这是对本准则的违反，不应当被使用。  


