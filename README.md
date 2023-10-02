# Cloudflare Workers 反向代理

这是一个基于 Cloudflare Workers 的简单反向代理脚本，用于将客户端的请求转发到目标地址，并将目标地址的响应返回给客户端。在使用本脚本之前，请务必详细阅读以下安全注意事项和免责声明，以确保使用脚本时的安全和法律合规性。


## 功能详细介绍

### 1. URL 反代

这个反代服务的主要功能是将一个输入的 URL 映射到另一个 URL，并返回目标 URL 的内容。这可以用于许多用例，例如在不更改客户端请求的情况下访问跨域资源、处理内部重定向等。

**示例**：

假设你有一个前端应用托管在 `https://frontend-app.com`，但需要从后端 API `https://backend-api.com` 获取数据。你可以使用反代服务将前端应用中的 API 请求映射到后端 API，以避免跨域问题。

```
GET https://your-workers-url.com/https://backend-api.com/data
```

### 2. 跨域访问

服务会自动添加响应头，允许跨域访问。这意味着你可以在不同的域上使用这个服务，方便实现跨域请求。跨域访问是 Web 开发中常见的需求，而这个服务可以帮助你轻松解决跨域问题。

**示例**：

你的前端应用托管在 `https://frontend-app.com`，但你希望从 `https://api-app.com` 的后端获取数据。使用反代服务，你可以在前端应用中轻松地发送请求到 `https://your-workers-url.com/https://api-app.com/data`，而不会遇到跨域限制。

### 3. 错误处理

服务具有健壮的错误处理机制。如果请求的 URL 不符合要求，或者目标 URL 无法访问，服务会返回适当的错误响应，包括状态码和错误消息，以便客户端能够了解问题所在。

**示例**：

- 如果请求的 URL 无效，服务会返回状态码 400（错误的请求）和一个包含错误消息的响应。
- 如果目标 URL 无法访问，例如目标服务器不可用，服务会返回状态码 500（服务器错误）和一个包含错误消息的响应。

### 4. 简单部署

你可以将这个服务部署到支持 Workers 的平台上，如 Cloudflare Workers。部署非常简单，并且可以轻松扩展，以应对不同规模的流量。你可以根据需要在云端管理和配置这个服务。

**示例**：

1. 在 Cloudflare Workers 控制台上创建一个新的 Worker。
2. 将提供的反代代码粘贴到 Worker 中。
3. 部署 Worker，然后你将获得一个 Workers 部署的 URL，可以立即使用。

这个服务的简单部署使其适用于快速启动和测试反代需求。

## 用法示例

### 请求示例

以下是一些请求示例，展示了如何使用这个反代服务的不同功能：

1. 基本的 URL 反代：

```
GET https://your-workers-url.com/https://backend-api.com/data
```

2. 处理跨域请求：

```
GET https://your-workers-url.com/https://api-app.com/data
```

3. 错误处理示例（无效的 URL）：

```
GET https://your-workers-url.com/
```

4. 错误处理示例（目标 URL 无法访问）：

```
GET https://your-workers-url.com/https://unreachable-backend.com/data
```

### 响应示例

以下是与上述请求示例对应的响应示例：

**1. 基本的 URL 反代响应**：

```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *

{"data": "Some data from the backend"}
```

**2. 处理跨域请求的响应**：

```
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *

{"data": "Response from the cross-origin API"}
```

**3. 无效的 URL 请求的错误响应**：

```
HTTP/1.1 400 Bad Request
Content-Type: text/plain

请使用正确的地址格式: https://your-workers-url.com/https://your-target-url.com
例如: https://your-workers-url.com/https://example.com
```

**4. 目标 URL 无法访问的错误响应**：

```
HTTP/1.1 500 Internal Server Error
Content-Type: text/plain

无法访问目标地址: FetchError: request to https://unreachable-backend.com/data failed, reason: NetworkError when attempting to fetch resource.
```

## 注意事项

- 请确保部署的 Workers 脚本在部署时是有效的，并且有足够的资源来处理请求。

- 该服务仅用于目标 URL 的简单反代，并没有包含高级的缓存、认证或其他功能。

- 请注意不要滥用该服务，确保只将它用于合法和合适的用途。


## 免责声明

- **责任限制**：作者不对脚本可能导致的任何安全问题、数据损失、服务中断、法律纠纷或其他损害负责。使用此脚本需自行承担风险。
  
- **不当使用**：使用者需了解，本脚本可能被用于非法活动或未经授权的访问。作者强烈反对和谴责任何不当使用脚本的行为，并鼓励合法合规的使用。

- **合法性**：请确保遵守所有适用的法律、法规和政策，包括但不限于互联网使用政策、隐私法规和知识产权法。确保您拥有对目标地址的合法权限。

- **自担风险**：使用此脚本需自行承担风险。作者和 Cloudflare 不对脚本的滥用、不当使用或导致的任何损害承担责任。

## 资源

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers)
- [Cloudflare Workers 设置](https://developers.cloudflare.com/workers/platform/settings)

## 许可证

本项目采用 MIT 许可证。详细信息请参阅 [LICENSE](LICENSE) 文件。

感谢你的使用！如果你对这个项目有任何改进或建议，也欢迎贡献代码或提出问题。
