# 项目简化说明

## 变更概述

根据需求变更，项目已从微前端架构简化为单一C端应用，只保留用户端和登录注册功能。

## 已删除的内容

### 应用目录
- ✅ `packages/main-web` - 主应用（微前端基座）
- ✅ `packages/designer-web` - 设计师端
- ✅ `packages/supplier-web` - 供应商端
- ✅ `packages/contractor-web` - 施工端

### 部署目录
- ✅ `gh-pages-deploy/main-web`
- ✅ `gh-pages-deploy/designer-web`
- ✅ `gh-pages-deploy/supplier-web`

### 脚本文件
- ✅ `build-all.js` - 多应用构建脚本
- ✅ `deploy-gh-pages.js` - GitHub Pages 部署脚本
- ✅ `proxy-server.js` - 代理服务器

### 文档文件
- ✅ `CROSS_APP_NAVIGATION.md` - 跨应用导航文档
- ✅ `MICRO_FRONTEND_NAVIGATION_FIX.md` - 微前端导航修复文档
- ✅ `DATA_LINKAGE_GUIDE.md` - 数据联动指南

## 已清理的代码

### packages/user-web/src/main.ts
- ✅ 移除微前端环境检测逻辑
- ✅ 移除 `__WUJIE_MOUNT__` 和 `__WUJIE_UNMOUNT__` 函数
- ✅ 移除父应用语言同步逻辑
- ✅ 简化为标准 Vue 3 应用启动流程

### packages/user-web/src/vite-env.d.ts
- ✅ 移除 `__POWERED_BY_WUJIE__` 类型声明
- ✅ 移除 `__WUJIE_MOUNT__` 类型声明
- ✅ 移除 `__WUJIE_UNMOUNT__` 类型声明
- ✅ 移除 `__PARENT_APP__` 类型声明

### packages/user-web/src/components/UserAvatar.vue
- ✅ 移除从 `window.__PARENT_APP__` 获取用户信息的逻辑
- ✅ 简化为只从 localStorage 获取用户信息

### packages/user-web/src/views/HomeTest.vue
- ✅ 移除 `isMicroFrontend` 计算属性
- ✅ 移除 `wujie` 环境检测
- ✅ 简化窗口信息显示

## 保留的内容

### 核心功能
- ✅ 登录注册系统（完整保留）
- ✅ C端用户界面（完整保留）
- ✅ 购物车功能（完整保留）
- ✅ 个人中心（完整保留）
- ✅ 多语言支持（完整保留）
- ✅ 游客模式（完整保留）

### 技术栈
- ✅ Vue 3 + TypeScript
- ✅ Vue Router 4
- ✅ Pinia 状态管理
- ✅ Bootstrap 5 + BootstrapVue 3
- ✅ vue-i18n 国际化
- ✅ Vite 构建工具

### 样式和功能
- ✅ 所有已完成的页面样式
- ✅ 响应式设计（clamp 函数）
- ✅ 组件库集成（BootstrapVue 3）
- ✅ 表单验证
- ✅ 路由配置

## 更新的配置

### package.json
```json
{
  "name": "user-web-project",
  "scripts": {
    "dev": "cd packages/user-web && npm run dev",
    "build": "cd packages/user-web && npm run build",
    "preview": "cd packages/user-web && npm run preview"
  }
}
```

### README.md
- ✅ 更新为单一应用说明
- ✅ 移除微前端架构描述
- ✅ 更新项目结构说明
- ✅ 简化启动和构建说明

## 启动方式

### 开发模式
```bash
npm run dev
```

### 构建
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 访问地址

- **用户端**: http://localhost:8085

## 注意事项

1. **无需启动多个应用**: 现在只需要启动一个应用即可
2. **独立运行**: 应用不再依赖微前端基座，可以独立运行
3. **用户认证**: 用户信息完全从 localStorage 获取，不再从父应用传递
4. **路由管理**: 所有路由在 user-web 内部管理，无需跨应用导航
5. **样式完整**: 所有已完成的样式和功能都已保留

## 后续开发

项目结构已简化，可以专注于 C端功能的开发：

- 继续完善购物车功能
- 添加订单管理页面
- 完善个人中心功能
- 优化响应式设计
- 添加更多用户功能

所有开发都在 `packages/user-web` 目录下进行。
