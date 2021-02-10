---
title: Best Practice for Designing a Pragmatic RESTful API Part I
date: "2019-05-26"
summary: "设计RESTful API最佳实践"   
---
Best Practice for Designing a Pragmatic RESTful API Part I 

## Key requirements for the API
列举了一些API的需求：  
* 应当在有意义的地方使用web标准  
* 它应当对开发者友好并且可以通过浏览器地址栏探索  
* 它应当是简单的，符合直觉的  
* 它应当提供足够的灵活性  
* 在维持其他需求的同时，它应当是有效的  

## Use RESTful URLS and actions
RESTful原则是被广泛采用的原则。REST的关键原则是将API分成逻辑资源。这些资源通过HTTP请求来操纵。HTTP中的方法具有特殊的意义(GET,POST,PUT,PATCH,DELETE)。  

API设计的一大关键是不要把实现细节暴露给API。  

当把资源定义好之后，你需要识别出可以对它们应用的动作(actions)以及它们如何映射到自己的API。RESTful原则提供使用HTTP方法来处理CRUD动作的策略。这些HTTP方法被映射为：  
* `GET /tickets` - 获取tickets列表  
* `GET /tickets/12` - 获取一个特定的ticket  
* `POST /tickets` - 创造一个新的ticket  
* `PUT /tickets/12` - 更新#12 ticket  
* `PATCH /tickets/12` - 部分更新#12 ticket  
* `DELETE /tickets/12` - 删除#12 ticket  

REST的好处在于在单个端点`/tickets`上使用已存在的HTTP方法完成了至关重要的功能。没有方法命名规范需要遵循并且URL结构干净清楚。  

**端点名字应当是单数还是复数？**keep-it-simple规则可以应用在这里。虽然内在逻辑可能是单数，但是工程上考虑需要将URL格式一致并且总是使用复数。  

**如何处理关系？**如果一个关系只能和其他资源共存，RESTful原则提供了有用的指导。例如，一个ticket由许多message组成。这些message可以被映射到`/tickets`端点：  
* `GET /tickets/12/messages` - 获取#12 ticket的消息列表  
* `GET /tickets/12/messages/5` - 获取ticket #12的第5条消息  
* `POST /tickets/12/messages` - 为ticket #12创建一个新消息  
* ...  

如果一个关系能独立于资源存在，那么在资源的输出表达中包括该标识符是有意义的。然后API使用者就不得不到达关系的端点。然而，如果该关系通常和资源一起使用，则API能将关系表达嵌入到API中来避免第二次hit。(这里很难翻译。。)  

**不能用CRUD操作表达的动作怎么办？**  

这是事情变得复杂的地方。有许多方法：  
1. 重新结构化动作使其表现的像是资源的一个域。如果该动作不接收参数则这是可以工作的。例如，激活动作可以被映射为布尔值`activated`然后通过到资源的PATCH更新  
2. 使用RESTful原则将它作为子资源对待。例如，GitHub的API允许你使用`PUT /gists/:id/star`对gist打星，并且使用`DELETE /gists/:id/star`取消打星  
3. 有时候确实不能将动作映射到有意义的RESTful架构。例如，一个多资源的搜索不能有意义的用到一个特定资源的端点。在这种情况下，`/search`是可以的，虽然它不是一个资源。做从API使用者角度来看是对的事情并及早文档化以避免误解  

## SSL everywhere - all the time
总是使用SSL，没有例外。今天，web API能够从各个地方被获取。不是所有的地方都是安全的。许多完全不加密通信，使得认证证书被劫持后信息被偷听或身份被冒充。  

总是使用SSL的另一个好处是保证加密过的通信简化了认证  

需要注意的是对API URL的无SSL请求。不要把它们重定向的SSL的版本，而是要抛出一个硬错误！  

## Documentation
一个API最多和它的文档一样好。文档应当便于获取并且是公共的。大多数开发者在使用API之前会检查文档。如果文档被隐藏在PDF文件中或者需要登录才能获取，则它们不仅难于找到且难于搜索到  

文档应当展示完整的请求/回应循环的例子。最好请求是可以粘贴的例子——要不是可以粘贴到浏览器的链接，要不是可以粘贴到终端中的curl例子。  

一旦发布了一个公共API，则你就承诺了不会无通知的破坏它。文档必须包含任何过时的东西。更新应当通过博客或是邮件列表发送。  

## Versioning
总是将你的API标识上版本号。这样帮助你更快的迭代并且阻止无效的请求到达更新过的端点。它也帮助平滑了主要API版本的转换，你可以继续提供旧API版本一段时间。  

对于版本号应当在URL还是在首部中有不同的观点。学术上来说，它应当在首部中。然而，版本号应当在URL中来确保通过探索资源?(翻译有点问题)  

作者比较喜欢的一种做法是URL有一个主要版本号，而API有一个可通过顾客HTTP请求头选择的基于日期的子版本号。在这种情况下，主版本号提供了API结构的稳定性，子版本号负责较小的变化。  

API永远不可能是完全稳定的。变化是不可避免的。重要的是变化是怎么被管理的。被较好的文档化和声明的多个月的过时安排可以是一个可接受的选择。  

