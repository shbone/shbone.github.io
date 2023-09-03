---
title: JVM存储空间
article: true
icon: editor
date: 2023-09-01
category:
  - JAVA学习
tag:
  - JAVA虚拟机
  - JVM异常
---


# JVM存储空间


Java Virtual Machine(JAVA虚拟机，JVM)内存结构, 包括程序计数器，虚拟机栈，本地方法栈，堆几部分组成。JVM的使用是为保证Java程序跨平台运行，在操作系统层次之上构建的虚拟机，以便实现一次编译，到处运行。


<!-- more -->


## 1. 程序计数器PC
### 1.1 定义
程序计数器用于存放执行指令的地方，可以**看成当前线程所执行的字节码的信号指示器。** 在线程的虚拟机栈中存储。
### 1.2 作用
程序计数器用来确定下一条指令执行的位置。


## 2. 虚拟机栈 Stack

### 2.1 定义
线程运行需要的内存空间，一个栈由多个栈帧组成，一个栈帧对应一个线程，栈帧的生命周期与线程相互对应，保存着参数、返回值、局部变量信息。
### 2.2 栈内存溢出

### 2.3 线程运行诊断
线程私有的

::: tip

Xss 设置虚拟机栈大小
报错 `stack overflow`

::: 

## 3. 本地方法栈 Native Method Stack
线程私有的

## 4. 堆 Heap
线程公有的

::: tip

jps 查看java进程
- 系统中查看java进程

jmap 查看Heap占用 
- `jmap -heap 进程号`

jconsole 查看JVM内存占用情况
- 图形化界面连续监控

:::



## 5. 方法区 Method area

> JDK1.8之后  元空间的配置
> XX:MaxMetaspaceSize = 8m 



### 5.1 常量池

二进制`.class`文件的组成
- 类基本信息
- 常量池
- 类方法定义

