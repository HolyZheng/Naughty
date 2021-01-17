import Koa from 'koa';
import chokidar from 'chokidar';
import plugins from './plugin/index.js';

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// 监听文件变化
const watcher = chokidar.watch(process.cwd(), {
    ignored: [/node_modules/, /\.git/],
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 10
    }
});
const context = {
    root: process.cwd(),
    app,
    watcher,
    port: 3000
}

// 对各种类型的请求进行处理，比如react的转译
plugins.forEach(plugin => plugin && plugin(context));


// response
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);