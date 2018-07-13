// http://foxtools.ru/Proxy?page=2
// https://free-proxy-list.net
// https://free.proxy-sale.com/
const {
    foxToolsRu
} = require('./utils/fooxTool.crawle');

foxToolsRu()
    .then(data => {
        console.log(data);
    })
