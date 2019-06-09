---
layout: posts
---
Best practices for designing a pragramtic RESTful API PartII  

## Result filtering, sorting & searching
资源URL越简洁越好。复杂的结果滤除，排序需求和高级搜索都能在基本URL上通过query参数简单的实现。例如：  

**Flitering**:每个实现滤除功能的域都使用一个唯一的query参数。例如，当从`/tickets`端点中请求一列tickets时，你也许只需要那些处于open状态的ticket。这可以通过`GET /tickets?state=open`实现  

**Sorting**:和filtering相似的，一个通用的参数`sort`可以被用来描述排序规则。通过允许排序参数包含一系列逗号分隔的域(每个域伴随一个可能的一元负号来提示递减的排序顺序)为复杂的排序需求预留空间。例如：  
* `GET /tickets?sort=-priority` - 按照递减的优先级获取一列tickets  
* `GET /tickets?sort=-priority, create_at` - 按照递减的优先级获取一列tickets。在特定的优先级内，较老的tickets放在前面  

**Searching**: 有些时候基本的滤波器不够，因此需要全文搜索。也许你已经使用ElasticSearch或者其他基于Lucene的搜索技术。当全文搜索被用于提取特殊资源类型的资源实例时，它可以作为资源端点的一种query参数在API中被暴露,例如就叫做`q`。搜索的query应当被直接传送给搜索引擎，API的输出应当和普通的列表结果有相同的格式。  

将上述三者结合起来，我们可以构建这样的query：  
* `GET /tickets?sort=-update_at` - 提取最近更新的tickets  
* `GET /tickets?state=close&sort=-update_at` - 提取最近关闭的tickets  
* `GET /tickets?q=return&state=open&sort=-priority,create_at` - 提取提到单词`return`的最高优先级的open状态的tickets  

### Aliases for common queries
为了方便API对普通使用者的使用，可以考虑将一系列状况打包到简单可接触的RESTful路径中。例如，最近被关闭的tickets的query可以被打包为`GET /tickets/recently_closed`  

## Limiting which fields are returned by the API
API使用者并不总是需要完整的资源表示。选择返回的域的能力使得API使用者最小化网络传输并加速他们自身对API的使用。  

使用`fields`query参数，该参数包含由逗号分隔的列表指示要包含的域。例如，下面请求将获取仅仅是足够的信息来显示排序的open状态的tickets：  
`GET /tickets?fields=id,subject,customer_name,updated_at&state=open&sort=-updated_at`  

## Updates & creation should return resource representation
PUT,POST或者PATCH可能对不是所提供的参数的一部分的底层资源作出修改。(例如：created\_at或者updated\_at时间戳)。为了防止API使用者不得不在更新表示之后重新使用该API，让API返回被更新的(或是被创建的)表示作为响应的一部分  

例如，一个POST引起了一个创建动作，使用`HTTP 201状态码`并包含一个指向新资源的URL的`Location header`  