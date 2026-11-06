# C 端进入管理端说明

## 当前已完成

- C 端 `POST /app/login` 的既有逻辑保持不变。响应中的 `token`、`accessToken` 或 `access_token` 写入 `localStorage.token`，用户资料写入 `localStorage.userInfo`。
- C 端不把密码或 token 放入后台 URL；点击入口时将 admin audience token 写入 `Admin-Token` Cookie 后进入管理端首页。
- 微前端环境仍发送现有 `/admin/login` 导航消息，不改变宿主协议。

## Cookie 与域名限制

前端使用 `encodeURIComponent(token)`、`Path=/`、`SameSite=Lax`，仅 HTTPS 添加 `Secure`。当前主机与管理端为同一主域时设置 `Domain`；IP、`localhost` 或完全不同域名使用 host-only/提示后端处理。浏览器不允许一个域名给另一个完全不同域名写 Cookie；跨域时必须由后端重定向并通过 `Set-Cookie` 建立管理端会话。

## 联调步骤

1. 部署 C 端时设置 `VITE_ADMIN_BASE_URL`。
2. 以供应商/设计师账号登录，确认管理端可用 Cookie 调用 `/system/user/getInfo` 与 `/system/menu/getRouters`。
3. 验证 token 缺失提示、跨域后端 `Set-Cookie`、登出和权限场景。
