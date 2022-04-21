// 主要每次调用$.get()或$.post()或$.ajax()的时候会先调用ajaxPrefilter函数，这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求之前，统一拼接请求路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log (options.url)

})