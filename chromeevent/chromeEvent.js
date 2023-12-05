import puppeteerUtil from './pupeerUtil.js';

var snapnum = 0;//用于记录截图的序号
var currentdate = new Date();
var formattedDate = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false  // 使用24小时制
}).format(currentdate).replace(/\D/g, '');

export async function click_intent(locator) {
    // 使用 split 分割字符串
    if (await exist(locator));
    var xpath = await findBestMatch(puppeteerUtil.page, locator)
    try {
        var inputElement = await puppeteerUtil.page.$x(xpath);
        if (inputElement.length == 0) {
            console.log("could not found " + locator);
            //执行页面分析并检索关键字
            
        }else{
            for (var i = 0; i < inputElement.length; i++) {
                if (isClickable(inputElement[i])) {
                    await inputElement[i].click();
                    break;
                }
            }
        }
    } catch (e) {
        takeSnap(e);
    }
}

export async function takeSnap(e) {
    snapnum++;
    puppeteerUtil.page.screenshot({ path: `errorsnap-${formattedDate}-${snapnum}.png` });
    console.log(`[error]take a snapshot : please check the errorsnap-${formattedDate}-${snapnum}.png`);
    console.log(e);
}
export async function isClickable(inputElement) {
    var isClickable = false;

    if (inputElement) {
        isClickable = await puppeteerUtil.page.evaluate(element => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return (
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                rect.width > 0 &&
                rect.height > 0
            );
        }, inputElement);
        if (isClickable) {
            console.log(`Element [${inputElement}] is clickable.`);
        } else {
            console.log(`Element [${inputElement}] is not clickable.`);
        }

    } else {
        console.log('Element not found.');
    }
    return isClickable;
}
export async function type_intent(locator, param) {
    if (!isXPathSelector(locator) &&await isRdcPage()) return await rdctype_intent(locator, param);
    if (await exist(locator));
    // 使用 split 分割字符串
    var xpath = await findBestMatch(puppeteerUtil.page, locator)
    try {
        var inputElement = await puppeteerUtil.page.$x(xpath);
        await inputElement[0].type(param);
    } catch (e) {
        takeSnap(e);
    }
}
export async function isRdcPage() {
    var url = await puppeteerUtil.page.url();
    if (url.includes('front_web')) return true;
    else return false;
}
export async function rdctype_intent(locator, param) {
    if (await exist(locator));
    // 使用 split 分割字符串
    var xpath = `//label[text()='${locator}']/ancestor::div[@class='content'][1]//input`;
    try {
        var inputElement = await puppeteerUtil.page.$x(xpath);
        await inputElement[0].type(param);
    } catch (e) {
        takeSnap(e);
    }
}

export async function select_intent(locator, param) {
    // 使用 split 分割字符串
    await click_intent(`//label[text()='${locator}']/..//following-sibling::*//span[@class='ant-form-item-children']`)
    await type_intent("//div[@aria-expanded='true']//input", param)
    await click_intent(`//div[contains(@class,'ant-select-dropdown')][not(contains(@class,'hidden'))]//ul[@role='listbox']//li[@label='${param}' or *[*[@title='${param}']]]`)
}

export async function date_intent(locator, param) {
    // 使用 split 分割字符串
    await click_intent(`//*[label[text()='${locator}']]//following-sibling::*//i[@type='calendar']`)
    await type_intent(`//input[@class='ant-calendar-input ']`,param);
}
// export function getSelector(param) {
//     if (param.startsWith("//")) xpath_parse(param);

// }

export function xpath_parse(param) {

}
export async function wait(param) {
    await puppeteerUtil.sleep(param * 1000);
}

// Check if the selector is an XPath selector
function isXPathSelector(selector) {
    if (selector == undefined || selector.length === 0 || selector == "" || selector.trim() == "") return false;
    if (selector.startsWith('/') || selector.startsWith('(')) return true;
    return false;
}

// Finding the best match for the given locator
async function findBestMatch(page, locator) {
    if (isXPathSelector(locator)) {
        return locator;
    }

    // Check for CSS locator
    if (await page.$(locator) !== null) {
        return locator;
    }
    var xpa = await page.$x(`//*[normalize-space(text())="${locator}"]`);

    // First check for an exact match, then check for containing string
    if ((await page.$x(`//*[contains(@id,"${locator}")]`)).length > 0) { return `//*[contains(@id,"${locator}")]`; }
    if ((await page.$x(`//*[@id="${locator}"]`)).length > 0) { return `//*[@id="${locator}"]`; }
    if ((await page.$x(`//*[@name="${locator}"]`)).length > 0) { return `//*[@name="${locator}"]`; }
    if ((await page.$x(`//*[contains(@name,"${locator}")]`)).length > 0) { return `//*[contains(@name,"${locator}")]`; }
    if ((await page.$x(`//*[@class="${locator}"]`)).length > 0) { return `//*[@class="${locator}"]`; }
    if ((await page.$x(`//*[contains(@class,"${locator}")]`)).length > 0) { return `//*[contains(@class,"${locator}")]`; }
    if ((await page.$x(`//*[@title="${locator}"]`)).length > 0) { return `//*[@title="${locator}"]`; }
    // if ((await page.$x(`//*[contains(@title,"${locator}")]"]`)).length>0) { return `//*[contains(@title,"${locator}")]`; }
    if ((await page.$x(`//*[@aria-label="${locator}"]`)).length > 0) { return `//*[@aria-label="${locator}"]`; }
    if ((await page.$x(`//*[contains(@aria-label,"${locator}")]`)).length > 0) { return `//*[contains(@aria-label,"${locator}")]`; }
    if ((await page.$x(`//*[normalize-space(text())="${locator}"]`)).length > 0) { return `//*[normalize-space(text())="${locator}"]`; }
    if ((await page.$x(`//*[contains(text(),"${locator}")]`)).length > 0) { return `//*[contains(text(),"${locator}")]`; }
    if ((await page.$x(`//*[@href="${locator}"]`)).length > 0) { return `//*[@href="${locator}"]`; }
    if ((await page.$x(`//*[contains(@href,"${locator}")]`)).length > 0) { return `//*[contains(@href,"${locator}")]`; }
    if ((await page.$x(`//*[@placeholder="${locator}"]`)).length > 0) { return `//*[@placeholder="${locator}"]`; }
    if ((await page.$x(`//*[contains(@placeholder,"${locator}")]`)).length > 0) { return `//*[contains(@placeholder,"${locator}")]`; }

    // If no match found, return null or handle it accordingly
    return '';
}

export async function exist(selector) {
    // 等待页面加载完成
    var elements = null;
    for (var i = 0; i < 5; i++) {
        try {
            console.log(`check xpath:${selector}`);
            var xpath = await findBestMatch(puppeteerUtil.page, selector)
            //    await puppeteerUtil.page.waitForXPath(xpath);
            // 执行 XPath 查询
            elements = await puppeteerUtil.page.$x(xpath);
            // 判断结果是否存在
            if (elements != null && elements.length > 0) {
                console.log('selector element found on the page.[' + selector + ']');
                break;
            } else {
                console.log('selector element not found on the page.[' + selector + '],xpath is ' + elements);
            }

        } catch (e) {
            console.log(`check xpath:${selector} ,can not found,${e}`);
        }
        // 判断结果是否存在
        if (elements != null && elements.length > 0) break;
        await puppeteerUtil.sleep(1000);
    }

    return elements != null && elements.length > 0;
}

