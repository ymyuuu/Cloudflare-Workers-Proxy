// 监听 'fetch' 事件，当有请求到达时执行回调函数
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// 处理传入的请求
async function handleRequest(request) {
  // 解析请求的 URL
  const url = new URL(request.url);

  // 从路径中提取目标 URL，解码特殊字符
  const targetUrl = decodeURIComponent(url.pathname.slice(1))

  // 如果没有提供目标 URL，则返回错误响应
  if (!targetUrl) {
    const mainDomain = url.hostname;

    const errorMessage = `
      请使用正确的地址格式:
      https://${mainDomain}/https://yourdomain.com<br>
      例如: <a href="https://${mainDomain}/https://github.com/ymyuuu" target="_blank">https://${mainDomain}/https://github.com/ymyuuu</a>
    `;

    // 返回带有错误消息的响应和状态码 400（错误的请求）
    return new Response(errorMessage, { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  // 创建一个新的请求，以便访问目标 URL
  const modifiedRequest = new Request(targetUrl, {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });

  try {
    // 发起对目标 URL 的请求
    const response = await fetch(modifiedRequest);
    
    // 创建一个新的响应，使用目标 URL 的响应内容和状态
    const modifiedResponse = new Response(response.body, response);
    
    // 设置允许跨域访问的响应头
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
    
    // 返回修改后的响应
    return modifiedResponse;
  } catch (error) {
    // 如果请求目标地址时出现错误，返回带有错误消息的响应和状态码 500（服务器错误）
    return new Response('无法访问目标地址: ' + error.message, { status: 500 });
  }
}
