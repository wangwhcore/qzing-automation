const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    // 发送指令给服务器
    ws.send(JSON.stringify({ action: 'goto', url: 'https://www.baidu.com' }));
    ws.send(JSON.stringify({ action: 'click', selector: 'button#submit-button' }));
    ws.send(JSON.stringify({ action: 'doubleclick', selector: 'input#username' }));
    ws.send(JSON.stringify({ action: 'type', selector: 'input#password', text: 'your-password' }));
    ws.send(JSON.stringify({ action: 'rightclick', selector: 'div#context-menu' }));
    ws.send(JSON.stringify({ action: 'maximize' }));
    // 发送鼠标移动指令
    ws.send(JSON.stringify({ action: 'mousemove', x: 100, y: 100 }));

    // 发送鼠标点击指令
    ws.send(JSON.stringify({ action: 'mousedown' }));

    // 发送鼠标释放指令
    ws.send(JSON.stringify({ action: 'mouseup' }));
});

ws.on('message', (message) => {
    const response = JSON.parse(message);
    if (response.status === 'success') {
        console.log('Command executed successfully');
    } else {
        console.error(`Error: ${response.message}`);
    }
});

ws.on('close', () => {
    console.log('Connection closed');
});