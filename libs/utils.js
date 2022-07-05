const { readFileSync } = require('fs')
const { domain, port } = require('../config')
function readFile(path) {
    return readFileSync(path, 'utf8')
}
// 创建菜单项
function createMenuItem(filename, userDomain, userPort, isActive) {
    return `
    <li class="menu-item ${isActive ? 'active' : ''}">
        <a   href="${_foratBaseUrl(userDomain, userPort)}/src/html/${filename}" target ="myFrame">
        ${filename.replace('.html', '')}
        </a>
    </li>
    `;
}

//  创建iframe
function createIframe(filename, userDomain, userPort) {
    return `
    <iframe src="${_foratBaseUrl(userDomain, userPort)}/src/html/${filename}" name="myFrame"></iframe>
    `;

}

// 组合baseURL
function _foratBaseUrl(userDomain, userPort) {
    userPort = Number(userPort);
    if (userDomain && userPort) {
        return `${userDomain}:${userPort}`
    }
    if (userDomain && !userPort) {
        return `${userDomain}`
    }
    if (!userDomain && userPort) {
        return `${domain}:${userPort}`
    }
    if (!userDomain && !userPort) {
        return `${domain}:${port}`
    }
    return `${domain}:${port}`
}
function replaceHtml(regexp, html, content) {
    return html.replace(html.match(regexp)[1], content)
}

module.exports = {
    readFile,
    createMenuItem,
    replaceHtml,
    createIframe
}