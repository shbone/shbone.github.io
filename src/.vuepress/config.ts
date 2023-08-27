import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "SunHB博客",
      description: "Just Do it",
    },
    "/en/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "Just Do it",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
