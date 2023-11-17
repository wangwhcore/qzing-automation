
echo 访问测试系统
http://10.10.20.45/mainframe/login

echo 输入账号密码后登录
if exist("请输入帐号") 
    type 请输入帐号 as shiy
    type 请输入密码 as 123456
    click //button[not(@disabled)]//*[text()="登录"]
//等待logo可见，代表登录成功
if exist('//img[@class="main-logo"]')
    echo 登录成功
wait 10
click 采购执行
click 采购订单类型

// 新建询价单
click 新建

type 订单类型编码 as test001
type  订单类型名称  as 内销订单
type 请输入  as 我的备注
click 确定