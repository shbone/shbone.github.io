import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    {
      text: "目录",
      icon: "lightbulb",
      prefix: "posts/",
      link: "posts/",
      children: [
        "frame/",
        "project/"
      ]
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
