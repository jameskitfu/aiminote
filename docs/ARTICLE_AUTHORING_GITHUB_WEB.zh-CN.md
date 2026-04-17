# GitHub 网页发文教程

这份教程适合不会 Git 命令的人。只要能打开 GitHub 网页，就可以直接发文章。

适用对象：

- 只会网页操作
- 不想装开发环境
- 只想复制模板然后改内容

## 发文前准备

确认你已经有这个仓库的写入权限：

- 仓库：`jameskitfu/aiminote`

如果没有权限，先让仓库管理员把你加成协作者。

## 最简单流程

1. 打开 GitHub 仓库
2. 找到模板文件
3. 复制模板内容
4. 去文章目录新建文章文件
5. 粘贴并修改内容
6. 提交到 `main`
7. 等待网站自动发布

## 第一步：打开仓库

在浏览器打开：

[https://github.com/jameskitfu/aiminote](https://github.com/jameskitfu/aiminote)

## 第二步：打开模板

进入：

`docs/post-template.md`

或者直接打开：

[docs/post-template.md](https://github.com/jameskitfu/aiminote/blob/main/docs/post-template.md)

点击右上角的编辑或直接复制全文内容。

## 第三步：进入文章目录

进入：

`src/content/posts`

或者直接打开：

[src/content/posts](https://github.com/jameskitfu/aiminote/tree/main/src/content/posts)

## 第四步：新建文章文件

点击：

- `Add file`
- `Create new file`

然后输入文件名。

示例：

- `my-first-post.md`
- `react-study-notes.md`
- `how-to-learn-typescript.md`

命名建议：

- 用英文
- 全小写
- 单词之间用 `-`
- 结尾必须是 `.md`

不要这样写：

- `第一篇文章.md`
- `My First Post.md`
- `文章1.txt`

## 第五步：粘贴模板并改内容

把模板内容粘贴进去，再修改这些字段：

```md
---
title: 这里写文章标题
summary: 这里写文章摘要，建议 1-2 句话。
category: React
tags: React, Frontend, Tutorial
coverImage: https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80
publishedAt: 2026-04-17T20:00:00.000Z
---

# 这里写文章标题

这里写开头。
```

### 每个字段怎么写

#### `title`

写文章标题。

示例：

```md
title: React 状态管理入门
```

#### `summary`

写首页显示的文章摘要。

示例：

```md
summary: 这篇文章介绍 React 中几种常见状态管理方式的使用场景。
```

#### `category`

建议先沿用现有分类：

- `React`
- `TypeScript`
- `CSS`

#### `tags`

必须写成一行，用英文逗号分隔：

```md
tags: React, State, Frontend
```

不要写成：

```md
tags:
  - React
  - State
```

#### `coverImage`

填一张公网图片地址。如果没有封面，可以先删掉这一行。

#### `publishedAt`

推荐直接照这个格式写：

```md
publishedAt: 2026-04-17T20:00:00.000Z
```

如果只想改日期，把前面的年月日改掉就行。

## 第六步：写正文

frontmatter 下面就是正常 Markdown 正文。

可以这样写：

```md
# 文章标题

开头简介。

## 第一部分

正文内容。

## 第二部分

- 列表 1
- 列表 2

## 总结

结尾总结。
```

## 第七步：提交

页面最下面会看到提交区域。

一般这样填：

- Commit message：
  - `docs: add new article`

然后选择：

- `Commit directly to the main branch`

再点击：

- `Commit new file`

## 第八步：等待自动发布

提交后不用再做别的事。

网站会自动更新，过一会儿就能在这里看到：

[https://www.aimi.blog](https://www.aimi.blog)

## 发布后怎么检查

发布后建议看这几个地方：

1. 首页有没有出现新文章
2. 文章详情页能不能打开
3. 分类筛选能不能找到
4. 评论区有没有正常显示

## 常见问题

### 1. 文章没显示

先检查：

- 文件是不是放在 `src/content/posts/`
- 文件名是不是 `.md`
- frontmatter 两边有没有 `---`

### 2. 分类不对

检查 `category` 有没有拼错。

### 3. 标签没显示正常

检查 `tags` 是否写成一行逗号分隔。

### 4. 时间不对

检查是不是写成了 `publishedAt`，不要写成 `date`。

## 给你妹妹的最短操作版本

1. 打开仓库
2. 进入 `docs/post-template.md`
3. 复制模板
4. 进入 `src/content/posts`
5. 新建 `xxx.md`
6. 粘贴并改内容
7. 点 `Commit new file`
8. 等网站自动更新
