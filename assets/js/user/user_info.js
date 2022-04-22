$(function() {
    var form = layui.form
    var layer = layui.layer

    // 创建自定义的规则
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称长度在1~6个字符之间!'
            }
        }
    })

    initUserInfo()
    // 获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                } 
                // 调用form.val()快速给表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click',function(e) {
        // 阻止默认重置
        e.preventDefault();
        initUserInfo()
    })

    // 更新用户基本信息
    $('.layui-form').on('submit',function(e){
        // 阻止表单默认提交
        e.preventDefault();
        // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('用户信息更新失败!')
                }
                layer.msg('用户信息更新成功!')
                // 调用父页面中的方法重新选渲染用户信息和头像
                window.parent.getUserInfo()
            }
        })
    })
})

