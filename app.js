// http://foxtools.ru/Proxy?page=2
// https://free-proxy-list.net
// https://free.proxy-sale.com/
const {
    foxToolsRu
} = require('./utils/fooxTool.crawle');
const {
    freeProxySale    
} = require('./utils/freeProxySale.crawle');

freeProxySale()
    .then(({ data }) => {
        console.log('parse foToolsRu');
        console.log(data.length);
    }).catch(err => {
        console.log('error');
        console.log(err);
    });
