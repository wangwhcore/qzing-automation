
echo 访问测试系统
http://10.10.21.133/mainframe/login

echo 输入账号密码后登录
if exist("请输入帐号") 
    type 请输入帐号 as wanghl
    type 请输入密码 as 123456
    click //button[not(@disabled)]//*[text()="登录"]
//等待logo可见，代表登录成功
if exist('//img[@class="main-logo"]')
    echo 登录成功
wait 10
click 质量管理
click 8D改进

// 新建询价单
click 新建

select 问题来源 as 首件检验 首件检验
select 缺陷等级 as MA  MA
type  重复发生次数  as 10
select 责任部门名称 as C区  C区
selectdate 回复期限  as 2023.12.04 14:00:00
type  批次号  as AJ0506998
type  问题描述  as 这是一个用了很久的问题，请详细讨论原因及解决办法
click 确定