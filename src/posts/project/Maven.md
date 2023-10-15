---
icon: edit
date: 2023-08-27
article: true
category:
  - 项目分享
tag:
  - maven
  - springboot
---

# Maven 自动化构建工具分享



本篇文章分享**Maven**的作用和自动化构建项目的常见方法，如`clean`,`install`,`package`等命令

<!-- more -->


> [原文：面试官问我maven package和install的区别](https://segmentfault.com/a/1190000021609439) 
>
> 如有侵权，立即删除

## 1. Maven是什么
**Maven是Apache软件基金会唯一维护的一款自动化构建工具**，专注于服务Java平台的项目构建和依赖管理。

Maven是基于项目对象模型（POM），可以通过一小段描述信息来管理项目的构建、报告和文档的软件项目管理工具。

## 2. Maven的作用
- 管理jar包之间的依赖关系
    - Maven 可以替我们自动的将当前 jar 包所依赖的其他所有 jar 包全部导入进来
- 获取第三方jar包
    - Maven 提供了一个完全统一规范的 jar 包管理体系，只需要在项目中以坐标的方式依赖一个 jar 包，Maven 就会自动从中央仓库进行下载到本地仓库
- 将项目拆分成多个工程模块
- **构建项目（打包，编译等）**

## 3. Maven 构建项目的主要环节

- 清理（clean）：删除以前的编译结果（删除`target`），为重新编译做好准备
- 编译（compile）：将Java 源程序编译为字节码文件，生成`target`目录。
- 测试（test）：针对项目中的关键点进行测试，确保项目在迭代开发过程中关键点的正确性
- 打包（package）：将一个包含诸多文件的工程封装为一个压缩文件用于安装或部署。Java 工程对应 jar 包，Web工程对应 war 包。`package`包含了`compile`命令的过程。
- 安装（install）：在 Maven 环境下特指将打包的结果——jar 包或 war 包安装到本地仓库中。
- 部署（deploy）：将打包的结果部署到远程仓库或将 war 包部署到服务器上运行。

## 4. Maven 常用命令

``` xml
mvn -version/-v 显示版本信息

mvn clean 清空生成的文件

mvn compile 编译

mvn test 编译并测试

mvn package 生成target目录，编译、测试代码，生成测试报告，生成jar/war文件

mvn site 生成项目相关信息的网站

mvn clean compile 表示先运行清理之后运行编译，会将代码编译到target文件夹中

mvn clean package 运行清理和打包

mvn clean install 运行清理和安装，会将打好的包安装到本地仓库中，以便其他的项目可以调用

mvn clean deploy 运行清理和发布
```


::: tip

-DskipTests跟-Dmaven.test.skip=true的区别
1) -DskipTests

不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。

2) -Dmaven.test.skip=true

不执行测试用例，也不编译测试用例类。

一般建议使用第二种，直接忽略测试的编译，如下：
```xml
mvn clean package -Dmaven.test.skip=true
```

:::