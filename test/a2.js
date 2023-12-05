import {click_intent,exist,wait,type_intent,select_intent,date_intent} from '../chromeevent/chromeEvent.js';

import puppeteerUtil from  '../chromeevent/pupeerUtil.js';

import {enterCommandLineMode} from '../fileparse/livemode.js';
      
    
try {
await puppeteerUtil.open("http://10.10.21.133/mainframe/login")
if ( exist("请输入帐号")) {
await type_intent("请输入帐号","wanghl")
await type_intent("请输入密码","123456")
await click_intent('//button[not(@disabled)]//*[text()="登录"]')
}
if ( exist('//img[@class="main-logo"]')) {
}
await wait(10)
await click_intent("质量管理")
await click_intent("8D改进")
await click_intent("新建")
await select_intent("问题来源","首件检验","首件检验")
await select_intent("缺陷等级","MA","")
await type_intent("重复发生次数 ","10")
await select_intent("责任部门名称","C区","")
await date_intent("回复期限 ","2023.12.04 14:00:00")
await type_intent("批次号 ","AJ0506998")
await type_intent("问题描述 ","这是一个用了很久的问题，请详细讨论原因及解决办法")
await click_intent("确定")



}catch(e){
    enterCommandLineMode();
}
                     