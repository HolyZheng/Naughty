import { init as initLexer, parse as parseImports } from 'es-module-lexer';
import { Readable } from 'stream';
import resolve from 'resolve';

// 是否为bare import
const bareImportRE = /^[^\/\.]/

// 处理文件内容里的import
const rewriteImports = async ({content, root}) => {
    // 去掉开头的utf 字节顺序标示 （BOM）
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  try {
    await initLexer;
    // 获取esm 声明语句或变量的字符位置等信息
    const imports = parseImports(content)[0];
    for (let i = 0; i < imports && imports.length; i++) {
        const { s: start, e: end, d: dynamicIndex } = imports[i]
        let id = source.substring(start, end)
        // 分路径类型进行处理
        if (bareImportRE.test(id)) {
            let pkgPath = resolve(id, {basedir: root})
            console.log(pkgPath);
        }
    }
  } catch(e) {
      console.error(`处理文件import关键字发生错误：${e}`)
  }

}

const stringifyBody = async (stream) => {
    if (stream instanceof Readable) {
      return new Promise((resolve, reject) => {
        let res = ''
        stream
          .on('data', (chunk) => (res += chunk))
          .on('error', reject)
          .on('end', () => {
            resolve(res)
          })
      })
    } else {
      return !stream || typeof stream === 'string' ? stream : stream.toString()
    }
  }

export {
    rewriteImports,
    stringifyBody
}
