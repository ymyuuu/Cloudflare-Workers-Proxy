addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);

  // 检查路径是否以 /https:// 开头
  if (!url.pathname.startsWith('/https://')) {
    const mainDomain = new URL(request.url).origin;
    return new Response(`请使用正确的地址格式: ${mainDomain}/https://yourdomain.com`, { status: 400 });

  }

  // 提取目标地址
  const targetUrl = decodeURIComponent(url.pathname.slice(1))

  const modifiedRequest = new Request(targetUrl, {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });

  try {
    const response = await fetch(modifiedRequest);
    
    // 处理不同的HTTP状态代码
    if (response.status === 200) {
      // 如果目标地址返回200 OK，将其返回给客户端
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
      return modifiedResponse;
    } else if (response.status === 404) {
      // 如果目标地址返回404 Not Found，返回自定义错误消息
      return new Response('目标地址不存在', { status: 404 });
    } else if (response.status === 500) {
      // 如果目标地址返回500 Internal Server Error，返回自定义错误消息
      return new Response('目标地址出现内部服务器错误', { status: 500 });
    } else if (response.status === 522) {
      // 如果目标地址返回522 Origin Connection Time-out，返回自定义错误消息
      return new Response('目标地址连接超时', { status: 522 });
    } else {
      // 处理其他状态代码，可以根据需要添加更多条件
      return new Response('目标地址返回未知状态: ' + response.status, { status: response.status });
    }
  } catch (error) {
    // 处理fetch失败的情况
    return new Response('无法访问目标地址: ' + error.message, { status: 500 });
  }
}
