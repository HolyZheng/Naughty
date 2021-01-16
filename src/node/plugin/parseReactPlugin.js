const reactPlugin = ({ app }) => {
    app.use(async (ctx, next) => {
        if (!ctx.path.endsWith('.jsx')) {
            return next()
        }
    })
}
export default reactPlugin;
