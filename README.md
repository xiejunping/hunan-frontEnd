# hunan-frontEnd

`hunan-frontEnd` 是一个更符合前端实际需要而且更高效的Web开发人员的仓库

`hunan-frontEnd` 的指导原则是”不要重复你自己”(Don’t Repeat Yourself, 或DRY)。

## 自述

* 致敬 Rails 社区的灵魂，长沙前端自发组织一个大家动手维护的组织
* 这个组织没有任何盈利，只是为了好玩，或是扩大前端程序员的圈子
* 无论你是初级前端，还是前端大牛，你来了就是为湖南前端付出一点点力量，也许今天你看到不好处
* 将来你一定有所收获

## 特点

* 约定优于配置

* 更少的代码

* 生成器

## 注意事项

>  可能大家都不怎么会用git的分支开发，但是为了合作效率最大化，希望大家花几分钟看下以下教程

* 查看本地分支

`git branch`

* 查看远程分支

`git branch -r`

* 查看所有分支

`git branch -a`

* 本地创建新的分支

`git branch [branch name]`

* 切换到新的分支

`git checkout [branch name]`

> 创建+切换分支

> `git checkout -b [branch name]`

* 将新分支推送到github

`git push origin [branch name]`

* 删除本地分支

`git branch -d [branch name]`

* 删除github远程分支

`git push origin :[branch name]`

分支名前的冒号代表删除。

### 笔试分享

1、怎么数组去重
```js
es6
// 去除数组的重复成员
[...new Set(array)]

function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

2、js的数据类型，及es6新增的数据类型 共7种

3、伪数组转真数组

4、AMD, CMD, CommonJS和UMD

5、es6新增数据结构 

6、es5的继承方式与es6的继承

