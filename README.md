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

## 如何协作开发
- 首先Fork本项目
- Fork后项目就在自己的仓库有了地址，复制该地址（注意一定要在自己的仓库里复制项目的地址）
- 在本地git clone https://github.com/xiejunping/hunan-frontEnd.git (注意这个地址换成上面复制的你自己仓库的地址)
- clone完成进入项目，切换到分支，以v0.0.1为例执行：git checkout v0.0.1
- 在分支下修改文件后add/commit后提交代码git push origin v0.0.1（注意这一步提交如果出错，是因为代码可能冲突了，这时候需要git pull更新代码，然后手动解决冲突）
- 以上步骤完成后在自己fork的项目下可以看到更改
- 最后在fork的项目首页找到pull request按钮提交给作者你的修改

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


# 业务组件封装

* [x] 混合选择组件
* [x] 投放拖拽选择时间段


# 示例


[高效的Web开发社区<https://www.jsvue.cn/components.html>](https://www.jsvue.cn/components.html)

![混合选择组件](https://pic4.zhimg.com/50/v2-7f9f2caa4ebfa00fd70281890d5c97b1_r.gif)

![投放拖拽选择时间段](https://pic3.zhimg.com/50/v2-cde99f883be5da4e937b311af87a80ed_r.gif)
