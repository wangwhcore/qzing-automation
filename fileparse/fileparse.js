import fs from 'fs';

export function convertTagToJs(tagFileName, jsFileName) {
    try {
        // 读取 *.tag 文件内容
        const tagContent = fs.readFileSync(tagFileName, 'utf-8');

        // 进行转换
        const jsContent = convertTagToJsLogic(tagContent);
        console.log("trans to js format sucess");
        // 进行命令转换
        const txtContent = convertJsToChromeLogic(jsContent);
        console.log("trans to chrome format sucess");

        // 将转换后的内容写入 *.js 文件
        fs.writeFileSync(jsFileName, txtContent);
        console.log(`Conversion successful: ${tagFileName} -> ${jsFileName}`);
    } catch (error) {
        console.error(`Conversion failed: ${error}`);
    }
}

function convertJsToChromeLogic(jsContent) {
    // 将每行拆分为数组
    const lines = jsContent.split('\n');

    // 初始化DevTools命令
    let devToolsCommands = `import {click_intent,exist,wait,type_intent,select_intent,date_intent} from '../chromeevent/chromeEvent.js';\nimport puppeteerUtil from  '../chromeevent/pupeerheader.js';\n\n\n`;

    // 遍历每一行进行转换
    lines.forEach(line => {
        console.log("trans to chrome format sucess:"+line);
        // 忽略注释和空行
        if (line.trim() === ''||line.trim().startsWith('//') ) {
            return;
        }
        //按空格切分行
        var params = line.trim().split(' ').map(part => part.trim());
        var md = getModifier(params);
        if(line.trim().startsWith('http')){
            devToolsCommands += `await puppeteerUtil.open(${md[0]}${params[0]}${md[0]})\n`
        }
        // 检查是否有click语句，转换为DevTools命令
        else if (line.trim().startsWith('click')) {
            params = line.trim().split('click ').map(part => part.trim());//部分路径中可能包含 or 、and 等，需要将其判断为一个整体
            devToolsCommands += `await click_intent(${md[1]}${params[1]}${md[1]})\n`;
        }
        // 检查是否有type语句，转换为DevTools命令
        else if (line.trim().startsWith('type')) {
            params = line.trim().match(/(type)\s+(.+)\s+(as)\s+(.+)/);
            md = getModifier(params);
            devToolsCommands += `await type_intent(${md[2]}${params[2]}${md[2]},${md[4]}${params[4]}${md[4]})\n`;
        }
        // 检查是否有type语句，转换为DevTools命令
        else if (line.trim().startsWith('selectdate')) {
            params = line.trim().match(/(selectdate)\s+(.+)\s+(as)\s+(.+)/);
            
            devToolsCommands += `await date_intent(${md[2]}${params[2]}${md[2]},${md[4]}${params[4]}${md[4]})\n`;
        }
        // 检查是否有type语句，转换为DevTools命令
        else if (line.trim().startsWith('select')) {
            devToolsCommands += `await select_intent(${md[2]}${params[2]}${md[2]},${md[4]}${params[4]}${md[4]},${md[5]}${params[5]}${md[5]})\n`;
        }
        // 检查是否有type语句，转换为DevTools命令
        else if (line.trim().startsWith('wait')) {
            devToolsCommands += `await wait(${params[1]})\n`;
        }
        // // 检查是否有type语句，转换为DevTools命令
        // else if (line.trim().startsWith('if')) {
        //     if(line.trim().includes('exist(')){
        //         // var newline = line.replace('exist(','await puppeteerUtil.exist(');
        //         devToolsCommands += newline+'\n';
        //     }
            
        // }
        // 对其他语句不做特殊处理，原样拼接
        else {
            devToolsCommands += `${line.trim()}\n`;
        }
    });

    return devToolsCommands;
}
function getModifier(params) {
    var md = [];
    for(var i=0;i<params.length;i++) {
        if(params[i].includes("\""))md[i] = "'";
        else md[i] = "\"";
    }
    return md;
}
function convertTagToJsLogic(tagContent) {
    // 将每行拆分为数组
    const lines = tagContent.split('\n');

    // 初始化JavaScript代码
    let jsCode = '';

    // 初始化缩进
    let indent = 0;

    // 遍历每一行进行转换,js语义转换
    lines.forEach(line => {
        // 忽略注释和空行
        if (line.trim().startsWith('//') || line.trim() === '') {
            return;
        }
        //如果当前行没有缩进，则补充`}`
        if(!line.startsWith('    ')&&indent >0){
            indent = 0;
            jsCode += `}\n`;
        }
        // 检查是否有if语句，转换为JavaScript的条件语句
        if (line.trim().startsWith('if')) {
            jsCode += `${'    '.repeat(indent)}if (${line.trim().substring(2)}) {\n`;
            indent++;
        }
        // 检查是否有else语句，转换为JavaScript的条件语句
        else if (line.trim() === 'else') {
            indent--;
            jsCode += `${'    '.repeat(indent)}} else {\n`;
            indent++;
        }
        // 检查是否有echo语句，转换为JavaScript的注释
        else if (line.trim().startsWith('echo')) {
            jsCode += `${'    '.repeat(indent)}// ${line.trim().substring(4)}\n`;
        }
        // 对其他语句不做特殊处理，原样拼接
        else {
            jsCode += `${'    '.repeat(indent)}${line.trim()}\n`;
        }
    });

    // 添加缺失的 '}'
    while (indent > 0) {
        indent--;
        jsCode += `${'    '.repeat(indent)}}\n`;
    }

    return jsCode;
}

// // 使用方式示例
// const tagFileName = 'E:/2023/qzing-automation/test/a.tag';
// const jsFileName = 'E:/2023/qzing-automation/test/a.js';
// convertTagToJs(tagFileName, jsFileName);

// import puppeteerUtil from '../chromeevent/pupeerheader.js';
// (async () => {
//     await puppeteerUtil.open('http://10.10.20.74');
//     puppeteerUtil.send("click 新建");
//     // 在这里执行其他操作...

//     // 关闭浏览器
//     // await puppeteerUtil.closeBrowser();
// })();