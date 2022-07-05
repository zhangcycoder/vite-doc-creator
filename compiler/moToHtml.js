const { writeFileSync } = require('fs')
const markdown = require('marked');
const highlight = require('highlight.js');
const { readFile } = require('../libs/utils')
const {
    outerPath: {
        mdPath,
        htmlPath
    },
    regexp: {
        reg_mdStr
    },
    innerDir: {
        htmlDir
    }
} = require('../config')
markdown.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value
    }
})
function mdToHtml(filename) {
    //读取markdown文件
    const _mdStr = readFile(mdPath + '/' + filename);
    //读取markdown的模版html文件
    let _htmlStr = readFile(htmlDir + '/md.html')
    // 将markdown文件的内容通过markdown插件转换成html字符串
    const newStr = markdown.marked(_mdStr)
    _htmlStr = _htmlStr.replace(reg_mdStr, newStr)
    // 将新的_htmlStr写入html文件并保存到src/html目录下
    writeFileSync(htmlPath + '/' + filename.replace('.md', '.html'), _htmlStr, function (err) {
        if (err) {
            throw new Error('File is failed to write.', err);
        }
    });
}

module.exports = mdToHtml
