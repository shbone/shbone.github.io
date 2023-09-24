---
icon: edit
date: 2023-09-24
article: true
category:
  - 项目分享
tag:
  - SpringBoot2
  - Swagger3 
---

# Swagger接口文档分享

## 1. Swagger 整合
swagger官网: https://swagger.io/  
Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。
### 1.1 maven 依赖导入
```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

### 1.2 application 配置
```yml
springfox:
  documentation:
    swagger-ui:
      enabled: true
```

### 1.2 Swagger Config 配置
```java
import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import springfox.documentation.builders.*;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.schema.ScalarType;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: SunHB
 * @createTime: 2023/09/24 上午11:00
 * @description:
 */
@Configuration
@EnableOpenApi
public class Swagger3Config {


    @Bean
    public Docket createRestApi() {
        //返回文档摘要信息
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                //.apis(RequestHandlerSelectors.basePackage("com.ytkj.controller"))
                .paths(PathSelectors.any())
                .build()
                .globalRequestParameters(getGlobalRequestParameters())
                .globalResponses(HttpMethod.GET, getGlobalResponseMessage())
                .globalResponses(HttpMethod.POST, getGlobalResponseMessage());
    }

    /**
     * 生成接口信息，包括标题、联系人等
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("yantu测试接口文档")
                .description("如有疑问，可联系孙鸿博")
                .version("1.0")
                .build();
    }

    /**
     * 封装全局通用参数
     */
    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        return parameters;
    }

    /**
     * 封装通用响应信息
     */
    private List<Response> getGlobalResponseMessage() {
        List<Response> responseList = new ArrayList<>();
        responseList.add(new ResponseBuilder().code("404").description("未找到资源").build());
        return responseList;
    }


}
```


## 2. Swagger 展示接口方法

@Api：用在类上，说明该类的作用。

@ApiOperation：注解来给API增加方法说明。

@ApiImplicitParams : 用在方法上包含一组参数说明。

@ApiImplicitParam：用来注解来给方法入参增加说明。

@ApiResponses：用于表示一组响应

```java
@RestController
@Slf4j
@RequestMapping("/test")
@Api(tags = "测试接口管理")
public class TestController
```

```java
@ApiOperation(value = "主控测试接口")
@PostMapping("/chat")
@CrossOrigin
public Result<Map> testChat
```

```java
@ApiOperation(value = "文档模块测试接口")
@PostMapping("v1/docQA")
@CrossOrigin
public Result docQA
```

访问： http://localhost:port/swagger-ui/index.html
![ES 框架图](/assets/project/swagger.png)