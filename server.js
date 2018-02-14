const express = require('express');
const next = require('next');
const proxy = require('express-http-proxy');

const dev = process.env.NODE_ENV === 'dev';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 3000;

app.prepare()
    .then(() => {
        const server = express();
        server.use('/api', proxy('http://chatbuy-dev.com/'));
        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`v2项目于${port}端口启动。`);
        });
    })
    .catch((e) => {
        console.error(e.stack);
        process.exit(1);
    });
