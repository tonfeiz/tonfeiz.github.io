---
title: Envoy Source Code Analyze Part I
date: "2020-05-23"
description: "分析下Envoy的源代码"
draft: true
---

最近将Envoy作为Sidecar使用，需要进行性能优化。而要进行性能优化不理解Envoy的原理是很难的，但由于讲解Envoy实现原理的文章还比较少，因此自己阅读下Envoy的源代码并进行分析。

接下去我们从main函数看起，进入分析。

## Main

main函数还是比较简单的，就是创建了一个MainCommon实例，然后调用了它的run函数。我们继续看下MainCommon这个类。

## MainCommon

MainCommon类中有下面几个member：

* PlatformImpl
* OptionsImpl
* RealTimeSystem
* DefaultListenerHooks
* ProdComponentFactory
* MainCommonBase

而MainCommon的构造函数，其实就是初始化OptionsImpl和MainCommonBase

MainCommon的run函数，其实就是调用MainCommonBase的run函数

这么看来，主要的逻辑应该都在MainCommonBase里，我们看下MainCommonBase

## MainCommonBase

MainCommonBase相对就要复杂些了，首先看下member：

* ProcessWide
* GoogleGrpcContext
* OptionsImpl
* Server::ComponentFactory
* Thread::ThreadFactory
* Filesystem::Instance
* Stats::SymbolTablePtr
* Stats::AllocatorImpl 
* ThreadLocal::InstanceImpl
* Server::HotRestart
* Stats::ThreadLocalStoreImpl
* Logger::Context
* Init::Manager
* Server::InstanceImpl

我们来简单看下MainCommonBase的构造函数，看下它是怎么初始化这些成员的。

MainCommonBase的构造函数签名为：

```C++
MainCommonBase(const OptionsImpl& options, Event::TimeSystem& time_system,
                 ListenerHooks& listener_hooks, Server::ComponentFactory& component_factory,
                 std::unique_ptr<Runtime::RandomGenerator>&& random_generator,
                 Thread::ThreadFactory& thread_factory, Filesystem::Instance& file_system,
                 std::unique_ptr<ProcessContext> process_context)
```

其中：

* OptionsImpl、Server::ComponentFactory、Thread::ThreadFactory、Filesystem::Instance直接copy construct
* Stats::SymbolTablePtr ？

构造函数中的流程为：

1. 根据选项中的mode进入不同的初始化路径（下面仅以serve为例）
2. 根据选项是否打开hot restart进行初始化
3. 初始化ThreadLocal::InstanceImpl
4. 从hot restarter获取log lock和access log lock
5. 根据选项的本地地址IP版本获取本地地址
6. 构造Logger::Context
7. configureComponentLogLevels 
8. 设置内存溢出后的处理为abort
9. 初始化Stats::ThreadLocalStoreImpl
10. 利用许多参数初始化Server::InstanceImpl

那么接下来，我们依次详细看下各个步骤：

1. HotRestart

2. ThreadLocal

3. 根据选项的本地地址IP版本获取本地地址。源代码在NetWork Utility getLocalAddress中

   这一步的目的是获取本机地址，使用了getifaddrs函数，可获取ifconifg打出的网络地址（排除localhost）

4. 创建Logger::Context

5. configureComponentLogLevels

   这一步是将命令行中指定的日志组件的level修改为命令行中指定的level

6. ThreadLocalStoreImpl

7. 传递非常多的参数给Server::InstanceImpl。

MainCommonBase的run函数实际上是根据options中的mode来让server进行不同的处理。通常是调用server的run函数

可以看到，MainCommonBase中最主要的就是对Server::InstanceImpl的初始化和调用，因此接下去我们看下Server::InstanceImpl函数。

## Server

Server InstanceImpl是一个完整的standalone server，封装了server的处理逻辑。它的成员非常多，这里就不一一列举了，我们从主要用的函数看起。

首先看构造函数，构造函数的逻辑如下：

