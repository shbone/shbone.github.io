---
icon: pen-to-square
date: 2023-08-30
category:
  - 框架学习
title: ES分布式的结构分享
tag:
  - ES存储结构
  - ES分布式
---

# ES 分布式存储原理


介绍ES的分布式架构原理，包括**ES存储结构和ES分布式框架设计**

<!-- more -->

> 参考：[ES 的分布式架构原理能说一下么（ES 是如何实现分布式的啊）？](https://github.com/doocs/advanced-java/blob/main/docs/high-concurrency/es-architecture.md)

## 1. ES 存储结构
ES集群是在多个机器上启动ES进程组成的集群。

### 1.1 ES 索引分区

ES 中**存储数据的基本单位是索引（index）**，比如说你现在要在 ES 中存储一些订单数据，你就应该在 ES 中创建一个索引 order_idx ，所有的订单数据就都写到这个索引里面去，一个索引差不多就是相当于是 mysql 里的一个数据库。

ES 的索引分为五个层级
- Index -> Type -> Mapping -> document -> field

下面是ES和MySQL的类比表格

|  ES   | MySQL  | ES 概念理解|
|  ----  | ----  | ----  |
| Index  | schema |索引是一组具有相似特征的文档的集合。|
| Type  | Table | 类型是索引中文档的逻辑分组。例如，对于博客文章索引，可以将文章文档分为“技术”、“旅游”等不同的类型。|
| Mapping  | 表结构 |映射定义了索引中每个字段的类型和属性。例如，对于标题字段，可以定义其类型为“文本”，并指定分词器等属性|
| document  | data |文档是Elasticsearch中最基本的数据单元。每个文档都是一个JSON对象，包含一组键值对，代表一条记录。相当于关系型数据库中的行|
| field  | field |字段是文档中的数据项。例如，在博客文章文档中，标题、正文和作者等都是字段。|
[ES具体概念理解](https://blog.51cto.com/u_16099361/6480958)

### 1.2 ES shard分区
- **支持横向拓展**：一个索引可以拆分成多个 shard ，每个 shard 存储部分数据

> 比如你数据量是 3T，3 个 shard，每个 shard 就 1T 的数据，若现在数据量增加到 4T，怎么扩展，很简单，重新建一个有 4 个 shard 的索引，将数据导进

- **增强吞吐能力**：多台机器上并行分布式执行，提高了吞吐量和性能。

- **提高读写能力**： `primary shard` 进行读、写；`replica shard` 进行读。`primary shard`写完后，会同步到其他`replica shard`上。

## 2. ES 框架设计

![ES 框架图](/assets/frame/es-cluster.png)
每个ES集群都会有一个master节点
master 节点的职责：维护索引元数据、负责切换 primary shard 和 replica shard 身份，即节点上的`primary shard`挂了，其他`replica shard`替换；`replica shard `挂了，master 节点会控制将缺失的 `replica shard `分配过去。

以上是最基本的ES分布式引擎的框架设计。


