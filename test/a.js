import {click_intent,exist,wait,type_intent,select_intent,date_intent} from '../chromeevent/chromeEvent.js';
import puppeteerUtil from  '../chromeevent/pupeerUtil.js';


await puppeteerUtil.open("http://10.10.20.45/mainframe/login")
if ( exist("请输入帐号")) {
await type_intent("请输入帐号","shiy")
await type_intent("请输入密码","123456")
await click_intent('//button[not(@disabled)]//*[text()="登录"]')
}
if ( exist('//img[@class="main-logo"]')) {
}
await wait(10)
await click_intent("战略寻源")
await click_intent("询价")
await click_intent("新建")
await click_intent("确定")
await type_intent("询价标题","test004")
await select_intent("采购组织","P100332","奇秦厦门采购组织")
await date_intent("结束时间","2024-11-23 19:56")
await click_intent("确 定")
await click_intent("来源物料主数据")
await click_intent("//div[@id='app']/*/div[not(@style='display: none;')]//div[@class='ant-modal-content']//div[@class='ant-modal-body']//*[@class='ant-spin-container']//div[@class='cus-scroll-wrap']//*[contains(@class,'tr table-row-1')]//*[contains(@class,'td-th ')][1]")
await click_intent("确定")
await click_intent("//div[@id='app']/*/div[not(@style='display: none;')]//div[@class='cus-scroll-wrap']//*[contains(@class,'tr table-row-0')]//*[contains(@class,'td-th ')][7]")
await type_intent("//div[@id='app']/*/div[not(@style='display: none;')]//div[@class='content']//span[text()='物料明细']//ancestor::div[@class='ant-card-head']//following-sibling::div[@class='ant-card-body']//div[@class='ant-spin-container']//div[@class='cus-scroll-wrap']//*[contains(@class,'tr table-row-0')]//*[contains(@class,'td-th ')][7]//input","5")
await wait(14)
await click_intent("物料明细")
