import *   as  puppeteer from 'puppeteer';

const puppeteerUtil = {
    browser: null,
    page: null,
    timer_start_time:Date.now(),
    // 初始化 Puppeteer
    initialize: async () => {
        console.log('\nSTART - automation started - ' + Date().toLocaleString());
        puppeteerUtil.browser = await puppeteer.launch({
            headless: false, // 设置为 false，启用可视化界面
            executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        });
    },
    getPage() {
        return puppeteerUtil.page;
    },
    open: async (url) => {
        if (!puppeteerUtil.browser) {
            await puppeteerUtil.initialize();
        }
      

        puppeteerUtil.page = await puppeteerUtil.browser.newPage();
        // await puppeteerUtil.page.maximize();
        await puppeteerUtil.page.goto(url);
        console.log(`open page sucesss:${url}`);
        // 等待某个条件满足，最长等待时间为5秒
        await puppeteerUtil.page.waitForFunction(() => {
        // 返回一个布尔值，表示等待条件是否满足
             return document.querySelector('div') !== null;
      }, { timeout: 5000 });
        

    },
    // 发送请求
    send: async (action) => {
        // 在这里执行其他 Puppeteer 操作...
        // 输入文本到当前焦点元素
        await puppeteerUtil.page.keyboard.type('Hello, Puppeteer!');

        // 按下和释放键盘上的特定键
        await puppeteerUtil.page.keyboard.press('Enter');

        // 按下和释放组合键（例如，Ctrl + C）
        await puppeteerUtil.page.keyboard.down('Control');
        await puppeteerUtil.page.keyboard.press('KeyC');
        await puppeteerUtil.page.keyboard.up('Control');

        // 关闭页面
        // await page.close();
        // 移动鼠标到指定位置
        await puppeteerUtil.page.mouse.move(100, 100);

        // 在指定位置点击鼠标左键
        await puppeteerUtil.page.mouse.click(100, 100);

        // 在指定位置按下和释放鼠标左键（模拟点击）
        await puppeteerUtil.page.mouse.down();
        await puppeteerUtil.page.mouse.up();

        // 在指定位置按下和释放鼠标右键（模拟右键点击）
        await puppeteerUtil.page.mouse.down({ button: 'right' });
        await puppeteerUtil.page.mouse.up({ button: 'right' });
    },
    exist:async (selector) => {
         // 等待页面加载完成
        var elements = null;
        for(var i=0 ;i<3;i++){
            try{
                
                // 执行 XPath 查询
                elements = await puppeteerUtil.page.$x(selector);
                console.log(`check xpath:${selector}`);
            }catch(e){
                console.log(`check xpath:${selector} ,can not found,${e}`);
            }
            // 判断结果是否存在
            if (elements!=null && elements.length> 0) break;
            await puppeteerUtil.sleep(1000);
        }
         // 判断结果是否存在
        if (elements!=null && elements.length> 0) {
            console.log('selector element found on the page.['+selector+']');
        } else {
            console.log('XPath element not found on the page.['+selector+']');
        }
        return elements!=null && elements.length> 0;

    },
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    // 关闭浏览器
    closeBrowser: async () => {
        if (puppeteerUtil.browser) {
            await puppeteerUtil.browser.close();
        }
    }
};

export default puppeteerUtil;
