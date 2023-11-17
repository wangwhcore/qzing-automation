import { click_intent, exist, wait, type_intent, select_intent, date_intent } from '../chromeevent/chromeEvent.js';
import puppeteerUtil from '../chromeevent/pupeerUtil.js';
import { startLiveMode } from '../fileparse/livemode.js';

try {

    await puppeteerUtil.open("http://10.10.20.45/mainframe/login")
    if (exist("请输入帐号")) {
        await type_intent("请输入帐号", "chenyh")
        await type_intent("请输入密码", "123456")
        await click_intent('//button[not(@disabled)]//*[text()="登录"]')
    }
    if (exist('//img[@class="main-logo"]')) {
    }
    await wait(10)
    await click_intent("采购执行")
    await click_intent("采购订单类型")
    await click_intent("新建")
    await type_intent("订单类型编码", "test001")
    await type_intent("订单类型名称", "内销订单")
    await type_intent("请输入", "我的备注")
    await click_intent("确定")

} catch (e) {

    console.log("ERROR: 当前执行异常" + e);
    // 启动 live 模式
    startLiveMode();

}

