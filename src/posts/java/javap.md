---
title: javap使用
article: true
icon: editor
date: 2023-09-01
category:
  - JAVA学习
tag:
  - 常量池
  - JVM异常
---


# javap反编译器命令


<!-- more -->


## 1. javap实际使用
**javap可以用于反编译和查看编译器编译后的字节码**。平时一般用`javap -c`比较多，该命令用于列出每个方法所执行的JVM指令，并显示每个方法的字节码的实际作用。可以通过字节码和源代码的对比，深入分析java的编译原理，了解和解决各种Java原理级别的问题。


- 示例
1. 构造一个java文件
```java
java文件
public class ConstPool {
    public static void main(String[] args) {
        System.out.println("ConstPool.main");
    }
}
```
2. `javac ConstPool.java` 执行生成`ConstPool.class`二进制文件
3. `javap -c ConstPool.class` 反编译展示`java`字节码文件

::: tip

二进制`.class`文件的组成
- 类基本信息
- 常量池
- 类方法定义

::: 

```java
Classfile /home/root1/sunhb/selflearn/SunSpring/src/main/java/com/sunhb/sunspring/JVM/ConstPool.class
  Last modified 2023-9-3; size 450 bytes
  MD5 checksum 1622d49f4c56fbb2f0292f5a2bfafc31
  Compiled from "ConstPool.java"
public class com.sunhb.sunspring.JVM.ConstPool
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #6.#15         // java/lang/Object."<init>":()V
   #2 = Fieldref           #16.#17        // java/lang/System.out:Ljava/io/PrintStream;
   #3 = String             #18            // ConstPool.main
   #4 = Methodref          #19.#20        // java/io/PrintStream.println:(Ljava/lang/String;)V
   #5 = Class              #21            // com/sunhb/sunspring/JVM/ConstPool
   #6 = Class              #22            // java/lang/Object
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               main
  #12 = Utf8               ([Ljava/lang/String;)V
  #13 = Utf8               SourceFile
  #14 = Utf8               ConstPool.java
  #15 = NameAndType        #7:#8          // "<init>":()V
  #16 = Class              #23            // java/lang/System
  #17 = NameAndType        #24:#25        // out:Ljava/io/PrintStream;
  #18 = Utf8               ConstPool.main
  #19 = Class              #26            // java/io/PrintStream
  #20 = NameAndType        #27:#28        // println:(Ljava/lang/String;)V
  #21 = Utf8               com/sunhb/sunspring/JVM/ConstPool
  #22 = Utf8               java/lang/Object
  #23 = Utf8               java/lang/System
  #24 = Utf8               out
  #25 = Utf8               Ljava/io/PrintStream;
  #26 = Utf8               java/io/PrintStream
  #27 = Utf8               println
  #28 = Utf8               (Ljava/lang/String;)V
{
  public com.sunhb.sunspring.JVM.ConstPool();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 8: 0

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String ConstPool.main
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 10: 0
        line 11: 8
}
SourceFile: "ConstPool.java"


```
## 2. 参数摘要

```text
-help 帮助
-l 输出行和变量的表
-public 只输出public方法和域
-protected 只输出public和protected类和成员
-package 只输出包，public和protected类和成员，这是默认的
-p -private 输出所有类和成员
-s 输出内部类型签名
-c 输出分解后的代码，例如，类中每一个方法内，包含java字节码的指令，
-verbose 输出栈大小，方法参数的个数
-constants 输出静态final常量
```