// 主要每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用ajaxPrefilter函数，
// 这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前，统一拼接请求路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log (options.url)
    // 统一为有权限的接口设置headers请求头
    if(options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
    }
}
    
// 全局统一挂载complete回调函数
options.complete = function(res) {
    // JQuery请求服务器接口，服务器响应数据给客户端
    // 成功执行success回调，失败执行error回调
    // 无论成功还是失败都会执行complete回调函数
    // 在complete回调函数中，可以通过res.responseJSON拿到服务器响应回来的数据
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！')
    {
      // 1.强制清空token
      localStorage.removeItem('token')
      // 2.强制跳转到登录页面
      location.href = '/login.html'
    }
}

})