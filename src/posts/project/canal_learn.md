---
icon: edit
date: 2023-11-28
article: true
category:
  - 项目分享
tag:
  - Java

---

# Canal监听MySQL增量数据

Canal,主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费服务。
分享主要围绕如何使用Canal快速搭建Mysql增量数据订阅服务，针对Mysql表的增删改查服务进行监听。

<!-- more -->

[代码仓库](https://github.com/alibaba/canal)
[视屏讲解]()

## 1. Canal功能

1.1 数据同步
1.2 数据展示
1.3 低版本迁移高版本

## 2. Canal 实践 

### 2.1 下载Canal 
[canal-1.1.7下载](https://github.com/alibaba/canal/releases/tag/canal-1.1.7)

选择`canal.deployer-1.1.7.tar.gz`下载

::: tip

canal的各个组件的用途各不相同，下面分别介绍下：
canal-deploy：用于监听MySQL的binlog，是一个伪装的MySQL从库，只负责从MySQL主库接收数据，不做处理。
canal-adapter：canal的客户端，从canal-deploy中获取数据，然后同步数据到目标数据源。
canal-admin：为canal提供整体配置管理、节点运维等面向运维的功能，提供相对友好的WebUI操作界面，方便更多用户快速和安全的操作

::: 


### 2.2 配置

[官方参考文档](https://github.com/alibaba/canal/wiki/QuickStart)

#### 2.2.1 Mysql 配置
- 对于自建 MySQL , 需要先开启 Binlog 写入功能，配置 binlog-format 为 ROW 模式，my.cnf 中配置如下
```
[mysqld]
log-bin=mysql-bin # 开启 binlog
binlog-format=ROW # 选择 ROW 模式
server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
```

- 使用命令查看是否打开binlog模式
```shell
show variables like  `log_bin`;# 显示ON 即为打开binlog模式
```

#### 2.2.2 Canal 配置
- 解压Canal 
- conf文件夹下修改 conf/example/instance.properties
  重点修改`canal.instance.dbUsername`,`canal.instance.dbPassword`
```shell
## mysql serverId , v1.0.26+ will autoGen
## v1.0.26版本后会自动生成slaveId，所以可以不用配置
# canal.instance.mysql.slaveId=0

# 数据库地址
canal.instance.master.address=127.0.0.1:3306
# binlog日志名称
canal.instance.master.journal.name=mysql-bin.000001
# mysql主库链接时起始的binlog偏移量
canal.instance.master.position=154
# mysql主库链接时起始的binlog的时间戳
canal.instance.master.timestamp=
canal.instance.master.gtid=

# username/password
# 在MySQL服务器授权的账号密码
canal.instance.dbUsername=xxx
canal.instance.dbPassword=xxx
# 字符集
canal.instance.connectionCharset = UTF-8
# enable druid Decrypt database password
canal.instance.enableDruid=false

# table regex .*\\..*表示监听所有表 也可以写具体的表名，用，隔开
canal.instance.filter.regex=.*\\..*
# mysql 数据解析表的黑名单，多个表用，隔开
canal.instance.filter.black.regex=
```

### 2.3 启动Canal Demo 

#### 2.3.1 启动Canal 
- `bin` 目录下 `start.sh` (Linux系统)或者`start.bat`(Windows系统)

``` shell
./start.sh 
```
> jps 命令可以查看是否正常启动
> 正常启动显示`xxxx CanalLauncher`

#### 2.3.2 运行Maven Canal Demo项目

```xml
    <dependency>
      <groupId>com.alibaba.otter</groupId>
      <artifactId>canal.client</artifactId>
      <version>1.1.0</version>
    </dependency>
```
```java
public static void main(String[] args) throws InvalidProtocolBufferException {
        //1.获取 canal 连接对象
        CanalConnector canalConnector = CanalConnectors.newSingleConnector(new InetSocketAddress("localhost", 11111), "example", "", "");
        while (true) {
            //2.获取连接
            canalConnector.connect();
            //3.指定要监控的数据库
            canalConnector.subscribe("canal_demo.*");
            //4.获取 Message
            // 一个Message 对应一个Sql语句
            Message message = canalConnector.get(100);
            List<CanalEntry.Entry> entries = message.getEntries();
            if (entries.size() <= 0) {
                System.out.println("没有数据，休息一会");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            } else {
                for (CanalEntry.Entry entry : entries) {
                    // 获取表名
                    String tableName = entry.getHeader().getTableName();
                    //  Entry 类型
                    CanalEntry.EntryType entryType = entry.getEntryType();
                    //  判断 entryType 是否为 ROWDATA
                    if (CanalEntry.EntryType.ROWDATA.equals(entryType)) {
                        //  序列化数据
                        ByteString storeValue = entry.getStoreValue();
                        //  反序列化
                        CanalEntry.RowChange rowChange = CanalEntry.RowChange.parseFrom(storeValue);
                        // 获取事件类型
                        CanalEntry.EventType eventType = rowChange.getEventType();
                        // 获取具体的数据
                        List<CanalEntry.RowData> rowDatasList = rowChange.getRowDatasList();
                        // 遍历并打印数据
                        for (CanalEntry.RowData rowData : rowDatasList) {
                            List<CanalEntry.Column> beforeColumnsList = rowData.getBeforeColumnsList();
                            Map<String, Object> bMap = new HashMap<String,Object>();
                            for (CanalEntry.Column column : beforeColumnsList) {
                                bMap.put(column.getName(), column.getValue());
                            }
                            Map<String, Object> afMap = new HashMap<String,Object>();
                            List<CanalEntry.Column> afterColumnsList = rowData.getAfterColumnsList();
                            for (CanalEntry.Column column : afterColumnsList) {
                                afMap.put(column.getName(), column.getValue());
                            }
                            System.out.println("表名:" + tableName + ",操作类型:" + eventType);
                            System.out.println("改前:" + bMap );
                            System.out.println("改后:" + afMap );
                        }
                    }
                }
            }
        }
    }

```


``` shell
UPDATE USER set name = "ssskkk" where name = "zhangsan";
```
修改数据后的日志打印

```text
没有数据，休息一会
没有数据，休息一会
没有数据，休息一会
表名:USER,操作类型:UPDATE
改前:{name=zhangsan, id=4, age=18}
改后:{name=ssskkk, id=4, age=18}
表名:USER,操作类型:UPDATE
改前:{name=zhangsan, id=5, age=188}
改后:{name=ssskkk, id=5, age=188}
```