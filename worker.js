addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
	const url = new URL(request.url);
  
	// 从请求路径中提取目标 URL
	let actualUrlStr = url.pathname.replace("/", "");
	actualUrlStr = decodeURIComponent(actualUrlStr);
  
	if (!actualUrlStr) {
	  const mainDomain = url.hostname;
	  const errorMessage = `
	  请使用正确的地址格式:
	  https://${mainDomain}/https://target-website.com<br>
	  例如: <a href="https://${mainDomain}/https://github.com/ymyuuu" target="_blank">https://${mainDomain}/https://github.com/ymyuuu</a>
	  `;
  
	  return new Response(errorMessage, { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
	}
  
	// 创建新 Headers 对象，排除以 'cf-' 开头的请求头
	let newHeaders = new Headers();
	for (let pair of request.headers.entries()) {
	  if (!pair[0].startsWith('cf-')) {
		newHeaders.append(pair[0], pair[1]);
	  }
	}
  
	// 创建一个新的请求以访问目标 URL
	const modifiedRequest = new Request(actualUrlStr, {
	  headers: newHeaders,
	  method: request.method,
	  body: request.body,
	  redirect: 'manual'
	});
  
	try {
	  // 发起对目标 URL 的请求
	  const response = await fetch(modifiedRequest);
	  let modifiedResponse;
	  let body = response.body;
  
	  // 处理重定向
	  if ([301, 302, 303, 307, 308].includes(response.status)) {
		const location = new URL(response.headers.get('location'));
		const modifiedLocation = "/" + encodeURIComponent(location.toString());
		modifiedResponse = new Response(response.body, {
		  status: response.status,
		  statusText: response.statusText
		});
		modifiedResponse.headers.set('Location', modifiedLocation);
	  } else {
		if (response.headers.get("Content-Type") && response.headers.get("Content-Type").includes("text/html")) {
		  // 如果响应类型是 HTML，则修改响应内容，将相对路径替换为绝对路径
		  const originalText = await response.text();
		  const regex = new RegExp('((href|src|action)=["\'])/(?!/)', 'g');
		  const modifiedText = originalText.replace(regex, `$1${url.protocol}//${url.host}/${encodeURIComponent(new URL(actualUrlStr).origin + "/")}`);
		  body = modifiedText;
		}
  
		modifiedResponse = new Response(body, {
		  status: response.status,
		  statusText: response.statusText,
		  headers: response.headers
		});
	  }
  
	  // 添加 CORS 头部，允许跨域访问
	  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
	  modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	  modifiedResponse.headers.set('Access-Control-Allow-Headers', '*');
  
	  return modifiedResponse;
	} catch (error) {
	  // 如果请求目标地址时出现错误，返回带有错误消息的响应和状态码 500（服务器错误）
	  return new Response('无法访问目标地址: ' + error.message, { status: 500 });
	}
  }
  
