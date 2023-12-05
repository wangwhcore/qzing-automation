import * as readline from 'readline';
import { parseLine } from './fileparse.js';
import { click_intent, exist, wait, type_intent, select_intent, date_intent } from '../chromeevent/chromeEvent.js';
import { checkPrime } from 'crypto';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function enterCommandLineMode() {
    // 创建 readline 接口
    // 监听 uncaughtException 事件
    process.on('uncaughtException', (err) => {
        console.error('发生异常:', err.message);
        // 进入命令行模式
        execCommand();
    });

    // 进入命令行模式
    execCommand();
}

export function execCommand() {
    // 提示用户输入指令
    rl.question('输入指令或输入 exit 退出: \n', (input) => {
        if (input.toLowerCase() === 'exit') {
            // 用户输入 exit，退出程序
            rl.close();
            process.exit(0);
        } else {
            try {
                // 使用 try...catch 捕获 eval() 的异常
                console.log('处理指令:', input,'\n');
                checkInput(input);
                
                var command = parseLine(input, "");
                console.log('解析指令:', command,'\n');
                // const result = eval(command);
                const userFunction = new Function(
                    'click_intent', 'exist', 'wait', 'type_intent', 'select_intent', 'date_intent', 'command',
                    `
                        return (async () => {
                        try {
                            `+command+`
                        } catch (error) {
                            console.error(error.message);
                        }
                        })();
                    `
                );
                userFunction(click_intent, exist, wait, type_intent, select_intent, date_intent);
            } catch (error) {
                console.error('执行出错:', error.message,'\n');
            }

            // 继续等待用户输入
            execCommand();
        }
    });
}

function checkInput(input){
    if(input.split())
}
