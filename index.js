const { initFoldrs, initFiles, initWatchers } = require('./init')
class ViteDocCreator {
    constructor(options) {
        this.option = {
            title: undefined,
            port: 0,
            domain: undefined
        }
        if (options) {
            //合并用户配置
            Object.assign(this.option, options)
        }
        // 执行工具初始化函数
        this.initialize();
    }
    initialize() {
        // 初始化项目文件夹
        initFoldrs(this.option);
        // 初始化项目文件
        initFiles(this.option);
        // 初始化舰艇html与markdown文件及文件夹变化
        initWatchers(this.option)
    }
}

module.exports = ViteDocCreator;