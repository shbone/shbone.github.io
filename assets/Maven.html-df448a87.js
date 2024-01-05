import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as s,c as r,e as t,a as e,b as a,d as c,f as d}from"./app-b4594200.js";const v={},o=e("h1",{id:"maven-自动化构建工具分享",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#maven-自动化构建工具分享","aria-hidden":"true"},"#"),a(" Maven 自动化构建工具分享")],-1),m=e("p",null,[a("本篇文章分享"),e("strong",null,"Maven"),a("的作用和自动化构建项目的常见方法，如"),e("code",null,"clean"),a(","),e("code",null,"install"),a(","),e("code",null,"package"),a("等命令")],-1),u={href:"https://segmentfault.com/a/1190000021609439",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"如有侵权，立即删除",-1),h=d(`<h2 id="_1-maven是什么" tabindex="-1"><a class="header-anchor" href="#_1-maven是什么" aria-hidden="true">#</a> 1. Maven是什么</h2><p><strong>Maven是Apache软件基金会唯一维护的一款自动化构建工具</strong>，专注于服务Java平台的项目构建和依赖管理。</p><p>Maven是基于项目对象模型（POM），可以通过一小段描述信息来管理项目的构建、报告和文档的软件项目管理工具。</p><h2 id="_2-maven的作用" tabindex="-1"><a class="header-anchor" href="#_2-maven的作用" aria-hidden="true">#</a> 2. Maven的作用</h2><ul><li>管理jar包之间的依赖关系 <ul><li>Maven 可以替我们自动的将当前 jar 包所依赖的其他所有 jar 包全部导入进来</li></ul></li><li>获取第三方jar包 <ul><li>Maven 提供了一个完全统一规范的 jar 包管理体系，只需要在项目中以坐标的方式依赖一个 jar 包，Maven 就会自动从中央仓库进行下载到本地仓库</li></ul></li><li>将项目拆分成多个工程模块</li><li><strong>构建项目（打包，编译等）</strong></li></ul><h2 id="_3-maven-构建项目的主要环节" tabindex="-1"><a class="header-anchor" href="#_3-maven-构建项目的主要环节" aria-hidden="true">#</a> 3. Maven 构建项目的主要环节</h2><ul><li>清理（clean）：删除以前的编译结果（删除<code>target</code>），为重新编译做好准备</li><li>编译（compile）：将Java 源程序编译为字节码文件，生成<code>target</code>目录。</li><li>测试（test）：针对项目中的关键点进行测试，确保项目在迭代开发过程中关键点的正确性</li><li>打包（package）：将一个包含诸多文件的工程封装为一个压缩文件用于安装或部署。Java 工程对应 jar 包，Web工程对应 war 包。<code>package</code>包含了<code>compile</code>命令的过程。</li><li>安装（install）：在 Maven 环境下特指将打包的结果——jar 包或 war 包安装到本地仓库中。</li><li>部署（deploy）：将打包的结果部署到远程仓库或将 war 包部署到服务器上运行。</li></ul><h2 id="_4-maven-常用命令" tabindex="-1"><a class="header-anchor" href="#_4-maven-常用命令" aria-hidden="true">#</a> 4. Maven 常用命令</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>mvn -version/-v 显示版本信息

mvn clean 清空生成的文件

mvn compile 编译

mvn test 编译并测试

mvn package 生成target目录，编译、测试代码，生成测试报告，生成jar/war文件

mvn site 生成项目相关信息的网站

mvn clean compile 表示先运行清理之后运行编译，会将代码编译到target文件夹中

mvn clean package 运行清理和打包

mvn clean install 运行清理和安装，会将打好的包安装到本地仓库中，以便其他的项目可以调用

mvn clean deploy 运行清理和发布
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mvn clean package依次执行了clean、resources、compile、testResources、testCompile、test、jar(打包)等７个阶段。</p><p>mvn clean install依次执行了clean、resources、compile、testResources、testCompile、test、jar(打包)、install等8个阶段。</p><p>mvn clean deploy依次执行了clean、resources、compile、testResources、testCompile、test、jar(打包)、install、deploy等９个阶段。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>-DskipTests跟-Dmaven.test.skip=true的区别</p><ol><li>-DskipTests</li></ol><p>不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。</p><ol start="2"><li>-Dmaven.test.skip=true</li></ol><p>不执行测试用例，也不编译测试用例类。</p><p>一般建议使用第二种，直接忽略测试的编译，如下：</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>mvn clean package -Dmaven.test.skip=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>`,13);function b(_,g){const n=i("ExternalLinkIcon");return s(),r("div",null,[o,m,t(" more "),e("blockquote",null,[e("p",null,[e("a",u,[a("原文：面试官问我maven package和install的区别"),c(n)])]),p]),h])}const f=l(v,[["render",b],["__file","Maven.html.vue"]]);export{f as default};
