---
title: ProGit Part IV
date: "2019-06-25"
summary: "本章介绍Git关于分支的知识，包括基本的分支切换合并" 
---
本章介绍Git关于分支的知识，包括基本的分支切换合并。  

  
## Git Branching
### Branches in a Nutshell
当你进行`commit`时，Git存储了一个包含指向你快照的指针的*提交*对象。该对象还包含作者的名字，邮箱地址，你输入的信息，以及指向提交(`commit`)或是在该提交之前的提交(它的父亲)的指针。对于初始提交来说，没有父亲，对于普通提交来说，只有一个父亲，对于从两个或多个分支合并的提交来说，则有多个父亲。  

假设你有三个文件放在一个目录中，你暂存并提交了它们。暂存文件会为每个文件计算一个checksum，在该Git库中保存该版本的文件(Git将它们叫做*blobs*),并将checksum赋值给暂存区。  

当你提交(`commit`)时，Git对每个子目录(在这个例子中，只有根工程目录)进行checksum并且将它们作为树形对象存放在Git库中。然后Git创建一个*commit*对象，该对象有元数据和指向根工程树的指针，所以需要时它可以重新创建快照。  

因此，现在你的Git库中包含了五个对象：三个*blob*(每个分别表示三个文件中的一个的内容)，一个*tree*包含了目录的内容并且指定了哪个文件名作为哪个*blob*保存，以及一个*commit*包含了指向该树的指针以及所有的元数据。  

如果你进行了修改并且再次提交，则此次提交会包含指向之前一次提交(*commit*的指针。  

在Git中的一个分支(**branch**)就是指向这些*commit*其中之一的指针。默认的分支是master。  

#### Creating a New Branch
创建一个新的分支其实就是创建了一个新的指针供你移动。`git branch <branch_name>`即创建了一个新分支，该分支指向当前的`commit`。  

Git通过一个特殊的**HEAD**指针知晓当前你在哪个分支上。`HEAD`指针指向某一个`branch`指针。默认情况下该指针指向master。注意：使用`git branch`只是创建分支，而不会切换到该分支，因此`git branch`不会改变`HEAD`指针的指向。  

#### Switching Branches
切换分支可用下面的指令：  
```
git checkout <branch_name>
```
该指令把`HEAD`指针指向`<branch_name>`代表的分支指针。  

如果在该情况下进行`commit`，则原来的`master`分支指针仍指向原来的位置，而切换到的分支指针和`HEAD`指针则向前移动了。  

如果在此之后，将分支切换回`master`(`git checkout master`)，则`HEAD`指针会指向`master`，并且目录中的文件会切换回`master`指向的快照中的文件。  

接下来，如果你进行了改动并再次`commit`，则你的工程历史就分叉了。你创建了一个分支，切换到该分支然而完成了一些工作。然后你切换回原分支，又完成了一些工作。接下去你可以在分支间自由切换并在必要时合并这些分支。  

一个Git中的分支其实就是`commit`的40字节SHA-1校验和，因此分支的创建和销毁都很简单。  

`git checkout -b <branch_name>`可以创建并切换到该分支。  

### Basic Branching and Merging
#### Basic Branching
假设你在完成工作，之前已经有几个`commits`在`master`分支上了。  
```
          master
            |
c0 <- c1 <- c2
```

你决定在#53号事务上工作。你使用了下面的命令  
```
git checkout -b iss53
```
于是现在情况变成了  
```
          master
            |
c0 <- c1 <- c2
            |
          iss53
```

你完成了一些工作，进行了提交。则`iss53`分支前进了，如下所示  
```
          master
            |
c0 <- c1 <- c2 <- c3
                  |
                iss53
```

现在，假设你接到信息，需要紧急修复一个bug，则此时可以先从`iss53`分支切换到`master`分支。  
```
git checkout master
```
注意：如果工作目录或者暂存区中有未提交的改变和正在签出的分支冲突，则Git不会让你切换分支。   

然后，需要创造一个`hotfix`分支，并且修改bug、提交，则此时如下所示  
```
          master hotfix
            |     |
c0 <- c1 <- c2 <- c4
             | <- c3               
                  |
                iss53
```

接下去，你可以切换回`master`分支，然后进行分支合并。  
```
$ git checkout master
$ git merge hotfix
```
这里有个`fast-forward`模式。在上面的例子中，`hotfix`就在`master`之后，因此直接将`master`指针往后移一步则完成了分支合并。  
```
                master
                  ||
                hotfix
                  |
c0 <- c1 <- c2 <- c4
             | <- c3               
                  |
                iss53
```

现在，由于`master`和`hotfix`一样都指向同样的`commit`，则可以删除`hotfix`  
```
$ git branch -d hotfix
```

接着你可以切换回`iss53`分支继续工作并提交。  
```
                master
                  |
c0 <- c1 <- c2 <- c4
             | <- c3 <- c5
                        |
                      iss53
```

注意：你在`hotfix`中完成的工作不会包含在`iss53`中。你可以把`master`分支的内容和当前内容合并，也可以在完成`iss53`的工作中将其合并到主分支中。  

#### Basic Merging
假设你想把`iss53`分支合并到`master`分支，则和之前一样，先`checkout`再`merge`即可  
```
$ git checkout master
$ git merge iss53
```
和之前的合并不同的是，这是一个`recursive`的模式。这是因为当前分支的提交不是正在合并进来的提交的直接祖先。在这样的情况下，Git进行一个简单的三路合并，使用两个分支指针指向的快照以及两者的共同祖先。  

```
         common master(merge into)
            |     |
c0 <- c1 <- c2 <- c4
             | <- c3 <- c5
                        |
                      iss53(merge in)
```

Git会创建一个新的快照，并自动创建一个指向它的提交(*commit*)。这被称为一个合并提交(*merge commit*)，并且有两个父亲(因此是特殊的)。  

```
                           master
                             |
c0 <- c1 <- c2 <- c4 <------ c6
             | <- c3 <- c5 <-|
                        |
                      iss53
```

现在你就可以删除`iss53`分支了。  

#### Basic Merge Conflicts
如果你正在合并的两个分支中的相同文件的相同部分并不一样，则Git不会完整干净的合并它们，而是会发生合并冲突。  

Git不会自动创建新的合并提交，而是会暂停过程。可以通过`git status`查看在发生合并冲突后哪些文件是`unmerged`状态的。  

Git会在文件中发生冲突的地方加上标志。  
```
<<<<<<< HEAD:index.html
<div id="footer">contact : email.support@github.com</div>
=======
<div id="footer">
please contact us at support@github.com
</div>
>>>>>>> iss53:index.html
```

它的意思是`HEAD`版本的内容在`===`符号的上方和`<<<`符号的下方，`iss53`版本的内容在`===`的下方而在`>>>`的上方。  

你可以通过自己手动修改冲突，再运行`git add`将它们标记为`merged`。  

还有一种选择是通过合并工具进行合并。命令是`git mergetool`。  

最后，可以通过运行`git commit`提交此次合并。默认的消息感觉比较好，也可以自行写消息介绍你合并的过程。
