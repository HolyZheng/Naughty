const reactPlugin = ({ app }) => {
    app.use(async (ctx, next) => {
        if (!ctx.path.endsWith('.css')) {
            return next()
            
        }
        return next()
    })
}
export default reactPlugin;
