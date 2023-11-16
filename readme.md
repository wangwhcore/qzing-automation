
环境确认：
1、确认本地已经安装了 node.js ,命令行执行： node -v，查看版本
2、确认本地已经安装了chorme，并位于C:/Program Files (x86)/Google/Chrome/Application/chrome.exe，
    如果路径不一致，请到 pupeerUtil.js中修改 chrome路径
使用方式：
1、下载代码到本地
2、在qzing-automation目录下执行： npm i；
3、脚本文件位于 test目录下，参见： a.tag
4、运行示例：
        node  index.js   ./test/a.tag 
5、编写新脚本后，例如：/test/myui.tag,执行如下命令：
         node  index.js   ./test/myui.tag 