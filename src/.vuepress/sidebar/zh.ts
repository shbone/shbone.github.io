import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "分类",
      icon: "flow",
      prefix: "posts/",
      link: "posts/",
      children: "structure"
    },
    
    // "intro",
    // "slides",
  ],
  // "/zh/posts": "structure"
});
