# Cloudflare Workers Proxy

这是一个基于 Cloudflare Workers 的简单反向代理脚本，用于将客户端的请求转发到目标地址，并将目标地址的响应返回给客户端。在使用本脚本之前，请务必详细阅读以下安全注意事项和免责声明，以确保使用脚本时的安全和法律合规性。

- 群聊: [HeroCore](https://t.me/HeroCore)
- 频道: [HeroMsg](https://t.me/HeroMsg)

![image](https://github.com/user-attachments/assets/72b35862-16cc-4224-89e1-ad0419a7ac4e)


## 简介

这个 Cloudflare Workers 脚本充当了一个反向代理，它的主要功能是接收客户端的请求，并将请求代理到目标地址，然后将目标地址的响应返回给客户端。具体功能包括：

- 代理客户端请求到目标地址。
- 修改响应中的相对路径为绝对路径，以确保资源的正确加载。
- 处理重定向并进行适当的修改，以保持资源路径的正确性。
- 添加 CORS 头部，以允许跨域访问。

## 如何部署

以下是部署 Cloudflare Workers 反向代理脚本的详细步骤：

1. 注册 Cloudflare 账户：如果您尚未拥有 Cloudflare 账户，请在 [Cloudflare 官方网站](https://www.cloudflare.com/) 上注册一个账户。

2. 创建 Workers 脚本：登录到 Cloudflare 账户后，进入 "Workers" 部分，创建一个新的 Workers 脚本。

3. 复制[worker.js](worker.js)：将提供的反向代理脚本粘贴到 Workers 编辑器中。

4. 保存并部署：保存脚本后，点击 "Deploy" 按钮，以部署您的 Workers 脚本。

5. 配置域名：在 Cloudflare 中，将您的域名与部署的 Workers 脚本关联。确保将流量路由到您的 Workers 脚本。

6. 测试：访问您的域名或者 Cloudflare Workers URL 会看到一个输入框，您可以在其中输入要代理的目标网站的 URL，然后点击 "进入代理" 按钮进行访问。

## 使用方法

要使用此反向代理访问其他网站，请按照以下步骤操作：

1. 发出请求：只需向您的 Cloudflare Workers URL 发出请求，将请求发送到目标网站。

   示例请求：`https://your-worker-url.com/https://example.com/`

   将 `your-worker-url.com` 替换为您的 Cloudflare Workers URL，`example.com` 替换为您要代理的目标网站的地址。

2. 处理重定向

   反向代理脚本能够处理重定向并适当修改资源路径，以确保正确性。

3. 允许跨域请求

   反向代理添加了 CORS（跨源资源共享）头部，以允许跨域请求。这意味着您可以在前端 JavaScript 代码中从不同域（不同域名）发起请求，而不会受到浏览器的跨域安全限制。

4. 用户友好界面

   如果您未提供目标网站的 URL，此反向代理还提供了一个用户友好的界面。用户可以在此界面中输入目标网站的 URL，然后点击 "进入代理" 按钮，以便快速代理访问目标网站。

## 注意事项

- 请确保部署的 Workers 脚本在部署时是有效的，并且有足够的资源来处理请求。

- 请注意不要滥用该服务，确保只将它用于合法和合适的用途。

## 免责声明

- **责任限制**：作者不对脚本可能导致的任何安全问题、数据损失、服务中断、法律纠纷或其他损害负责。使用此脚本需自行承担风险。

- **不当使用**：使用者需了解，本脚本可能被用于非法活动或未经授权的访问。作者强烈反对和谴责任何不当使用脚本的行为，并鼓励合法合规的使用。

- **合法性**：请确保遵守所有适用的法律、法规和政策，包括但不限于互联网使用政策、隐私法规和知识产权法。确保您拥有对目标地址的合法权限。

- **自担风险**：使用此脚本需自行承担风险。作者和 Cloudflare 不对脚本的滥用、不当使用或导致的任何损害承担责任。

**此免责声明针对非中国大陆地区用户，如在中国大陆地区使用，需遵守相关地区法律法规，且由使用者自行承担相应风险与责任。**


## 资源

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers)
- [Cloudflare Workers 设置](https://developers.cloudflare.com/workers/platform/settings)

## 许可证

本项目采用 MIT 许可证。详细信息请参阅 [LICENSE](LICENSE) 文件。

感谢您的使用！如果您对这个项目有任何改进或建议，也欢迎贡献代码或提出问题。
