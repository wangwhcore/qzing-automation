// liveMode.js
import readline from 'readline';

function executeCommand(command) {
  console.log('Executing command:', command);
  // 在这里执行你的命令逻辑
}

export function startLiveMode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    if (input.toLowerCase() === 'live') {
      console.log('Live mode activated. Enter your commands:');
    } else if (input.toLowerCase() === 'exit') {
      console.log('Exiting live mode.');
      rl.close();
    } else if (input.trim() !== '') {
      executeCommand(input);
    }
  });

  console.log('Type "live" to enter live mode. Type "exit" to exit live mode.');
}