1. 在初始化列表中初始化了：
   1. Init::Manager，
   2. 几个状态指示变量，work_started_ live_ shutdown_ ,均为false
   3. 选项Options
   4. Protobuf：：Validation。。。？
   5. Event::TimeSystem time_source_
   6. HotRestart
   7. 开始时间和原始开始时间为time（nullptr）
   8. Stats::StoreRoot
   9. ThreadLocal::Instance
   10. 用许多参数初始化了Api::Impl
   11. 用Api初始化了Dispatcher
       1. 用api初始化了Singleton ManagerImpl
   12. 用dispatcher初始化了ConnectionHandlerImpl
   13. RandomGenerator
   14. Listener component factory
   15. Worker factory
   16. Access log manager
   17. mutex_tracer_
   18. grpc_context_
   19. process_context_
   20. server_contexts_
2. 如果选项中指定了log path，则初始化对应的file logger（应该是为access log准备的？）
3. 初始化HotRestart
4. 创建drain manager
5. 调用initialize函数初始化

可以看到，涉及到了非常多的东西，我们先挑几个重要的私有成员讲下，然后讲下initialize函数的逻辑

### Api

Api模块是对操作系统的抽象。

Api的实现是Impl类，它的构造函数接收下面的参数：

1. Thread::ThreadFactory
2. Stats::Store
3. Event::TimeSystem
4. Filesystem::Instance
5. ProcessContextOptRef

Api的接口其实也很简单，除了对自己成员的accessor/modifier，就只有两个allocateDispatcher函数，用于分配event的dispatcher

### Event Dispatcher

dispatcher是分发事件的，应该说是整个程序逻辑流动的触发器。Dispatcher中比较重要的应该是：

1. 构造函数
2. createServerConnection 
3. createClientConnection
4. createDnsResolver
5. createFileEvent
6. createFilesystemWatcher
7. createListener
8. createUdpListener
9. createTimer
10. deferredDelete
11. listenForSignal
12. run

我们依次看下这些函数

1. 构造函数

   构造函数初始化了这些东西：

   名字

   API为参数中的API

   scheduler为time system创建的scheduler

   两个TimerPtr，其中一个clearDeferredDeleteList()，还有一个runPostCallbacks()

   DeferredDeletablePtr current_to_delete_

   然后updateApproximateMonotonicTimeInternal

### Initialize函数

首先是InstanceUtil::loadBootstrapConfig。它其实就是根据命令行选项中的三种类型——config file、config yaml以及config proto将bootstrap的配置读取到proto格式的Bootstrap数据结构中。

创建ListenerManagerImpl。在其构造函数中，根据命令行选项中的concurrency数量，创建了对应的server数量。



## Event模块

我们先看下Envoy的Event模块的include，即接口：

1. timer.h
2. signal.h
3. file_event.h
4. dispatcher.h
5. deferred_deletable.h

我们依次看下。

### timer.h

**Timer**

TimerCb是当一个timer event发生时会被调用的回调函数

```c++
using TimerCb = std::function<void>()
```

Timer是一个抽象的timer事件，它有下面这些接口：

```c++
// 不销毁底层的timer，而只是禁用一个pending的timeout
virtual void disableTimer() PURE;
// 使能一个pending的timeout，如果该timeout已经在pending了，则会被设置为新的超时时间
virtual void enableTimer(const std::chrono::milliseconds& ms,
                         const ScopeTrackedObject* object = nullptr) PURE;
// 使能一个高精度的pending timeout
virtual void enableHRTimer(const std::chrono::microseconds& us,
                           const ScopeTrackedObject* object = nullptr) PURE
// 返回是否该Timer被使能了
virtual bool enabled() PURE
```

Timeptr就是Timer的unique_ptr

```c++
using TimerPtr = std::unique_ptr<Timer>;
```

可以看到，Timer接口就是用于设置时间的

**Scheduler**

Scheduler非常简单，就是用于创建Timer的

```c++
virtual TimerPtr createTimer(const TimerCb &cb, Dispatcher &dispatcher) PURE;
```

**TimerSystem**

