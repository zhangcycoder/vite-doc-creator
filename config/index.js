const { resolve } = require('path')
// 默认端口
const port = process.env.npm_config_port;
// 默认域名
const domain = 'http://localhost';
// 默认title
const title = 'This is my first Document by Vite-Doc-Creator'


/** 项目目录体系
 * src 
 *  js
 *  html
 *  css
 */
const outerPath = {
    rootPath: resolve(__dirname, '../../../'),
    srcPath: resolve(__dirname, '../../../src/'),
    htmlPath: resolve(__dirname, '../../../src/html/'),
    cssPath: resolve(__dirname, '../../../src/css/'),
    jsPath: resolve(__dirname, '../../../src/js/'),
    mdPath: resolve(__dirname, '../../../workspace/'),
}
/**插件目录体系 
 * temp_files-> 
 *      css
 *      js
 *      html
 */
const innerDir = {
    rootDir: resolve(__dirname, '../temp_files/'),
    htmlDir: resolve(__dirname, '../temp_files/html'),
    cssDir: resolve(__dirname, '../temp_files/css'),
    jsDir: resolve(__dirname, '../temp_files/js'),
}

const regexp = {
    // 匹配 ul menu-list的内容
    reg_ulConent: /<ul class=\"menu-list\">([\s\S]*?)<\/ul>/,
    reg_titleContent: /<title>([\S\s]*?)<\/title>/,
    reg_headerTitleContent: /<h1 class=\"header-title\">([\s\S]*?)<\/h1>/,
    reg_iframeContent: /<div class=\"iframe-page\">([\s\S]*?)<\/div>/,
}
module.exports = {
    port,
    domain,
    title,
    outerPath,
    innerDir,
    regexp
}