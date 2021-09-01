export function checkStatus(status: number, msg: string, message: any): void {
  switch (status) {
    case 400:
      message.error(`${msg}`);
      break;
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      message.error('User has no permission (token, user name, password error)!');
      break;
    case 403:
      message.error('The user is authorized, but the access is disabled.!');
      break;
    // 404请求不存在
    case 404:
      message.error('Network request error, no resource is found!');
      break;
    case 405:
      message.error('Network request error, the request method is not allowed!');
      break;
    case 408:
      message.error('Network request timeout!');
      break;
    case 500:
      message.error('Server error, please contact the administrator!');
      break;
    case 501:
      message.error('Network is not implemented!');
      break;
    case 502:
      message.error('Network Error!');
      break;
    case 503:
      message.error('Service is not available, the server is temporarily overloaded or maintained!');
      break;
    case 504:
      message.error('network timeout!');
      break;
    case 505:
      message.error('The HTTP version does not support the request!');
      break;
    default:
      message.error(msg);
  }
}
