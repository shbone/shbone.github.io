import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
export default defineUserConfig({
  lang:"zh-CN",
  title: "Sunhb博客",
  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 是否自动提示搜索建议
      autoSuggestions: false,
      // 为分类和标签添加索引
      // customFields: [
      //   {
      //     getter: (page) => page.frontmatter.title,
      //     formatter: "分类：$content",
      //   },
      //   {
      //     getter: (page) => page.frontmatter.tag,
      //     formatter: "标签：$content",
      //   },
      // ],
    }),
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
});
