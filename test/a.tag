
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
click 战略寻源
click 询价

// 新建询价单
click 新建
click 确定
type 询价标题 as test004

// 选择采购组织
select  采购组织  P100332 奇秦厦门采购组织 

// 输入结束时间
selectdate  结束时间 as 2024-11-23 19:56
click 确 定

// 选择货币

// 选择物料
click 来源物料主数据
click //div[@id='app']/*/div[not(@style='display: none;')]//div[@class='ant-modal-content']//div[@class='ant-modal-body']//*[@class='ant-spin-container']//div[@class='cus-scroll-wrap']//*[contains(@class,'tr table-row-1')]//*[contains(@class,'td-th ')][1]
click 确定

// 输入物料明细,操作表格
click //div[@id='app']/*/div[not(@style='display: none;')]//div[@class='cus-scroll-wrap']//*[contains(@class,'tr table-row-0')]//*[contains(@class,'td-th ')][7]
type //div[@id='app']/*/div[not(@style='display: none;')]//div[@class='content']//span[text()='物料明细']//ancestor::div[@class='ant-card-head']//following-sibling::div[@class='ant-card-body']//div[@class='ant-spin-container']//div[@class='cus-scroll-wrap']//*[contains(@class,'tr table-row-0')]//*[contains(@class,'td-th ')][7]//input as 5
wait 14

click 物料明细