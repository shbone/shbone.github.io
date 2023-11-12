---
title: JAVA何时加锁
article: true
icon: editor
date: 2023-11-11
category: 
  - JAVA学习

tag:
  - JAVA锁
  - JAVA异常
---

# JVM内存结构

线程代码何时适合加锁？

<!-- more -->

::: tip

- 参考：[代码加锁](https://learn.lianglianglee.com/%E4%B8%93%E6%A0%8F/Java%20%E4%B8%9A%E5%8A%A1%E5%BC%80%E5%8F%91%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%20100%20%E4%BE%8B/02%20%E4%BB%A3%E7%A0%81%E5%8A%A0%E9%94%81%EF%BC%9A%E4%B8%8D%E8%A6%81%E8%AE%A9%E2%80%9C%E9%94%81%E2%80%9D%E4%BA%8B%E6%88%90%E4%B8%BA%E7%83%A6%E5%BF%83%E4%BA%8B.md)
- 仓库链接：[《Java业务开发常见错误100例》](https://github.com/JosephZhu1983/java-common-mistakes)
  转载仅用于学习，如有侵权立即删除

::: 


## 1. 线程锁如何锁住变量

### 1.1 问题展示
```java
@Slf4j
public class Interesting {
    volatile int a = 1;
    volatile int b = 1;
    public synchronized void add() {
        log.info("add start");
        for (int i = 0; i < 10000; i++) {
            a++;
            b++;
        }
        log.info("add done");
    }
    public void compare() {
        log.info("compare start");
        for (int i = 0; i < 10000; i++) {
            //a始终等于b吗？
            if (a < b) {
                log.info("a:{},b:{},{}", a, b, a > b);
                //最后的a>b应该始终是false吗？
            }
        }
        log.info("compare done");
    }
}
```

```java
@GetMapping("wrong2")
public String wrong2() {
    Interesting interesting = new Interesting();
    new Thread(() -> interesting.add()).start();
    new Thread(() -> interesting.compare()).start();
    return "OK";
}


```



按道理，a 和 b 同样进行累加操作，应该始终相等，compare 中的第一次判断应该始终不会成立，不会输出任何日志。但是，执行代码后发现不但输出了日志，部分`a`和`b`是不相等的

``` text
[15:44:10.805] [Thread-28] [INFO ] [j.c.lock.lockscope.Interesting:25  ] - a:979751,b:979754,false
[15:44:10.805] [Thread-28] [INFO ] [j.c.lock.lockscope.Interesting:25  ] - a:988792,b:988793,true
[15:44:10.805] [Thread-28] [INFO ] [j.c.lock.lockscope.Interesting:25  ] - a:992597,b:992596,true
[15:44:10.805] [Thread-28] [INFO ] [j.c.lock.lockscope.Interesting:25  ] - a:996236,b:996237,true
[15:44:10.805] [Thread-28] [INFO ] [j.c.lock.lockscope.Interesting:25  ] - a:999856,b:999857,false
[15:44:10.805] [Thread-27] [INFO ] [j.c.lock.lockscope.Interesting:18  ] - add done
[15:44:10.806] [Thread-28] [INFO ] [j.c.lock.lockscope.Interesting:29  ] - compare done
```
### 1.2 问题分析
原因分析，目前尽管`add`函数使用`synchronized`关键字解决了`add`函数线程安全性，但是`compare`函数比较过程中，比较`a`和`b`两个变量，需要先加载`a`,`b`两个变量再比较，如果在加载过程中运行了`add`函数，导致`b`多进行了一次`b++`操作，`b`变量则大于`a`变量，如果`a`多进行一次`a++`操作，`a`变量则大于`b`变量。


### 1.3 问题解决
应该在`add`和`compare`两个函数上都增加排他锁，保证在增加和比较过程中线程的安全性。


``` java
public synchronized void compare() {
      log.info("compare start");
      for (int i = 0; i < 10000; i++) {
          //a始终等于b吗？
          if (a < b) {
              log.info("a:{},b:{},{}", a, b, a > b);
              //最后的a>b应该始终是false吗？
          }
      }
      log.info("compare done");
  }
```
``` java
@GetMapping("right2")
public String right2() {
    Interesting interesting = new Interesting();
    new Thread(() -> interesting.add()).start();
    new Thread(() -> interesting.compareRight()).start();
    return "OK";
}
```
此时运行不会出现`a`和`b`变量不同情况

```text
[16:08:07.512] [Thread-29] [INFO ] [j.c.lock.lockscope.Interesting:13  ] - add start
[16:08:07.522] [Thread-29] [INFO ] [j.c.lock.lockscope.Interesting:18  ] - add done
[16:08:07.522] [Thread-30] [INFO ] [j.c.lock.lockscope.Interesting:33  ] - compare start
[16:08:07.524] [Thread-30] [INFO ] [j.c.lock.lockscope.Interesting:40  ] - compare done
```