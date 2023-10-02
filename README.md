# Cloudflare Workers 反向代理

这是一个基于 Cloudflare Workers 的简单反向代理脚本，用于将客户端的请求转发到目标地址，并将目标地址的响应返回给客户端。该脚本适用于需要在云端进行请求重定向和自定义处理的场景。

## 功能

- 接受客户端的请求并解析目标地址。
- 发送请求到目标地址，并将目标地址的响应返回给客户端。
- 处理不同的 HTTP 状态码，包括自定义错误消息。
- 添加跨域资源共享 (CORS) 头，以允许跨域访问。

## 用法

1. 首先，您需要在 Cloudflare 上创建一个 Workers 账户和项目。请参考 [Cloudflare Workers 文档](https://developers.cloudflare.com/workers) 获取更多信息。
2. 部署这个 Workers 脚本到 Cloudflare。
3. 将您的 Worker 连接到自定义域名。
4. 访问自定义域名，使用以下格式的 URL 进行请求：
   
   ```
   https://your-workers-subdomain.your-account.workers.dev/https://target-domain.com
   ```
   
   请确保将 "https://target-domain.com" 替换为你要代理的目标地址。

## 自定义

你可以根据自己的需求对脚本进行自定义和扩展，例如：
- 修改错误消息。
- 添加其他自定义响应处理。
- 配置不同的 CORS 头。
- 进行日志记录或分析。

## 注意事项

- 这只是一个简单的示例脚本，实际使用中可能需要根据你的需求进行修改和扩展。
- 请确保遵守 Cloudflare 的使用政策和服务条款。

## 资源

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers)
- [Cloudflare Workers 设置](https://developers.cloudflare.com/workers/platform/settings)

---
