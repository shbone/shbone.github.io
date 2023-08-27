import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "分类",
      icon: "lightbulb",
      prefix: "posts/",
      link: "posts/",
      children: "structure"
      // children: [
      //   "frame/",
      //   "project/"
      // ]
    },
    
    // "intro",
    // "slides",
  ],
  "zh/posts": "structure"
});
