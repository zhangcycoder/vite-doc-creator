const {
    watch,
    existsSync,
    unlinkSync
} = require('fs');
const { createIndexHtml, mdToHtml } = require('../compiler')
const {
    outerPath: {
        htmlPath,
        mdPath
    },

} = require('../config/index')

/**watch可能不太稳定的
 * 监听文件 或者文件夹的变化-》 watch的  回调函数  
 * param path   需要舰艇的文件夹或者文件路径
 * param callback  当文件或文件夹发生变化的时候触发
 */

function watchHtml(options) {
    watch(htmlPath, function (event, filename) {
        if (filename) {
            createIndexHtml(options, event === 'change' && filename)
        }
    })
}
function watchMarkdown() {
    watch(mdPath, function (event, filename) {
        // 如果文件变化了
        if (filename) {
            // 找这个文件在workspace里是否存在
            // 如果不存在，证明是删除操作
            if (!existsSync(mdPath + '/' + filename)) {
                // 不存在的情况，就要删除html文件夹对应的文件
                const removingFile = htmlPath + '/' + filename.replace('.md', '.html');
                existsSync(removingFile) && unlinkSync(removingFile)
                return;
            }
            // 如果filename存在在workspace中，
            // 将这个md文件转换成html放入html文件夹中
            mdToHtml(filename);
        }
    })
}


function initWatchers(options) {
    watchHtml(options)
    watchMarkdown()
}


module.exports = initWatchers;