---
layout: posts
title: ARTS Week Eleven Pattern Service Mesh.md
---
原文是[Pattern: Service Mesh](https://philcalcado.com/2017/08/03/pattern_service_mesh.html)  

本文的主要思想是，Service Mesh的诞生其实和TCP/IP网络栈的诞生很相似，都遵循下面的过程：  
`发现问题 -> 将解决方案纳入代码 -> 抽取共通问题 -> 将解决方案抽出代码放在外部共同具备的区域`  

作者举了TCP/IP中流控的例子来说明这一问题。最开始电脑和电脑之间的通讯没有流控，这时人们发现如果不进行流控，接收消息的机器有可能会收到过量的信息(可能由于该机器在处理其他事务没空接收信息，而另一侧机器不知道这一点一直发送，还有很多情况会导致该现象)。  

为了解决该问题，人们把处理流控的代码和业务代码放在一起。然而很快人们发现，处理流控的代码其实是共通的，所有的机器都需要处理这一点，因此最后，处理流控的代码就被放入网络栈中，而网络栈是所有网络通信的机器必须经过的一层。  

接下来作者引出了分布式架构中的例子。作者举了服务发现和熔断的例子。最开始，为了解决这两个问题，相关代码也被放入业务逻辑中。后来，人们将代码抽取出来，用库的形式调用。然而，用库处理有下面的问题：  
* 需要花时间将库和生态中的组件胶合起来  
* 库通常是在特定的平台下编写的(例如JVM、某种特定语言等)  
* 对库的管理、维护很困难，例如不同版本的库兼容性不同等  

最后，诞生了sidecar模式。sidecar模式其实就是对于每个服务，都有一个代理(称作sidecar)和它共同启动。该sidecar就负责处理一些共通的问题，例如上面的服务发现。服务之间均通过sidecar进行互相通信——当然，它们不知道sidecar的存在。  

对所有的服务都启动sidecar，则所有的服务及其sidecar就构成了Service Mesh。这里引用William Morgan的一段话说明Service Mesh：  

> A service mesh is a dedicated infrastructure layer for handling service-to-service communication. It’s responsible for the reliable delivery of requests through the complex topology of services that comprise a modern, cloud native application. In practice, the service mesh is typically implemented as an array of lightweight network proxies that are deployed alongside application code, without the application needing to be aware.  

在Service Mesh中有一个控制面(Control plane)。控制面知道每个代理实例，并能控制代理实例的功能。