const express = require('express');
const next = require('next');
const proxy = require('express-http-proxy');

const dev = process.env.NODE_ENV === 'dev';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 3001;

app.prepare()
    .then(() => {
        const server = express();
        server.use('/api', proxy('https://xdbin.com/'));
        server.use('/netease', proxy('http://47.104.56.20:4000/'));
        // server.use('/api', proxy('http://localhost:8080'));
        server.use('/static', express.static('static'));

        // 默认首页
        server.get('/', (req, res) => {
            const actualPage = '/blog';
            app.render(req, res, actualPage);
        });
        // 博客列表
        server.get('/blog', (req, res) => {
            const actualPage = '/blog';
            app.render(req, res, actualPage);
        });
        // 博客详情
        server.get('/blog/:blogId', (req, res) => {
            const actualPage = '/detail';
            const queryParams = { blogId: req.params.blogId };
            app.render(req, res, actualPage, queryParams);
        });
        // 标签查询
        server.get('/tag', (req, res) => {
            const actualPage = '/tag';
            app.render(req, res, actualPage);
        });
        server.get('/tag/:tag', (req, res) => {
            const actualPage = '/tag';
            const queryParams = { tag: req.params.tag };
            app.render(req, res, actualPage, queryParams);
        });

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
