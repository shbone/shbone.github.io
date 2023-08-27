import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "Just Do it",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "博客演示",
      description: "Just Do it",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
