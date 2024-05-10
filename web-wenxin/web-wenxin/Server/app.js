const express = require('express');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');

const app = express();
const accountRouter = require('./routers/account');

// 使用 CORS 中间件并配置
app.use(cors());

// 解析请求体中的 JSON 数据
app.use(express.json());

// 使用账户路由
app.use('/api', accountRouter);

// 将public目录指定为静态文件目录
//app.use(express.static('App_html'));

// 定义一个简单的路由，用于测试服务器是否正常运行
app.get('/', (req, res) => {
    res.send('服务器正常运行');
});

// 如果是主进程，则启动集群
if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork({ PORT_OFFSET: i }); // 传递端口号偏移量给工作进程
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });
} else {
    const portOffset = parseInt(process.env.PORT_OFFSET) || 0; // 获取传递的端口号偏移量，如果没有则默认为0
    const port = 3000 + portOffset; // 计算端口号

    app.listen(port, () => {
        console.log(`工作进程 ${process.pid} 启动，运行在端口 ${port}`);
    });
}
