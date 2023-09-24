---
title: ThreadPoolExecutor线程池
article: true
icon: editor
date: 2023-09-24
category: 
  - JAVA学习

tag:
  - 多线程
  - JUC
---

# ThreadPoolExecutor线程池

> 参考：[什么是线程池](https://javabetter.cn/thread/pool.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E7%BA%BF%E7%A8%8B%E6%B1%A0)

## 1. 什么是线程池

线程池其实是一种池化的技术实现，**池化技术的核心思想就是实现资源的复用，避免资源的重复创建和销毁带来的性能开销**。线程池可以管理一堆线程，让线程执行完任务之后不进行销毁，而是继续去处理其它线程已经提交的任务。

## 2. 线程池运行原理


## 3. ThreadPoolExecutor执行方法

```java
// 一共分为三步
public void execute(Runnable command) {
        // 首先检查提交的任务是否为null，是的话则抛出NullPointerException。
        if (command == null)
            throw new NullPointerException();
        // 获取线程池的状态，包括线程池状态（？），工作线程数量，初始数量为负数
        // get获取线程的value
        int c = ctl.get();

        // 1. 检查当前运行的工作线程数是否少于核心线程数（corePoolSize）
        if (workerCountOf(c) < corePoolSize) {
          // 少于核心线程数量则添加worker
            if (addWorker(command, true))
                return;
            c = ctl.get();
        }

        // 2. 尝试将任务添加到任务队列中
        if (isRunning(c) && workQueue.offer(command)) {
            int recheck = ctl.get();
            // 双重检查线程池的状态
            if (! isRunning(recheck) && remove(command)) // 如果线程池已经停止，从队列中移除任务， && 左面为true才会执行remove函数移除任务
                reject(command);
            // 如果线程池正在运行，但是工作线程数为0，尝试添加一个新的工作线程
            else if (workerCountOf(recheck) == 0)
                addWorker(null, false);
        }
        // 3. 如果任务队列满了，尝试添加一个新的非核心工作线程来执行任务
        else if (!addWorker(command, false))
            reject(command);
    }
```

```java
private static final int CAPACITY   = (1 << COUNT_BITS) - 1;
private static int workerCountOf(int c)  { return c & CAPACITY; } //与运算获取线程数
```

```java
private static final int SHUTDOWN   =  0 << COUNT_BITS;
private static boolean isRunning(int c) { return c < SHUTDOWN; } //小于0，即为线程池正在运行
```

```java
workQueue.offer(command) // 能够添加返回True,不能添加返回False
```