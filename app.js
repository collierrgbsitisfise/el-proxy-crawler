// http://foxtools.ru/Proxy?page=2
// https://free-proxy-list.net
// https://free.proxy-sale.com/
const _ = require('underscore');
const {
    foxToolsRu
} = require('./utils/fooxTool.crawle');
const {
    freeProxySale    
} = require('./utils/freeProxySale.crawle');

Promise.all([
    freeProxySale(),
    foxToolsRu()
]).then((data) => {
    const dataFreeProxySale = data[0].data;
    const datafoxToolsRu = data[1].data;
    const total = [
        ...dataFreeProxySale,
        ...datafoxToolsRu
    ];
    console.log('Parse Both');
    console.log(total.length);

    console.log('unique values');
    console.log(_.uniq(total, p => p.ip).length);
})