### signal.h

SignalCb是signal事件发生时的回调

```c++
using SignalCb = std::function<void()>;
```

SignalEvent是一个只有虚析构函数的抽象接口

### file_event.h

首先是三种File读取的类型：

```c++
struct FileReadyType {
  // File is ready for reading.
  static const uint32_t Read = 0x1;
  // File is ready for writing.
  static const uint32_t Write = 0x2;
  // File has been remote closed.
  static const uint32_t Closed = 0x4;
};
```

然后是File触发的类型：

```c++
enum class FileTriggerType { Level, Edge };
```

File准备好的回调函数：

```c++
using FileReadyCb = std::function<void(uint32_t events)>;
```

File的事件和Timer有所不同。

```c++
//  
virtual void activate(uint32_t events) PURE
```

### dispatcher.h

dispatcher是event模块中比较重要的。

PostCb是dispatcher post()运行时调用的回调函数

Dispatcher的接口包括：

```c++
// 此dispatcher的名字
virtual const std::string& name() PURE;
// Dispatcher使用的时间来源
virtual TimeSource& timeSource() PURE;
// 
virtual void initializeStats(Stats::Scope& scope,
                             const absl::optional<std::string>& prefix = absl::nullopt) PURE;
  
// 清除在defered 删除队列里的item
virtual void clearDeferredDeleteList() PURE;

// 将一个已经接收的socket包装成Envoy server的Network::Connection
// socket:提供一个打开的文件描述符和用于连接的元数据。有socket的所有权
// transport_socket:提供connection使用的transport socket
// stream_info: server connection的info object
// Network::ConnectionPtr: 被调用者拥有的server connection
virtual Network::ConnectionPtr createServerConnection(Network::ConnectionSocketPtr&& socket,
                         Network::TransportSocketPtr&& transport_socket,
                         StreamInfo::StreamInfo& stream_info) PURE;

// 创建一个Envoy的Network::ClientConnection实例。不会实例化连接！
// 调用者必须在返回的Network::ClientConnection上调用connect
// address：要连接的地址
// source_address：要bind的地址或是nullptr
// transport_socket：提供connection使用的transport socket
// options：底层socket的选项
// Network::ClientConnectionPtr：被调用者拥有的client connectin
virtual Network::ClientConnectionPtr createClientConnection(Network::Address::InstanceConstSharedPtr address,
                         Network::Address::InstanceConstSharedPtr source_address,
                         Network::TransportSocketPtr&& transport_socket,
                         const Network::ConnectionSocket::OptionsSharedPtr& options) PURE;

// 创建一个异步的DNS resolver。 resolver只能在运行此dispatcher的线程使用
// resolvers：表明此resolver要使用的DNS resolver地址。如果为空，则会使用默认的/etc/resolv.conf
virtual Network::DnsResolverSharedPtr
createDnsResolver(const std::vector<Network::Address::InstanceConstSharedPtr>& resolvers,
                    bool use_tcp_for_dns_lookups) PURE;

// 创建一个会在file可读或可写时发送的event。在UNIX上可以对任何像file的接口使用，例如sockets
// trigger：表明是edge还是level触发
// FileReadyType的逻辑或
virtual FileEventPtr createFileEvent(os_fd_t fd, FileReadyCb cb, FileTriggerType trigger,
                                       uint32_t events) PURE;

virtual Filesystem::WatcherPtr createFilesystemWatcher() PURE;

// 创建一个在指定port上监听的listener
// socket：要监听的socket
// cb：listener events的回调函数
// bind_to_port：是否要绑定一个transport port
virtual Network::ListenerPtr createListener(Network::SocketSharedPtr&& socket,
                                              Network::ListenerCallbacks& cb,
                                              bool bind_to_port) PURE

virtual Network::UdpListenerPtr createUdpListener(Network::SocketSharedPtr&& socket,
                                                    Network::UdpListenerCallbacks& cb) PURE;

virtual Event::TimerPtr createTimer(TimerCb cb) PURE;

// 提交一个deferred delete的item
virtual void deferredDelete(DeferredDeletablePtr&& to_delete) PURE;

// 退出事件循环
virtual void exit() PURE;

// 监听signal事件。在进程中只有一个dispatcher可以监听signal。
virtual SignalEventPtr listenForSignal(int signal_num, SignalCb cb) PURE;

// 给dispatcher post一个functor。跨线程安全。在dispatcher的context下运行的functor可能与caller不同。
virtual void post(PostCb callback) PURE;

// 运行event loop。直到callback或是不同的线程调用exit才退出。
// type：指定是运行在Block模式（直到exit调用不会返回）或是NonBlock模式（只有active的events会被执行，然后run返回）
enum class RunType {
    Block,       // Runs the event-loop until there are no pending events.
    NonBlock,    // Checks for any pending events to activate, executes them,
                 // then exits. Exits immediately if there are no pending or
                 // active events.
    RunUntilExit // Runs the event-loop until loopExit() is called, blocking
                 // until there are pending or active events.
  };
  virtual void run(RunType type) PURE;

virtual Buffer::WatermarkFactory& getWatermarkFactory() PURE;

virtual const ScopeTrackedObject* setTrackedObject(const ScopeTrackedObject* object) PURE;

// 验证dispatcher的相关操作是线程安全的。也就是执行此函数的线程和dispatcher loop运行的线程是一样的
virtual bool isThreadSafe() const PURE;

// 返回一个最近缓存的MonotonicTime
virtual MonotonicTime approximateMonotonicTime() const PURE;

virtual void updateApproximateMonotonicTime() PURE;
```

