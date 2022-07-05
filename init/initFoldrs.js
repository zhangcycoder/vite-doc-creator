const { mkdirSync, existsSync } = require('fs')
const {
    outerPath: {
        srcPath,
        jsPath,
        cssPath,
        htmlPath,
        mdPath
    }
} = require('../config/index')

function initFoldrs() {
    const list = [srcPath, jsPath, cssPath, htmlPath, mdPath]
    list.forEach((path) => {
        // 相应文件夹不存在的情况下再创建
        if (!existsSync(path)) {
            createFolder(path)
        }
    })
}

function createFolder(path) {
    // 同步创建文件夹
    mkdirSync(path, function (error) {
        if (error) {
            throw new Error('Folder is failed to create', error)
        }
    })
}
module.exports = initFoldrs;