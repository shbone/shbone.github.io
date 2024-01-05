import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o,c as l,e as i,a as n,b as s,d as t,f as e}from"./app-b4594200.js";const u={},r=n("h1",{id:"canal监听mysql增量数据",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#canal监听mysql增量数据","aria-hidden":"true"},"#"),s(" Canal监听MySQL增量数据")],-1),k=n("p",null,[s("Canal,主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费服务。"),n("br"),s(" 分享主要围绕如何使用Canal快速搭建Mysql增量数据订阅服务，针对Mysql表的增删改查服务进行监听。")],-1),d={class:"hint-container tip"},m=n("p",{class:"hint-container-title"},"提示",-1),v={href:"https://github.com/alibaba/canal",target:"_blank",rel:"noopener noreferrer"},b=n("br",null,null,-1),g={href:"https://www.bilibili.com/video/BV1Uc411P7XN",target:"_blank",rel:"noopener noreferrer"},h=e('<h2 id="_1-canal功能" tabindex="-1"><a class="header-anchor" href="#_1-canal功能" aria-hidden="true">#</a> 1. Canal功能</h2><p>1.1 数据同步<br> 1.2 数据展示<br> 1.3 低版本迁移高版本</p><h2 id="_2-canal-实践" tabindex="-1"><a class="header-anchor" href="#_2-canal-实践" aria-hidden="true">#</a> 2. Canal 实践</h2><h3 id="_2-1-下载canal" tabindex="-1"><a class="header-anchor" href="#_2-1-下载canal" aria-hidden="true">#</a> 2.1 下载Canal</h3>',4),f={href:"https://github.com/alibaba/canal/releases/tag/canal-1.1.7",target:"_blank",rel:"noopener noreferrer"},y=e('<p>选择<code>canal.deployer-1.1.7.tar.gz</code>下载</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>canal的各个组件的用途各不相同，下面分别介绍下：<br> canal-deploy：用于监听MySQL的binlog，是一个伪装的MySQL从库，只负责从MySQL主库接收数据，不做处理。<br> canal-adapter：canal的客户端，从canal-deploy中获取数据，然后同步数据到目标数据源。<br> canal-admin：为canal提供整体配置管理、节点运维等面向运维的功能，提供相对友好的WebUI操作界面，方便更多用户快速和安全的操作</p></div><h3 id="_2-2-配置" tabindex="-1"><a class="header-anchor" href="#_2-2-配置" aria-hidden="true">#</a> 2.2 配置</h3>',3),_={href:"https://github.com/alibaba/canal/wiki/QuickStart",target:"_blank",rel:"noopener noreferrer"},C=e(`<h4 id="_2-2-1-mysql-配置" tabindex="-1"><a class="header-anchor" href="#_2-2-1-mysql-配置" aria-hidden="true">#</a> 2.2.1 Mysql 配置</h4><ul><li>对于自建 MySQL , 需要先开启 Binlog 写入功能，配置 binlog-format 为 ROW 模式，my.cnf 中配置如下</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysqld]
log-bin=mysql-bin # 开启 binlog
binlog-format=ROW # 选择 ROW 模式
server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用命令查看是否打开binlog模式</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>show variables like  <span class="token variable"><span class="token variable">\`</span>log_bin<span class="token variable">\`</span></span><span class="token punctuation">;</span><span class="token comment"># 显示ON 即为打开binlog模式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-2-2-canal-配置" tabindex="-1"><a class="header-anchor" href="#_2-2-2-canal-配置" aria-hidden="true">#</a> 2.2.2 Canal 配置</h4><ul><li>解压Canal</li><li>conf文件夹下修改 conf/example/instance.properties<br> 重点修改<code>canal.instance.dbUsername</code>,<code>canal.instance.dbPassword</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## mysql serverId , v1.0.26+ will autoGen</span>
<span class="token comment">## v1.0.26版本后会自动生成slaveId，所以可以不用配置</span>
<span class="token comment"># canal.instance.mysql.slaveId=0</span>

<span class="token comment"># 数据库地址</span>
<span class="token assign-left variable">canal.instance.master.address</span><span class="token operator">=</span><span class="token number">127.0</span>.0.1:3306
<span class="token comment"># binlog日志名称</span>
<span class="token assign-left variable">canal.instance.master.journal.name</span><span class="token operator">=</span>mysql-bin.000001
<span class="token comment"># mysql主库链接时起始的binlog偏移量</span>
<span class="token assign-left variable">canal.instance.master.position</span><span class="token operator">=</span><span class="token number">154</span>
<span class="token comment"># mysql主库链接时起始的binlog的时间戳</span>
<span class="token assign-left variable">canal.instance.master.timestamp</span><span class="token operator">=</span>
<span class="token assign-left variable">canal.instance.master.gtid</span><span class="token operator">=</span>

<span class="token comment"># username/password</span>
<span class="token comment"># 在MySQL服务器授权的账号密码</span>
<span class="token assign-left variable">canal.instance.dbUsername</span><span class="token operator">=</span>xxx
<span class="token assign-left variable">canal.instance.dbPassword</span><span class="token operator">=</span>xxx
<span class="token comment"># 字符集</span>
canal.instance.connectionCharset <span class="token operator">=</span> UTF-8
<span class="token comment"># enable druid Decrypt database password</span>
<span class="token assign-left variable">canal.instance.enableDruid</span><span class="token operator">=</span>false

<span class="token comment"># table regex .*\\\\..*表示监听所有表 也可以写具体的表名，用，隔开</span>
<span class="token assign-left variable">canal.instance.filter.regex</span><span class="token operator">=</span>.*<span class="token punctuation">\\</span><span class="token punctuation">\\</span><span class="token punctuation">..</span>*
<span class="token comment"># mysql 数据解析表的黑名单，多个表用，隔开</span>
<span class="token assign-left variable">canal.instance.filter.black.regex</span><span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-启动canal-demo" tabindex="-1"><a class="header-anchor" href="#_2-3-启动canal-demo" aria-hidden="true">#</a> 2.3 启动Canal Demo</h3><h4 id="_2-3-1-启动canal" tabindex="-1"><a class="header-anchor" href="#_2-3-1-启动canal" aria-hidden="true">#</a> 2.3.1 启动Canal</h4><ul><li><code>bin</code> 目录下 <code>start.sh</code> (Linux系统)或者<code>start.bat</code>(Windows系统)</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./start.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>jps 命令可以查看是否正常启动<br> 正常启动显示<code>xxxx CanalLauncher</code></p></blockquote><h4 id="_2-3-2-运行maven-canal-demo项目" tabindex="-1"><a class="header-anchor" href="#_2-3-2-运行maven-canal-demo项目" aria-hidden="true">#</a> 2.3.2 运行Maven Canal Demo项目</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba.otter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>canal.client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.1.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InvalidProtocolBufferException</span> <span class="token punctuation">{</span>
        <span class="token comment">//1.获取 canal 连接对象</span>
        <span class="token class-name">CanalConnector</span> canalConnector <span class="token operator">=</span> <span class="token class-name">CanalConnectors</span><span class="token punctuation">.</span><span class="token function">newSingleConnector</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token string">&quot;localhost&quot;</span><span class="token punctuation">,</span> <span class="token number">11111</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;example&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//2.获取连接</span>
            canalConnector<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//3.指定要监控的数据库</span>
            canalConnector<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token string">&quot;canal_demo.*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//4.获取 Message</span>
            <span class="token comment">// 一个Message 对应一个Sql语句</span>
            <span class="token class-name">Message</span> message <span class="token operator">=</span> canalConnector<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>Entry</span><span class="token punctuation">&gt;</span></span> entries <span class="token operator">=</span> message<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>entries<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;没有数据，休息一会&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>Entry</span> entry <span class="token operator">:</span> entries<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 获取表名</span>
                    <span class="token class-name">String</span> tableName <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//  Entry 类型</span>
                    <span class="token class-name">CanalEntry<span class="token punctuation">.</span>EntryType</span> entryType <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getEntryType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">//  判断 entryType 是否为 ROWDATA</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>EntryType</span><span class="token punctuation">.</span><span class="token constant">ROWDATA</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>entryType<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">//  序列化数据</span>
                        <span class="token class-name">ByteString</span> storeValue <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getStoreValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">//  反序列化</span>
                        <span class="token class-name">CanalEntry<span class="token punctuation">.</span>RowChange</span> rowChange <span class="token operator">=</span> <span class="token class-name">CanalEntry<span class="token punctuation">.</span>RowChange</span><span class="token punctuation">.</span><span class="token function">parseFrom</span><span class="token punctuation">(</span>storeValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 获取事件类型</span>
                        <span class="token class-name">CanalEntry<span class="token punctuation">.</span>EventType</span> eventType <span class="token operator">=</span> rowChange<span class="token punctuation">.</span><span class="token function">getEventType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 获取具体的数据</span>
                        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>RowData</span><span class="token punctuation">&gt;</span></span> rowDatasList <span class="token operator">=</span> rowChange<span class="token punctuation">.</span><span class="token function">getRowDatasList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 遍历并打印数据</span>
                        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>RowData</span> rowData <span class="token operator">:</span> rowDatasList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>Column</span><span class="token punctuation">&gt;</span></span> beforeColumnsList <span class="token operator">=</span> rowData<span class="token punctuation">.</span><span class="token function">getBeforeColumnsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> bMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>Column</span> column <span class="token operator">:</span> beforeColumnsList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                bMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>column<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> column<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                            <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> afMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>Column</span><span class="token punctuation">&gt;</span></span> afterColumnsList <span class="token operator">=</span> rowData<span class="token punctuation">.</span><span class="token function">getAfterColumnsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CanalEntry<span class="token punctuation">.</span>Column</span> column <span class="token operator">:</span> afterColumnsList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                afMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>column<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> column<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;表名:&quot;</span> <span class="token operator">+</span> tableName <span class="token operator">+</span> <span class="token string">&quot;,操作类型:&quot;</span> <span class="token operator">+</span> eventType<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;改前:&quot;</span> <span class="token operator">+</span> bMap <span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;改后:&quot;</span> <span class="token operator">+</span> afMap <span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：修改更新数据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>UPDATE <span class="token environment constant">USER</span> <span class="token builtin class-name">set</span> name <span class="token operator">=</span> <span class="token string">&quot;ssskkk&quot;</span> where name <span class="token operator">=</span> <span class="token string">&quot;zhangsan&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改数据后的日志打印</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>没有数据，休息一会
没有数据，休息一会
没有数据，休息一会
表名:USER,操作类型:UPDATE
改前:{name=zhangsan, id=4, age=18}
改后:{name=ssskkk, id=4, age=18}
表名:USER,操作类型:UPDATE
改前:{name=zhangsan, id=5, age=188}
改后:{name=ssskkk, id=5, age=188}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function x(w,q){const a=c("ExternalLinkIcon");return o(),l("div",null,[r,k,i(" more "),n("div",d,[m,n("p",null,[n("a",v,[s("代码仓库"),t(a)]),b,n("a",g,[s("视屏讲解"),t(a)])])]),h,n("p",null,[n("a",f,[s("canal-1.1.7下载"),t(a)])]),y,n("p",null,[n("a",_,[s("官方参考文档"),t(a)])]),C])}const L=p(u,[["render",x],["__file","canal_learn.html.vue"]]);export{L as default};