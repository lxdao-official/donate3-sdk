import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  // 以下为 esm 配置项启用时的默认值，有自定义需求时才需配置
  // esm: {
  //   input: 'src', // 默认编译目录
  //   platform: 'browser', // 默认构建为 Browser 环境的产物
  //   transformer: 'babel', // 默认使用 babel 以提供更好的兼容性
  //   output: 'dist',
  // },
  // // 以下为 cjs 配置项启用时的默认值，有自定义需求时才需配置
  // cjs: {
  //   input: 'src', // 默认编译目录
  //   platform: 'node', // 默认构建为 Node.js 环境的产物
  //   transformer: 'esbuild', // 默认使用 esbuild 以获得更快的构建速度
  // },
  umd: {
    name: 'Donate3',
  },
});
