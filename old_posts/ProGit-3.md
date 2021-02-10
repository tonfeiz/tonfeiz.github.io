---
title: ProGit Part III
date: "2019-06-19"
summary: "由于之前已经写过了，然而不小心丢失了，因此这里就列一下Git基础中剩余的各个命令及其作用" 
---
由于之前已经写过了，然而不小心丢失了，因此这里就列一下Git基础中剩余的各个命令及其作用。  

```
git commit --amend: 覆盖上一次的`commit`，主要用于微小的改动的提交  
git reset HEAD <file>: 将staged状态的文件改为unstaged
git checkout -- <file>: 将modified状态的文件改为上一次快照中的样子，可能丢失东西！  
git remote: 展示远程库  
git remote -v: 展示远程库及其URL  
git remote add <remote> URL: 添加远程库并指定本地用名字  
git fetch <remote>: 从远程库中获取内容但不合并  
git pull <remote>: 从远程库中获取内容并合并  
git push <remote> <branch>: 推送内容到远程库  
git remote show <remote>: 展示远程库的相关内容
git remote rename <oldname> <newname>: 重命名远程库
git remote remove <remote>: 删除远程库
```