### deferred_deletable.h

其中只有一个纯虚函数表示接口。

如果一个对象继承了此类，它可以被传给dispatcher，dispatcher会确保在未来的event loop cycle中删除它。这允许清除unique ptr的所有权，并且不必在事件处理期间担心stack unwind issue。

### implementation

接下去我们看下Event模块的实现部分。

#### deferred_task.h

其中只有一个DeferredTaskUtil类，该类被用于在dispatcher中加入一个延迟执行的task

```c++
  static void deferredRun(Dispatcher& dispatcher, std::function<void()>&& func) {
    dispatcher.deferredDelete(std::make_unique<DeferredTask>(std::move(func)));
  }
```

其中DeferredTask是一个private类：

```c++
  class DeferredTask : public DeferredDeletable {
  public:
    DeferredTask(std::function<void()>&& task) : task_(std::move(task)) {}
    ~DeferredTask() override { task_(); }

  private:
    std::function<void()> task_;
  };
```

#### dispatcher_impl

dispatcher里面有几个重要的部分：

1. scheduler。Dispatcher里有两个private的scheduler，一个是LibeventScheduler的base_scheduler\_，另一个是SchedulerPtr的scheduler。Dispatcher的构造函数中利用参数TimeSystem初始化了scheduler，然而其实TimeSystem创建scheduler也是利用base_scheduler_创建的，感觉绕了一大圈，这是为啥呢？
2. 一些Timer。包括deferred_delete_timer\_、post_timer\_。前者是用来销毁一些需要延迟销毁的Task的，后者则是？
3. 时间MonotonicTime。

Dispatcher有一系列create函数，创建了包括ServerConnection、ClientConnection、DnsResolver等东西，这也是Dispatcher需要完成的功能部分。这些创建其实都是创建了unique ptr，但是在创建时由于把自身（this）也传给了目标对象的构造函数，因此可以通过dispatcher的createFileEvent来注册到scheduler中去。

## HotRestart模块

Envoy的hot restart模块是为了让Envoy能优雅的reload而设计的。所谓优雅的reload，指的就是在不丢失连接的情况下能完整的重新加载代码以及配置。

## Draining模块

Draining是Envoy尝试去优雅的关闭连接作为一些事件的回应的过程。这些事件包括：

* 服务被手动的设置为健康检查failed
* server在hot restart
* 单独的listener在被修改活移除（通过LDS）

