const { readdirSync, copyFileSync } = require('fs')
const { createIndexHtml } = require('../compiler')

const {
    outerPath: {
        jsPath,
        cssPath,
        htmlPath
    },
    innerDir: {
        jsDir,
        cssDir,
        htmlDir
    }
} = require('../config/index')

function initFiles(options) {
    copyFiles('css')
    copyFiles('js')
    createIndexHtml(options)
    copyWelcomePage()
}

function copyFiles(field) {
    let _innerFiles = [];
    let _outerFiles = [];
    let _dir = '';
    let _path = '';
    /**
     *@name readdirSync 读取目录
     */
    switch (field) {
        case 'css':
            _dir = cssDir;
            _path = cssPath;
            _innerFiles = readdirSync(cssDir)
            _outerFiles = readdirSync(cssPath)
            break;
        case 'js':
            _dir = jsDir;
            _path = jsPath;
            _innerFiles = readdirSync(jsDir)
            _outerFiles = readdirSync(jsPath)
            break;
        default:
            break;
    }
    _innerFiles.map(function (innerFile) {
        if (_outerFiles.indexOf(innerFile) === -1) {
            /**
            * @name  copyFileSync 拷贝文件
            * @param originFile 源文件路径
            * @param targetFile  需要创建的目标文件路径及名称 
            */
            copyFileSync(_dir + '/' + innerFile, _path + '/' + innerFile, 0, function (error) {
                if (error) {
                    throw new Error('file  is failed to copy', error)
                }
            })
        }
    })
}
// 拷贝欢迎页面
function copyWelcomePage() {
    const _htmlFile = readdirSync(htmlPath);
    if (!_htmlFile.length) {
        copyFileSync(htmlDir + '/welcome.html', htmlPath + '/welcome.html', 0, function (error) {
            if (error) {
                throw new Error('file  is failed to copy', error)
            }
        })
    }
}
module.exports = initFiles;