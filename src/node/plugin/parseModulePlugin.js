import {rewriteImports, stringifyBody} from '../utils/util.js';

const modulePlugin = ({ app, root }) => {
    app.use(async (ctx, next) => {
        await next()
        if (ctx.body && ctx.response.is('js') && !ctx.url.endsWith('.map') && !ctx.url.endsWith('.css')) {
            const content = await stringifyBody(ctx.body);
            ctx.body =  rewriteImports({content, root});
        }
    })
}
export default modulePlugin;
