# C 端管理端 SSO 接入说明

## 当前已完成

- C 端 `POST /app/login` 的既有逻辑保持不变。响应中的 `token`、`accessToken` 或 `access_token` 写入 `localStorage.token`，用户资料写入 `localStorage.userInfo`。
- C 端不把密码或长期 access token 放入后台 URL。
- 独立运行时读取 `VITE_ADMIN_BASE_URL`；可选读取 `VITE_ADMIN_SSO_CALLBACK_URL`。两者都配置时仅跳转到该回调地址，不生成任何票据或参数。未配置回调时继续跳转后台 `/login`，保持现有行为。
- 微前端环境仍发送现有 `/admin/login` 导航消息，不改变宿主协议。

## 尚待后端/产品确认

在后端提供正式契约前，C 端不会猜测接口路径、参数或响应格式。请确认：

1. SSO 是后台可消费的一次性短票据、授权码，还是共享会话；票据签发接口、HTTP 方法、请求字段、响应字段、有效期和一次性/重放规则。
2. 回调地址的准确路径、允许的 redirect/origin 白名单，以及失败/过期/重复使用时的错误码。
3. 后台如何校验 C 端登录身份并建立会话；是否需要 role、roleKey、roleStatus 等声明。
4. `roleStatus=PENDING` 是否允许进入后台、应展示何种待审核页面；在确认前 C 端不赋予后台权限。
5. 设计师/供应商分别对应的后台入口与权限边界。

## 联调步骤

1. 后端提供并确认上述契约及测试环境 origin。
2. 部署 C 端时设置 `VITE_ADMIN_BASE_URL`；契约确认后再设置 `VITE_ADMIN_SSO_CALLBACK_URL`。
3. 以已批准账号登录 C 端，确认 `localStorage` 仅保存 C 端会话；从入口跳转后台，验证后台建立会话并按角色/状态授权。
4. 分别验证 token 缺失、票据过期/重复使用、PENDING、登出和回跳失败场景。
