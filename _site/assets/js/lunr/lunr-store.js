var store = [{
        "title": "Arts Weekone Leetcode941",
        "excerpt":"Given an array A of integers, return true if and only if it is a valid mountain array. Recall that A is a mountain array if and only if: A.length &gt;= 3 There exists some i with 0 &lt; i &lt; A.length - 1 such that: A[0] &lt; A[1] &lt;...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekOne-Leetcode941/",
        "teaser":null},{
        "title": "Arts Weekone Twelve Factor(一)",
        "excerpt":"Twelve-Factor指的是构建Saas的应用程序应当满足的12个特性。   这些应用程序具备的特点包括：     使用声明式方法(declarative formats)来自动化设置，以此最小化新的成员加入工程的时间和花费   与底层的操作系统之间有明确的协议，以此最大化不同执行环境之间的可移植性   适合于部署在现代云平台上，避免了服务器和系统管理员的需要   最小化开发环境(development)和生产环境(production)之间的分歧，为了最大化灵活性使用持续部署   能够在不显著改变工具、架构或者开发实践的基础上自由扩展   上面有一些名词是我暂时还不太理解的，这里做个简单的解释。     声明式方法：倾向于直接告诉计算机做什么，而不是告诉计算机怎么做的方法。具体可见declarative programming   持续部署：和持续部署相关的概念还有持续集成和持续交付。持续集成强调开发人员提交了新代码之后，立刻进行构建、（单元）测试。根据测试结果，我们可以确定新代码和原有代码能否正确地集成在一起。持续交付在持续集成的基础上，将集成后的代码部署到更贴近真实运行环境的「类生产环境」（production-like environments）中。比如，我们完成单元测试后，可以把代码部署到连接数据库的 Staging 环境中更多的测试。如果代码没有问题，可以继续手动部署到生产环境中。持续部署则是在持续交付的基础上，把部署到生产环境的过程自动化。(引自知乎yumminhuang)   生产环境、开发环境：软件应用开发的几个环境包括：开发环境(development)，集成环境(integration)、测试环境(testing)、QA验证、模拟环境(staging)、生产环境(production)   本是打算一次性把这12个特性都叙述一遍，但发现其中涉及到许多自己不知道的东西，因此决定还是分批来，本周先仔细看3个特性。   一、基准代码(codebase)  这一特性用一句话说就是，只有一个用版本控制系统跟踪的代码库，但可以有许多部署(deploy)   在中心化的版本管理系统中，一个codebase就是单个的代码库。在去中心化的版本管理系统中，一个codebase就是共享一个根提交(root commit)的代码库   需要注意的是，在codebase和app之间永远是一对一的关系，如果有多个codebase，那就不是一个app，而是一个分布式系统，其中的每个组件都应当是一个满足twelve-factor的app。   然而，一个app可以有多个部署。例如在生产环境中的部署，在每个开发环境上的部署等。   不同部署的codebase是相同的，但是每个活跃的部署可以是不同的版本。   二、依赖  这一特性用一句话说就是，显示的声明依赖并隔离它们   这一章读的还不太懂，可能是自身还缺乏关于微服务方面的知识的原因。   一个满足这一特性的app绝不会依赖于隐式的系统级别的库。它会使用依赖清单来显式声明自己所依赖的所有依赖项，并且会在执行期间使用依赖隔离工具来防止外界系统的隐式依赖泄漏进来(leak in)。对Ruby来说，依赖清单就是Gemfile，依赖隔离工具就是bundle exec。对Python来说，依赖清单就是pip，依赖隔离工具就是virtualenv。   这么做的一个优势就是对于新来的开发者来说，他只需要安装语言运行时环境以及依赖管理工具就可以进行app的开发。   twelve-factor app也不会隐式的依赖任何系统工具，即便这些工具在大部分操作系统上都存在，例如curl。   三、配置  将配置存在环境中   一个app的配置是在不同的部署中不同的东西。有些app将这些配置直接硬编码到代码中，这是违反twelve-factor的。配置应该从代码中严格的分离开来。当然对于内在的配置，即在不同部署中相同的配置，可以直接硬编码。   一种配置方法是使用配置文件。配置文件不应当被放入版本控制系统中，但这一点容易被忽略，而且大多配置文件往往基于特定的语言或是框架。   twelve-factor app将配置存在环境变量中。注意，使用组合的环境变量会使app失去可扩展性(组合的环境变量存疑)，最好还是将每个环境变量单独使用。  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekOne-Twelve-Factor(%E4%B8%80)/",
        "teaser":null},{
        "title": "搭建个人博客",
        "excerpt":"关于写博客，其实早就想写了。写博客的好处也从各种渠道都听说过，奈何实在是懒。现在由于看到了ARTS，觉得挺有用的，也想养成长期主动学习的习惯，因此就把博客搞起来，作为这个计划的集合地，当然其它想写的时候也会随便写一些文章。 搭建博客的教程网上有很多，随便找一个基本上就能搭建完成。我也是拼拼凑凑搭出来的，现在也还只是个雏形。这里还是做个记录，毕竟别人的经验始终是别人的，自己写出来的才是自己的。 一、利用github pages托管网站 搭建自己的博客首先得有自己的网站，要有自己的网站首先得有服务器主机来维护它，作为非土豪人士，自己买服务器托管网站这种事是干不出来的。因此，可以使用github pages来托管自己的网站。 github pages是一个静态站点服务，主要就用来直接从github repo生成网站。因为之前一直也用github，因此一些基本操作也是轻车熟路了，使用它也是基于这个考虑。 github pages也有一些缺陷，这里简单的列举几点： 它是静态站点服务，不支持服务端代码，例如PHP，Ruby或者Python github pages所在的repo最好不要超过1GB 发布的github pages网站不能超过1GB github pages站点的软带宽每个月不超过100GB 对于一般的个人博客网站来说，这些限制应该问题不大。 接下去说说具体的流程。 在github上创建一个repo，这个repo的名字必须是username.github.io,其中username就是你在github上的用户名 选择一个文件夹作为github repo的存放地，例如就在$HOME目录下，在终端下输入下面的命令： git clone https://github.com/username/username.github.io 进入上面的文件夹，创建一个index.html文件。命令如下： cd username.github.io echo \"Hello World\" &gt; index.html 将改变上传到github端。命令如下： git add -all git commit -m \"Initial commit\" git push -u origin master 至此，网站就可以查看了。可以在浏览器中输入 https://username.github.io...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/",
        "teaser":null},{
        "title": "Arts Weekone Vimtutor总结",
        "excerpt":"虽然一直在使用vim编辑器，但其实一直没有练习过。借着ARTS中T的名头，就稍微学习一下vimtutor并将其中的总结放在这。   一     使用h，j，k，l作为vim中光标的移动键(比上下左右要有效率的多)。   使用:q!(quit!)强制退出当前正在编辑的文件   使用x删除当前光标停留处的文字   使用i(insert)在当前光标位置处插入内容   使用A(Append)在当前最后一行处添加内容   二     使用dw(delete word)来删除当前光标处的一个单词   使用d$删除当前位置到行末的所有内容   许多改变文本的命令都由一个operator和motion组成，例如d代表删除operator，而motion可以有如下选择：            w：直到下一个单词的起始位置，不包括该起始位置       e: 直到当前单词的结束位置，包括该结束位置       $: 直到当前行的结尾，包括最后一个单词   如果只按上述motion则可以让光标按motion移动           在motion前面可以使用数字进行对多个motion的操作   使用0到一行的起始位置处   使用dd删除一整行数据   使用u来撤销上一个操作，U来修复一整行的操作，CTRL-R来撤销撤销操作   三     使用p(put或paste)来放置vim寄存器中的文本数据(可通过dd，d，yy等操作得到)   使用r(replace)来替换当前光标处的文本   使用c(change)+motion来改变文版，注意按c之后会进入插入模式   四     使用CTRL-G命令显示当前文件名以及总行数、当前行数   使用G(Go)到当前文件底端，gg到当前文件顶端,[number]G到[number]行   使用/[text]搜索和[text]一样的文本，n是前进，N是后退   使用%来匹配各种括号   使用:s(substitute)来替进行各种替换   五     使用:!来执行外部的shell命令，例如:!ls就可以列举目录   使用:w(write) FILENAME来将当前已经写完的内容写入某个文件   使用v(visual)进入可视化模式，选择部分内容并利用:w来将这些内容写入某个文件   使用:r(read) FILENAME来将目标文件的内容读入当前正在编辑的文件中(不一定是文件内容，某个命令的输出也可以，感觉和管道或是重定向很像)   六     使用o来在当前行下面插入一行，使用O来在当前行上面插入一行   使用a来在当前光标的下一个位置插入文本   使用R来批量替换文本   使用y来复制，p来粘贴。   总结  对我来说，这个教程比较有用的是2.3,4.4和5.5。以后还要多多练习，对这些基本操作更加熟练  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekOne-vimtutor%E6%80%BB%E7%BB%93/",
        "teaser":null},{
        "title": "Arts Weektwo Leetcode704 Binarysearch",
        "excerpt":"Given a sorted (in ascending order) integer array nums of n elements and a target value, write a function to search target in nums. If target exists, then return its index, otherwise return -1. You may assume that all elements in nums are unique. n will be in the range...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekTwo-Leetcode704-BinarySearch/",
        "teaser":null},{
        "title": "Arts Weektwo Twelve Factor(二)",
        "excerpt":"Twelve Factor Part Two  Backing services  Build, release and run  processes   四、支持服务(Backing services)  backing services应当被视为附加资源   backing services是app通过网络使用的服务，并且这些服务被视为它基本操作的一部分。举例来说，数据存储服务(MySQL等)、消息队列系统(RabbitMQ)和缓存系统(Memcached)都属于这种服务。   backing services包括本地管理的服务和第三方服务。本条的要点就在于，不管哪类服务对app来说都应当没有区别，都被看作附加资源，都可以通过URL或者配置中的locator/credential访问。   对于app来说，一个backing services应当和另一个同样功能的backing services完成无缝替换——不需要更改任何代码。这就是因为把它们看作附加资源而使其变成松耦合带来的好处   五、构建、发行和运行  严格的区分构建和运行阶段   一个codebase通过下面三个阶段被转换为一个部署：     构建阶段将代码转换成一批可执行文件。构建阶段获取提供者的依赖并编译二进制文件和资源   发行阶段将构建完成的东西和部署当前的配置结合起来。发行阶段完成的东西随时可以在执行环境中运行   运行阶段在执行环境中运行，启动app的一些进程   twelve-factor app严格的区分上面这三个阶段，这样就不能对运行阶段的代码作任何修改，也可以方便的回滚到上一个发行版本。每个发行版本应该有一个独一无二的ID作为标识。任何发行版本都不应该被改动，想要改动则需要新的发行版本   运行时可执行文件应当自动在任何场合(如服务器重启，进程崩溃后重启)自动执行。   六、进程  将app作为一个或多个无状态进程执行   进程应当是无状态的，不共享任何东西。需要持久化的数据应当被存在一个有状态的backing service中，通常是一个数据库   进程的内存空间或者文件系统可以被作为一个简短的，单个的事务(transaction)缓存处理。twelve-factor app从不假设在内存或是磁盘上缓存的东西在未来的请求或是工作中会是有效的——有多种情况会导致它们是失效的或被清除。  、   sticky session将用户的session数据保存在app的进程内存中并期望从相同的访问者来的请求被路由到同样的进程。这是对本准则的违反，不应当被使用。   ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekTwo-Twelve-Factor(%E4%BA%8C)/",
        "teaser":null},{
        "title": "Arts Weektwo Vim进阶",
        "excerpt":"上周开了vim的坑，因此决心干脆尽量把vim的大部分常用内容都记录下来，便于以后翻阅。 ^ -&gt; 到本行第一个不是blank字符的位置 g_ -&gt; 到本行最后一个不是blank字符的位置 :e &lt;path/to/file&gt; -&gt; 打开一个文件 :saveas &lt;path/to/file&gt; -&gt; 另存为&lt;path/to/file&gt; :bn和:bp -&gt; 同时打开多个文件时，使用这两个命令切换上一个和下一个文件 . -&gt; 可以重复上一次的命令 N&lt;command&gt; -&gt; 重复某个命令N次 *和# -&gt; 匹配光标当前所在的单词，移动光标到下一个或上一个匹配单词 很多命令可以以下面的形式来干 &lt;start position&gt;&lt;command&gt;&lt;end position&gt; 例如0y$意味着： 0 -&gt; 到行头 y -&gt; 拷贝 $ -&gt; 到本行最后一个字符 gU和gu后跟位置(例如w，e，$等)变换大小写 在当前行上，fa可以到下一个字符为a的位置处，a可变。ta可以到a前的第一个字符，a可变。这两者前可加数字 区域选择 &lt;action&gt;a&lt;object&gt;或&lt;action&gt;i&lt;object&gt; action可以是任何命令，例如d，y，v等 object可以是w(单词),s(句子),p(段落)，或者是特别字符:\"、'、)、}、] 举例来说，字符串(haha (-) (\"tfz\")).光标在f位置...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekTwo-vim%E8%BF%9B%E9%98%B6/",
        "teaser":null},{
        "title": "关于996工作制的一些思考",
        "excerpt":"本来“Share”应该是分享技术观点的文章，但最近的996工作制闹的沸沸扬扬的，我也想对这个东西讲一点自己的思考。   其实，作为一个学生，谈论996工作制似乎为时过早。另一方面，目前很快就毕业了，稍微等几个月说不定在实际工作中就能体会到，到时候再来发表观点也不晚。但转念一想，如果未来能打自己的脸，似乎也挺不错的，这样想到这件事就能提醒自己——没经历过的事情想的再合理也不一定符合实际。   996工作制最开始是在github上火起来的，由许多国内的程序员创建的996.icu在github上的star数一直飙升，很快就引起了注意。媒体、公司领导人和国外的一些知名程序员都关于996发表了自己的看法，甚至还有微博上的共青团中央加入。事情发展到后来，慢慢就好像变成了资本家和工人阶级的对抗。   这里姑且还是做个介绍，996指的是上班时间从早9点到晚9点，一周工作6天。ICU指的是重症加强护理病房。996.icu的意思是工作996,生病icu。   广大民众的基本角度是平常工作996实在过于辛苦，人和机器没什么两样了。隐形996也就算了，还有很多公司，像京东、有赞都开始强制996了，这样下去还得了？而领导层的基本角度就千奇百怪了，为了奋斗的，为了情怀的，为了理想的层出不穷。   然而，不管怎么说，首先有一件事是毋庸置疑的，大部分996的公司都违反了法律。既然《劳动法》规定了一周的最长规定时间，那么企业就不应该违反。要加班，就得拿工资，而且还得本人愿意，否则就是违反了法律。而在文明社会里，明目张胆的违反法律如果被允许，后果不堪设想。   接下去先反驳一下领导层的观点，996是为了理想或者为了社会或者奋斗者等等。      996是为了理想 这句话本身就不对，并不是每个人的理想都是赚大钱或者成为技术大牛，抑或是成为什么了不起的人。很多领导层的人往往会批判这样的人说没有理想，可是理想本来就是很私人的东西。假设A的理想是成为技术大牛，B的理想是娶老婆。然后大家就会觉得A了不起，B就是个笑话。But，假设A出生在一个技术大国，B出生在一个男女比例100：1的国家，那B的理想难道真那么可笑吗？显然不是   996是为了社会 也有人说，996是为了创造更多的价值，造福我们的社会。这其实是本末倒置，996的一个问题在于引发了工作人员的不幸，还怎么造福社会？也许有人会说，996的是少部分人，造福了大部分社会群体。严重点来说，这就好比杀一人救百人的问题，我个人认为，还得看别人是否愿意。   996是体现了奋斗者精神 我不否认，如果一个人做到了996,他确实很拼。我也相信，很多领导层的人确实不只996,忙起来12127都有可能。然而，如果要说996体现了奋斗者精神，我觉得不对——奋斗者精神并不是看时间的，而是看品质的。有996的人可能其实在磨洋工，也有很多955的人工作时候全神贯注，重点还是工作时候的状态。   996能加快工作进度 996真的能使工作效率提升吗？短时确实可以，但我相信，长时间996根本就做不到——假设996的时候都是在全神贯注的思考问题，完成工作的话。人的精力毕竟有限，段时间内刺激一下，长时间的产出反而会降低工作效率，尤其是技术类的工作。确实有少部分人可能精力异乎常人，再抱持着对工作的热爱，也许几年都不成问题，但这其实是用健康在交换。即便一直做自己喜欢的事情，也需要休息，更何况现在又有多少人是在做着自己喜欢的工作？   企业家知道上面这些吗？当然知道，连我都能想通，他们怎么可能不知道？但他们仍然找出一些真假混合的借口来试图使996合理化，这是为什么？我也想不明白，除非他们认为996真的能提升工作效率——那就是把人当成了机器，无论运行多长时间都能保持一致的效率。   另一方面，在广大群众之中，肯定存在着这么一种人——拿着够用的工资，干着996的活，不肯辞职却还要抱怨。确实有些人接受996是因为养家糊口——生活不易嘛。但是，也有部分人并不是——如果国内真的像媒体宣传的那么好的话，应该大部分都不是。很多人说，房价高啊，买房啊。然而房价真正高的地方主要是一线，这些地方聚集着的都是精英。他们的目的是为了以后的小孩和自己的前途，我认为，这种人就应该接受996——一方面，竞争者多，另一方面，一线城市的价值也在那放着。如果他们真的梦想过上安逸的生活，去一个差点的城市找个不用996的工作就可以，何必抱怨？既想要安逸、舒服的生活，又想要拿高工资，享受最好的教育和医疗，如果真实现了，指不定又会有更高要求，毕竟人的贪欲是无穷的。   综上，我认为，企业不应该强制实施996,可以鼓励短期996,但对于长期工作者反而应该劝告。而对于在一线享受资源还要抱怨的人——出于我的小人心理，希望他们还是应该受点罪的  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/%E5%85%B3%E4%BA%8E996%E5%B7%A5%E4%BD%9C%E5%88%B6%E7%9A%84%E4%B8%80%E4%BA%9B%E6%80%9D%E8%80%83/",
        "teaser":null},{
        "title": "Arts Weekthree Leetcode1022 Sumroottoleaf",
        "excerpt":"Given a binary tree, each node has value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit. For example, if the path is 0 -&gt; 1 -&gt; 1 -&gt; 0 -&gt; 1, then this could represent 01101 in binary, which is 13. For...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekThree-Leetcode1022-sumRootToLeaf/",
        "teaser":null},{
        "title": "Arts Weekthree Twelve Factor(三)",
        "excerpt":"Twelve Factor Part Three  Port binding  Concurrency  Disposability   七、端口号绑定  通过绑定端口号导出服务   应用程序应当是自包含(self-contained)的，并且它不应当依赖运行时服务器的注入。web app通过将HTTP绑定到一个端口号上来将其导出作为服务。   在本地的开发环境，开发者通过像http://localhost:5000/这样的URL访问自己开发的服务。在部署环境中，则通过公共域名和端口访问。   通常这通过使用依赖声明将一个web服务器库添加到app中完成，例如Python的Tornado，Java的Jetty。   注意绑定端口的服务意味着它也可以成为其他app的backing service。   八、并发  通过进程模型达成横向扩展   任何计算机程序都表示为一个或多个计算机程序。Web应用使用了许多不同类型的进程执行形式，例如PHP进程作为Apache的子进程存在，Java由JVM提供一个维护大块系统资源的进程，而并发就由线程内在的管理。不管哪种形式，运行着的进程对于app的开发者来说都只具有最小的可见性。   在twelve-factor app中，进程是一等公民。twelve-factor中的进程从运行守护服务的UNIX进程模型获得强烈的启发。在这种模型下，开发者可通过将每种类型的工作分发一个进程类型来架构自己的app以使它们能处理形色各异的工作负载。   twelve-factor app无共享、水平可分的特性意味着增强并发是一个简单可信任的操作。进程类型和每种类型的进程数量组成的矩阵则是进程信息。   twelve-factor app不能被配置为守护进程也不能写PID文件，而应当依赖操作系统的进程管理器来管理输出流，对崩溃进程作出反应或是处理用户的重启和关闭   九、可弃性(Disposability)  通过快速启动和优雅的关闭来最大化鲁棒性   disposability意味着app可以被一瞬间开启或关闭。这对于伸缩性、代码或配置改变时的快速部署以及生产环境部署的鲁棒性都很重要。   进程应当尽量最小化启动时间，最好只需几秒钟。短暂的启动时间意味着更灵活，更鲁棒(进程管理器可以更快的把进程移动到新的物理机上)   当进程从进程管理器处收到SIGTERM信号时应当优雅的关闭。对于web进程来说，这意味着停止监听端口，让当前的请求结束然后退出。   对于工作进程来说，这意味着把当前的工作返回到工作队列中。   进程应当对由底层硬件导致的突然死亡也鲁棒。一个建议的方法是使用鲁棒的后端队列，例如Beanstalked  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekThree-Twelve-Factor(%E4%B8%89)/",
        "teaser":null},{
        "title": "Arts Weekthree Vim配置",
        "excerpt":"vim中的配置是十分重要的内容，不同的用户可以根据自己的喜好将vim配置成自己喜爱的样式。本次就根据vim的帮助文档介绍以下vim配置方面的内容。 vimrc文件 vimrc文件中包含了vim在启动时就会执行的命令。对于我们最喜欢的选项和按键映射，可以放到vimrc中 vimrc文件的名字叫做.vimrc，对于Unix操作系统和Macintosh操作系统来说，它的路径名一般是~/.vimrc。 vimrc文件中可以包含所有能在vim中普通模式下”:”后面执行的命令，最简单的设置选项的指令，其一般格式是 set &lt;options&gt; 想要查看有哪些配置可以输入:options查看或是在帮助中查看。 对于特定的配置，可以输入:help '&lt;option name&gt;'查看。另外，在设置某个选项时在后面加&amp;即可恢复默认设置 为了使vimrc文件起作用需要退出vim再重新启动 下面列举一些设置作为例子说明 set autoindent:自动缩进，使用前一行的缩进作为当前行缩进 if has(\"vms\") set nobackup else set backup endif 使得vim在覆写一个文件时保存有该文件的备份，而在VMS系统上则不用，因为VMS系统自带有这个功能。 set history=50:在历史记录中保持50个命令和50种搜索模式 set ruler:允许在右下角显示当前游标的位置 set showcmd:显示普通模式下输入的命令 set incsearch:在输入搜索模式下显示和其匹配的内容 map Q gq:这是一个按键映射，将Q键映射到gq按键上 filetype plugin indent on 文件类型检测：当开始编辑一个文件时，vim将会通过文件扩展名试图发现文件的类型。文件类型可被用于语法高亮等用途 使用文件类型插件文件(filetype plugin files):不同的文件类型有不同的设置。这些公共的有用选项在vim的文件类型插件中 使用缩进文件：不同类型的文件种类使用不同的缩进 简单的映射 按键映射应该是所有编辑器必备的功能了。在vim中很简单，举例来说，在vimrc文件中添加 :map &lt;F5&gt; i{&lt;Esc&gt;ea}&lt;Esc&gt; 上面的这个映射解析为...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekThree-vim%E9%85%8D%E7%BD%AE/",
        "teaser":null},{
        "title": "技术学习之路",
        "excerpt":"这篇文章想讲讲对于学计算机技术应该怎么学，我自己的思考与观点。   说起来，Share好像变成了一个分享自己观点的东西。本意上Share应该是分享技术相关内容的。这样可能有点违规，但我觉得，分享自己的观点也不差，甚至非技术的内容也可以，因为这样促使人真正的去整理观点，审视自己，而人生除了技术之外还有很多东西能从这么做获益。   说回正题，计算机技术学习之路是一个很广泛的概念。目前计算机衍生出了这么多分支，肯定不可能每条都一样，因此这篇文章讲的是很宽泛的内容。此外，我是纯自学学的计算机，我想目前社会上像我这样的人不在少数，我的观点可能多多少少有点启发意义。   深度和广度  深度和广度是计算机技术中常常被人们谈及的领域，究竟是深度更重要还是广度更重要也常常被讨论。实际上，深度往往伴随着广度，深度到了一定地步，伴随着而来的就是涉及到的知识面更广。而广度——广度并不一定有深度，你可以从计算机工程到计算机理论各个领域全部涉及一遍。   然而，对于初学者而言，我认为还是广度更重要。求深度是一件好事，尤其现在社会分工日益精细了。但我认为，先求广度可以让初学者对计算机技术涉及的各个领域有一个基本的概念。在这之后寻求深度，往往花费时间更少。举例来说，我个人最喜欢的读书方式就是先快速读一遍，再精读一遍，最后再快速读一遍。第一遍是对书的主题、叙述方式有一个大概的了解，并且判断是否有必要再读第二遍。第二遍则是把第一遍留下的问题或者感兴趣的地方重点去看。第三编则类似于快速复习，查漏补缺。我喜欢的技术学习路线也和读书很像，先广后深再广，最后的广度就是复习自己学到的东西并看是否还有不会的。   另外，广度还有一个好处是能把知识点连起来。很多时候涉及的多了就会发现不同的问题都能有相同的方法解决，比如随处可见的缓存，算法里的分治等。对于这些东西有个初步的概念后，日后的学习就能知道重点——一般出现的越多说明它越重要，就能事半功倍。最重要的是，这些方法体现了计算机整个学科的精髓，而跨学科思考的思想也是很重要的。这些思想往往不局限于计算机，而是能解决各种问题。   内功、招式和武器  在提到计算机技术的基础时，有一个很常见的比喻，就是内功、招式和武器。内功就是基础，招式就是技术方法，武器就是工具。人们往往会强调基础的重要性，说如果没有内功，空有招式，打到敌人也不疼。如果没有招式，空有内功，至少浑厚的内功还能给你减伤。至于武器，则有锦上添花之效。   对于上面的比喻，我想说，说的太有道理了。基础的重要性是怎么强调也不为过的。随着时间的流逝，基础好的人其个人能力是先慢后块，而基础差的人则是先快后慢，最后还是得回来补。   但是对于基础怎么学，我有点想法。很多人一上来推荐书，推荐看视频。从编程语言到操作系统，各种基础类的资源推荐了个遍。然而这些东西学完恐怕要花个几年，而且又很枯燥，往往无法解决一些实际的问题。还是用上面那个比喻，学内功是很辛苦的，而且进度缓慢。而学招式还是挺好玩的，至少能摆个花架子唬人。   我认为，可以先学招式无妨。在学招式的过程中伴随着内功的修炼，或者学完招式之后再学内功，也是可以的。举例来说，在学习网络的时候，可以先学着实现一个简单的qq。在实现的过程中，有些细枝末节可以仅仅了解，而涉及到网络的部分则重点学习，并且尝试不同的方法。在实现过程中遇到的问题可以知其然而不知其所以然，但要记录在案。在实现了这个项目后，翻看《TCP/IP详解卷一》，往往看到某个知识点会和之前的问题对上。在这样的情况下，记忆更深刻，也更有效。   学习总结  我这里稍微更具体的总结一下学习的方法。   对于任意一门科目，首先选取一种输入(视频、书甚至百度百科)，大概了解即可，不需要精通。这里所说的了解，是指知道它是什么，有什么用，怎么用。例如编程语言，知道类型是什么意思，怎么定义类型，函数是什么，几种循环结构即可。接下来去找一个实际的问题，去解决它。还是以C语言为例，你可以考虑怎么用C语言画画，用C语言写游戏等等。在解决的过程中你会发现各种问题，比如内存错误，编译错误等等。记下这些错误，并去搜解决它们的方法，但不一定要知道为什么这样可以解决它。最后，挑一本经典书籍或是其他类型的经典输入，仔细的读，并和问题对照。   想要学的好，就得记住，学习是伴随着枯燥的。刻意练习的核心就是踏出舒适区。如果你感觉到学习过程很轻松，那说明你还没有尽全力，或者还在换一种形式啃自己已经了解的东西。警惕心流，处于心流状态时，有可能也是处于钻牛角尖的状态。   最后，不要逼自己。实在学不下去的时候，let it go  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/%E6%8A%80%E6%9C%AF%E5%AD%A6%E4%B9%A0%E4%B9%8B%E8%B7%AF/",
        "teaser":null},{
        "title": "Arts Weekfour Leetcode703 Kthinstream",
        "excerpt":"Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element. Your KthLargest class will have a constructor which accepts an integer k and an integer array nums, which contains initial elements...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekFour-Leetcode703-kthInStream/",
        "teaser":null},{
        "title": "Arts Weekfour Twelve Factor(四)",
        "excerpt":"Dev/prod parity  Logs  Admin processes   十、开发环境/生产环境相同  保持开发环境、模拟环境和生产环境尽可能相似   历史上，在开发环境和生产环境之间有三道鸿沟，分别位：     时间：开发者可能在需要花费几天甚至几个月才运行的代码上工作   人事：开发者写代码，运维工程师部署它   工具：开发者使用Nginx，SQLite和OSX而实际生产环境可能是Apache，MySQL和Linux   twelve-factor app需要使上面三者尽可能小来便于持续部署。   以后台服务(backing services)为例，很多语言提供库来简化与其的通信，例如使用适配器使其能适配不同的数据库。有时候开发者会倾向于在本地使用轻量级的数据库而在正式部署时使用重量级的数据库。   twelve-factor app的开发者拒绝在开发环境和生产环境之间使用不同的后台服务。   对不同后台服务的适配仍然是有用的，例如在改变后台服务时。但app的所有部署(开发环境，模拟环境和生产环境)都应当具有相同版本的后台服务   十一、日志  将日志当做事件流对待   日志提供了运行app的行为事件。它是从所有的进程和后台服务中得到的聚合的、按时间顺序排列的流。   一个twelve factor app从不关心输出流的路由或是存储。它不应当写日志文件或者管理它们。每个运行的进程都只是将事件流写入stdout中。   在开发环境中，开发者通过终端的流观察app的行为。在模拟或生产环境中，每个进程的流将被执行环境捕捉，并被路由到一个或多个最终目的地来作为长期文件。这些文件对于app是不可见并不可配置的，完全由执行环境来管理。   app的事件流还可以被送到日志索引和分析系统，例如Splunk，或是一个通用目的的存储系统例如Hadoop/Hive。这些系统能提供更多的功能   管理进程  将管理进程作为一次性的、不是经常开关的进程   开发者经常希望有一个一次性的管理进程，例如：     运行数据库迁移   运行一个控制台   运行上传到app repo中的一次性脚本   一次性的管理进程应当和app的常规长时运行进程运行在同一个环境下，使用相同的代码库和配置，不需要进行同步措施。   ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekFour-Twelve-Factor(%E5%9B%9B)/",
        "teaser":null},{
        "title": "Arts Weekfour Vim插件管理 Vundle",
        "excerpt":"vim有非常之多的插件，因此需要一个插件管理器来管理这些插件。而Vundle就是这一利器。 Vundle是vim bundle的缩写。它能自动跟踪.vimrc中的插件，安装、更新、卸载插件。Vundle自动管理插件的运行时目录并会在安装和更新后自动重新生成帮助tag。 Vundle的安装设置： 首先输入git clone https://github.com/VundleVim/Vundle.vim.git ~/vim/bundle/Vundle.vim 将下列内容保存到~/.vimrc中 set nocompatible \" be iMproved, required filetype off \" required \" set the runtime path to include Vundle and initialize set rtp+=~/.vim/bundle/Vundle.vim call vundle#begin() \" alternatively, pass a path where Vundle should install plugins \"call vundle#begin('~/some/path/here') \" let Vundle manage Vundle,...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekFour-vim%E6%8F%92%E4%BB%B6%E7%AE%A1%E7%90%86-Vundle/",
        "teaser":null},{
        "title": "计算机技术历史 语言(一)",
        "excerpt":"前段时间想去了解一下计算机技术的发展历史，但是搜了一下没有发现很系统的讲述这方面内容的书或者博客，因此就想自己来调查了解一下，也挺有意思的。   为什么要关注计算机技术的历史呢？除了兴趣之外，还有一个重要原因是想从历史获取计算机技术发展的主脉络。现在计算机技术发展日新月异，新技术曾出不穷，但不是所有的技术都能留下来，也有些技术是不必要学。想要判断这些东西，就必须得到以往的技术有所了解，找出其中的规律。   由于计算机技术实在太多了，因此不可能全部涉及。此外，硬件方面的技术门槛较高，我可能也看不懂。基于此，主要还是关注软件技术。   首先，先从编程语言开始。   机器语言  机器语言是最早的编程语言，也可以叫做机器码。大约在第一台计算机诞生时，即20世纪50年代左右，机器语言是主要编程语言。   我们普通人也常常听到计算机其实就是一连串0和1这样的话，0和1其实就是机器语言。计算机接收这些0和1，将0和1组成的串变成硬件上的高低电平，再由高低电平控制机器完成实际动作。由0和1组成的串的集合又叫做指令集，每个计算机厂家的硬件不同，其指令集也不同。   机器语言的优点就是快，缺点就是不是写给人看的。写机器语言的人必须对于硬件厂家给出的指令集有深厚的了解，才能较好的驾驭机器语言。可是不同的厂家，甚至相同厂家下面的不同型号计算机，只要硬件架构有了一定改动，机器语言也可能随之发生变化，这就造成了其可移植性和重用性都很差的后果。   如今，已经没有人再用机器语言进行实际编程了。   汇编语言  汇编语言在机器语言之后出现，但也是在20世界50年代。汇编语言直到今天还在被使用，主要被用于一些对速度要求高的场合，例如嵌入式系统、驱动程序等。   汇编语言的出现主要是为了解决机器语言看不懂的缺点。机器语言的一连串0和1简直就是天书，而汇编语言已经开始有自己的语法。汇编语言的使用者对于计算机的体系结构，各个寄存器的作用，程序计数器等要有基本的了解。由于引入了语法，汇编语言需要经过编译器转化为机器语言再交由计算机执行。从这里就可以看出，计算机中引入中间层的观点是很早就有了的。此外，汇编语言的诞生也表明了程序是写给程序员看的，而不是写给机器看的。   汇编语言的优点是目标代码简短，占用内存少，执行速度快，且比起机器语言来便于记忆。但汇编语言没有解决机器语言无法移植的特点。在不同的机器之间，汇编语言的语法也不相同。另一方面，由于汇编语言直接对寄存器等进行操作，程序的真实意图也被掩盖在细节之中，并且常常需要大量的代码完成简单的工作。最后，汇编语言也很容易产生bug并且难于调试。  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/%E8%AE%A1%E7%AE%97%E6%9C%BA%E6%8A%80%E6%9C%AF%E5%8E%86%E5%8F%B2-%E8%AF%AD%E8%A8%80(%E4%B8%80)/",
        "teaser":null},{
        "title": "Arts Weekfive Leetcode856 Scoreofparentheses",
        "excerpt":"Given a balanced parentheses string S, compute the score of the string based on the following rule: () has score 1 AB has score A + B, where A and B are balanced parentheses strings. (A) has score 2 * A, where A is a balanced parentheses string. Example: Input:...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekFive-Leetcode856-ScoreOfParentheses/",
        "teaser":null},{
        "title": "Arts Weekfive Avoid Over Engineering",
        "excerpt":"商业需求是在不断变化的，因此过度设计往往得不偿失。注意：下面的一些内容不是不要做，而是要适当，不要过度。 以下是一些误解 1. 工程比商业更聪明 工程师们往往认为自己掌控一切，但事实上商业需求永远技高一筹。在第1000个问题被解决后，它们还能冒出第1001个需求来。 商业需求是发散的，而不是收敛的 2. 重用商业功能模块 当商业抛出越来越多的功能，我们有时候会将逻辑组合起来，尽量泛化它们。然而商业需求只会发散而不会收敛，这就使得共享的逻辑变得庞大。反之，我们应该将每个动作和逻辑分离开来，只有很少的共享逻辑。 在横向分离之前先尝试纵向分裂商业功能。多隔离动作而少组合动作。 3. 所有的事情都是关于泛型 有些时候工程师会执着于完美的抽象而忽略了真正的问题。其实答案非常简单。 今天最好的设计是它能怎么样被取消(undesigned)。写的代码要易于删除，而不是易于扩展。 重复比错误的抽象要好。重复次数多了，抽象就显现出来了。 4. 臃肿的包裹器 在使用每个外部库之前都写一个包裹器是不对的。这会使得包裹器变得臃肿。另一方面，包裹器往往和底层的库紧密的耦合，底层库变了包裹器也变了。 现在许多外部库的API已经足够优秀了，因此不要总想着写包裹器。包裹器是一个异常情况，而不是正常情况。 5. 像使用工具一样使用质量 盲目的应用质量概念（例如将所有变量改成”private final”,为所有的类写接口等）并不会使代码奇迹般的变好。 记住要总是往后退一步然后看看总体的风景。 有些代码完全符合各种原则和概念，但是从整体来看却很糟糕。 5.1 三明治层 例如，将一个简洁的，紧密相连的动作划分层10或20层三明治层，每一层都与外界无关。在过去使用继承来完成，即A扩展出B扩展出C……。现在想要完成这件事并且符合SOLID原则，则需要对每个类构建接口，并且把一个类依次注入到下一个类中，明显变得更麻烦了。 像SOLID这样的概念是由于继承和其他OOP概念的滥用才产生的。大多数工程师不知道这些东西为什么诞生，只是跟随着就用。 脑海中的概念应当会转换，而不能被盲目的像工具一样使用。 6. 过度使用综合征 一些过度使用综合征的例子： 发现了泛型，于是一个简单的”HelloWorldPrinter”变成了”HelloWorldPrinter&lt;String, Writer&gt;” 发现了策略模式，于是每个”if”都是一个策略 发现了怎么写DSL，于是到处使用DSL 发现了Mocks，于是对每个测试的对象都使用mock 元编程太棒了，到处都使用元编程 枚举/扩展方法/Traits等等太棒了，到处都使用它… 7. &lt;X&gt;-ity …性。例如可配置性，安全性，扩展性，维护性，伸缩性等等。这些性质当然是好的，但不要对每个性能都担忧会发生意外。仔细的考虑使用场景，再对这些性能作优化。 8. 内部”发明” 内部的库、框架和工具最近很流行，但并不一定是好的。 一些被错过的事情： 对于某个问题领域有很深的了解是很难的，需要很多的技能。 让“发明”持续运行需要很多努力。即使是很小的库的维护也需要诸多时间 和对现有框架作出贡献相比，创造一个”发明”往往需要更多的时间...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekFive-Avoid-Over-Engineering/",
        "teaser":null},{
        "title": "Arts Weekfive Vim编辑计算机程序",
        "excerpt":"vim有许多辅助编写计算机程序的命令，可以编译一个进程并直接跳到报错的位置。   一、编译  在vim内部可以编译程序并且跳转到出错的位置。   在vim中输入以下命令，程序“make”将会被执行，结果会被捕获。  :make {arguments} 在vim中会显示出错信息。此时按下&lt;Enter&gt;键，vim会显示对应的文件并跳转到出错的位置。   下面是一些常用命令：     :cnext将跳转到下个出错位置，:cprevious将跳转到前个出错位置   :cc将显示完整的出错信息   :clist将显示完整的出错列表。   :clist!将显示所有的出错列表，包含链接错误等等   :cfirst将跳到第一个出错位置，clast将跳到最后一个出错位置   :cc 3将跳到第3个出错位置   可以通过设置makeprg选项指定要运行的编译器,通过斜杠指定传递的参数，例如  :set makeprg=nmake\\ -f\\ project.mak   二、C风格的文本缩进  对于C或者C风格的程序例如Java或者C++，可以通过设置cindent选项来控制缩进。一般来说四个空格是合适的。  set cindent shiftwidth=4   可以通过=操作符来对齐缩进。最简单的命令是==，该命令会将当前行的缩进对齐。=操作符可以在可视化模式下使用。一个很有用的命令是=a{，这个命令会将当前{}所在的区域全部缩进对齐。  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekFive-vim%E7%BC%96%E8%BE%91%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A8%8B%E5%BA%8F/",
        "teaser":null},{
        "title": "计算机技术历史 语言(二)",
        "excerpt":"在汇编语言之后，诞生了最早的程序设计语言，FORTRAN。   FORTRAN语言  FORTAN源自于英语：Formula Translation，即公式翻译。从这里就可以看出，FORTRAN语言的主要用处是科学和工程计算方面。   汇编语言的缺点在上次已经讲过，难以维护，入门门槛高，要维护各种寄存器等等。在1951年，IBM的John Backus针对这些缺点开始开发FORTRAN语言。   1954年，FORTRAN I发布。1957年，第一个FORTRAN编译器在IBM704计算机上实现，并首次成功运行了FORTRAN程序。   由于我也不会FORTRAN语言，因此我只能搜集一些资料，简单的介绍一下FORTRAN语言。   FORTRAN语言的最大特性是接近数学公式的自然描述，在计算机里具有很高的执行效率。另外，它可以直接对矩阵和复数进行运算，类似于MATLAB。很多大型的数值运算计算机针对Fortran做了优化。   相对于汇编语言，FORTRAN由于其语法的简洁性使得其入门门槛较低，可维护性也有所提高。然而，由于早期程序设计的局限性，FORTRAN的缺点也是有一大堆。FORTRAN中，某些字母开头的变量默认是某种类型，这就给命名增添了负担。早期的FORTRAN代码往往到处使用GOTO，使得程序的控制流混乱。FORTRAN的数值溢出等等也是坑。此外，虽然相比于汇编程序，FORTRAN的易读性和可维护性提高了，但相比于现代程序设计语言如C++、Java等，仍然有不少的差距。FORTRAN代码往往比较冗长，初看时会不知所以。   注：上文所说的主要是FORTRAN语言的早期版本，后来FORTRAN也加入了一些现代编程语言的特性，但和原始FORTRAN诞生原因关系不大，因此就不再详细叙述。   参考资料     百度百科   和 C++ 相比，用 Fortran 编程是怎样的体验？  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/%E8%AE%A1%E7%AE%97%E6%9C%BA%E6%8A%80%E6%9C%AF%E5%8E%86%E5%8F%B2-%E8%AF%AD%E8%A8%80(%E4%BA%8C)/",
        "teaser":null},{
        "title": "Arts Weeksix Threerules",
        "excerpt":"这篇文章讲述了Instagram构建可伸缩云应用架构的三个原则。   三、使用被证实的稳定的技术  Instagram会观察周围的最具实力的专家们都在使用哪些技术，然后争取使用和他们一致的技术。   例如，观察周围的这些公司，就会发现它们都在从旧时代的，微缩整体的架构转换到如今的微服务架构。微服务架构更偏向于简化的选择正确的工具。   二、不要重新发明轮子  云提供商和基础数据库决策以及向DevOps的持续转变正在变得常见。科技应当帮助你建造接下来的事情，而不是让你确保处理用户的下一波浪潮。   使用已有的东西，不管那是库、社区或是已知的内在知识。   一、保持简单  每个决策都可能使得代码变得更复杂。因此，要确保每个决策都尽量谨慎以使得程序保持简单、简洁  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-weekSix-ThreeRules/",
        "teaser":null},{
        "title": "Arts Weeksix Leetcode674 Lcis",
        "excerpt":"Given an unsorted array of integers, find the length of longest continuous increasing subsequence (subarray). 这题其实就是找数组中的最长连续递增子序列。想法也很简单，设置一个startIndex，当发现序列不是递增时，则子序列的长度是当前的Index减去startIndex，同时将startIndex设置为当前位置(这里注意可能有off-by-one)。遍历整个序列，找到最长的序列即可。 代码如下： func findLengthOfLCIS(nums []int) int { if len(nums) == 0 { return 0 } lengthMax := 1 startIndex := 0 arrayLength := len(nums) for i := 0; i &lt; arrayLength - 1; i++ {...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekSix-Leetcode674-LCIS/",
        "teaser":null},{
        "title": "Arts Weeksix Vim Tricks",
        "excerpt":"这篇文章介绍了一些vim中的小技巧。 替换单词 替换命令可以将一个单词替换为另一个单词，例如:%s/four/4/g 然而，对于thirtyfour来说显然不用替换，此时可以使用”\\&lt;”标志，转化为:%s/\\&lt;four/4/g 显然，对于fourteen来说，也是不对。可以使用”\\&gt;”标志，则转化为::%s/\\&lt;four\\&gt;/4/g 如果正在编程，可能希望替换注释中的“four”，这可以使用:%s/\\&lt;four\\&gt;4/gc 将”Last, First”转化为”First Last” 假设你有许多单词，其形式为 Doe, John Smith, Peter 你想将它们变为 John Doe Peter Smith 这可以通过一个命令完成：:%s/\\([^,]*\\),\\(.*\\)/\\2 \\1/ 解释如下： The first part between \\( \\) matches \"Last\" \\( \\) match anything but a comma [^,] any number of times * matches \", \" literally , The second...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekSix-vim-tricks/",
        "teaser":null},{
        "title": "计算机技术历史 语言(三)",
        "excerpt":"本次介绍一下虽然没有名气，但是深远的影响了后面的大部分程序设计语言的一个语言-Algol编程语言。   ALGOL语言诞生在20世纪50年代末。目前大多数现代语言的语法其实都是类似类Algol的。它是最有影响力的四种高级语言之一：FORTRAN，Lisp和COBOL。它被设计来改善FORTRAN暴露的问题并且最后导致了许多编程语言的诞生——PL/I，BCPL，B，Pascal和C。   Algol引入了代码块的概念和begin...end对。它也是第一个支持嵌套函数定义的编程语言。此外，它是第一个详细关注(?)正式语言定义的编程语言。并且也是它引入了BNF范式。   ALGOL 60有两种参数传递方式：按值传递和按名字传递。按名字传递对引用传递有深远的影响。按名字传递指的是当参数传递给函数时，它是在函数内部出现该参数的地方直接替换。这样的话，如果函数内部没有用到该参数，它就不会被求值。如果函数内部出现了多次，每次它都会被重新求值。   然而，ALGOL 60没有定义I/O设施。  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/%E8%AE%A1%E7%AE%97%E6%9C%BA%E6%8A%80%E6%9C%AF%E5%8E%86%E5%8F%B2-%E8%AF%AD%E8%A8%80(%E4%B8%89)/",
        "teaser":null},{
        "title": "Arts Weekseven Leetcode728 Selfdividenumbers",
        "excerpt":"A self-dividing number is a number that is divisible by every digit it contains. For example, 128 is a self-dividing number because 128 % 1 == 0, 128 % 2 == 0, and 128 % 8 == 0. Also, a self-dividing number is not allowed to contain the digit zero....","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekSeven-Leetcode728-SelfDivideNumbers/",
        "teaser":null},{
        "title": "Arts Weekseven Design Restful Api(一)",
        "excerpt":"Best Practice for Designing a Pragmatic RESTful API Key requirements for the API 列举了一些API的需求： 应当在有意义的地方使用web标准 它应当对开发者友好并且可以通过浏览器地址栏探索 它应当是简单的，符合直觉的 它应当提供足够的灵活性 在维持其他需求的同时，它应当是有效的 Use RESTful URLS and actions RESTful原则是被广泛采用的原则。REST的关键原则是将API分成逻辑资源。这些资源通过HTTP请求来操纵。HTTP中的方法具有特殊的意义(GET,POST,PUT,PATCH,DELETE)。 API设计的一大关键是不要把实现细节暴露给API。 当把资源定义好之后，你需要识别出可以对它们应用的动作(actions)以及它们如何映射到自己的API。RESTful原则提供使用HTTP方法来处理CRUD动作的策略。这些HTTP方法被映射为： GET /tickets - 获取tickets列表 GET /tickets/12 - 获取一个特定的ticket POST /tickets - 创造一个新的ticket PUT /tickets/12 - 更新#12 ticket PATCH /tickets/12 - 部分更新#12 ticket DELETE...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekSeven-Design-RESTful-API(%E4%B8%80)/",
        "teaser":null},{
        "title": "Arts Weekseven Dockerfile Reference Temp",
        "excerpt":"docker build从一个Dockerfile和环境(context)中构建一个镜像。构建的环境是一个指定路径(PATH)或URL处的文件集。PATH是本地文件系统的目录，URL是一个Git库的位置。 build命令是被Docker守护程序执行的，而不是客户端。build过程的第一步就是把整个上下文(递归的)传送给守护程序。最好的做法是从一个空文件夹作为上下文开始并将Dockerfile保持在该目录中。只把需要build Dockerfile的文件加到目录中。 可以指定repository以及？ docker build -t shykes/myapp . Docker守护程序一个一个地执行Dockerfile中的指令，在必要时把指令执行的结果commit到新的镜像中。守护程序将自动清理你传送过去的上下文。 格式 Dockerfile的格式为 # Comment INSTRUCTION arguments 指令不是大小写敏感的，但传统上均是大写 Dockerfile必须以FROM指令开头。FROM指令指定了你正在构造的镜像的基本镜像(Base Image)。FROM之前只能是ARG指令，它声明了FROM要使用的参数 FROM FROM &lt;image&gt; [AS &lt;name&gt;] 或者 FROM &lt;image&gt;[:&lt;tag&gt;] [AS &lt;name&gt;] 或者 FROM &lt;image&gt;[@&lt;digest&gt;] [AS &lt;name&gt;] FROM指令初始化一个新的构建阶段并且为接下来的指令设置了基本镜像。 FROM可以在一个Dockerfile内出现许多次以创建多个镜像或者将一个构建阶段作为另一个构建阶段的依赖。 可以通过添加AS name给一个新的构建阶段命名。 tag或者digest是可选的。如果忽视它们，builder会默认给一个latest标志。 RUN RUN有两种形式： RUN &lt;command&gt;(shell形式，命令在一个shell中执行，Linux中默认是/bin/sh -c) RUN [\"executable\", \"param1\", \"param2\"](exec形式) RUN执行将在当前镜像的顶部新层次上执行任何命令并提交(commit)结果。...","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekSeven-Dockerfile-Reference-temp/",
        "teaser":null},{
        "title": "Arts Weekseven Envoy Example Analyze.",
        "excerpt":"最近在学习envoy，这里简单学习一下其中的入门例子front-proxy.其目录位于envoy/example/front-proxy下。   目录结构  首先看下目录结构，如下所示     大体上目录中的文件可以分为四个部分：     docker compose: docker-compose.yaml   docker: Dockerfile-frontenvoy, Dockerfile-service   envoy: service-envoy.yaml, front-envoy.yaml   source: service.py, start_service.sh   接下去分别看下这四个部分的内容   docker compose  docker compose是用来配置、管理各个服务的。在本例中，docker compose定义了三个服务，分别是front-envoy, service1和service2.   front-envoy的dockerfile被指定为Dockerfile-frontenvoy，这样启动docker容器时就会去找到该文件并使用它与docker daemon进行交互。它还将当前目录下的front-envoy.yaml挂载到了docker容器中的/etc中。   front-envoy还有一个重要的点，它将本地端口80映射到了外界端口8000上，这样外界就可以通过端口8000与其进行交互。而front-envoy则应当监听80端口。   service1和service2是类似的。以service1为例，它指定了dockerfile为Dockerfile-service，并将当前目录下的service-envoy.yaml挂载到docker容器中的/etc目录下。   此外，service1的网络还被重命名为service1(为了方便后续配置socket address?),其环境变量SERVICE_NAME被设置为1以便后面启动。这里的问题是，expose到底有用吗？  Docker  Docker文件是CLI与docker daemon交流的文件，主要是为docker容器的启动作准备。   Dockerfile-frontenvoy配置了front-envoy服务所在docker容器的属性。它首先指定了base image为envoyproxy/envoy-dev:latest,然后进行更新并安装curl。值得注意的是最后它执行了/usr/local/bin/envoy命令，这应该就是envoy程序的核心所在。   Dockerfile-service配置了service所在docker容器的属性。它首先指定了base image为envoyproxy/envoy-alpine-dev:latest,然后更新并安装了python3、bash和curl。它创建了/code目录，将service.py添加到了该目录下，并将执行脚本start_service.sh放到了/usr/local/bin下。最后，它将容器的执行点设置为该脚本。   source  源文件包含了服务的业务逻辑。   start_service.sh脚本主要干了两件事，一是启动服务service，二是启动envoy。可见，envoy程序必须和业务程序共同启动。此外，之前设置的环境变量在此处也起到了选择service(cluster?)的作用。   服务程序service.py用到了falsk等框架，我不太了解，因此不详述。这里要说的，服务程序监听的端口号是8080,这个端口号在service-envoy.yaml中被映射到envoy的端口。   envoy  最后是envoy的配置文件。这些配置文件在启动envoy程序时被使用。   在service-envoy中，envoy在80端口上监听，并匹配”/service”前缀的URL，匹配到之后把请求转发给8080端口。   在front-envoy中，envoy在80端口上监听，并分别匹配”/service/1”和”/service/2”前缀的URL，将请求分别分发给service1的80端口和service2的80端口。   ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/ARTS-WeekSeven-Envoy-Example-Analyze",
        "teaser":null}]
