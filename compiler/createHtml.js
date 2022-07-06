const { readdirSync, copyFileSync, writeFileSync } = require('fs')
const { readFile, createMenuItem, replaceHtml, createIframe } = require('../libs/utils')
const {
    title,
    outerPath: {
        htmlPath,
        rootPath,
    },
    innerDir: {
        htmlDir
    },
    regexp: {
        reg_ulConent,
        reg_titleContent,
        reg_headerTitleContent,
        reg_iframeContent
    }
} = require('../config')
// 创建index.html
function createIndexHtml(options, outerFilename) {
    const _htmlFiles = readdirSync(htmlPath);
    // 如果外层html文件夹为空 将模版index.html赋值到外层根目录
    if (!_htmlFiles.length) {
        copyFileSync(htmlDir + '/index.html', rootPath + '/index.html', 0, function (error) {
            if (error) {
                throw new Error('file  is failed to copy', error)
            }
        })
        return;
    }
    // 读取模版index.html内的html字符串
    const _indexHtmlStr = readFile(htmlDir + '/index.html')

    let menuList = '';
    let newHtml = '';
    let curIdx = outerFilename ? [].indexOf.call(_htmlFiles, outerFilename) : 0;

    // 遍历外层html文件做menuList
    _htmlFiles.map(function (filename, index) {
        menuList += createMenuItem(filename, options.domain, options.port, index === curIdx ? true : false)
    })

    newHtml = replaceHtml(reg_ulConent, _indexHtmlStr, menuList)
    newHtml = replaceHtml(reg_titleContent, newHtml, options.title || title)
    newHtml = replaceHtml(reg_headerTitleContent, newHtml, options.title || title)
    newHtml = replaceHtml(reg_iframeContent, newHtml, createIframe(_htmlFiles[curIdx], options.domain, options.port))
    // writeFileSync写入文件 ptah、content
    writeFileSync(rootPath + '/index.html', newHtml, function (error) {
        if (error) {
            throw new Error('file  is  failed to write.', error)
        }
    })
}

module.exports = {
    createIndexHtml
}