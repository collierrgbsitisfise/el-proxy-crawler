const _ = require('underscore');

const {
    foxToolsRu
} = require('./utils/fooxTool.crawle');

const {
    freeProxySale    
} = require('./utils/freeProxySale.crawle');

const {
    seoToolStation
} = require('./utils/seoToolStation.crawle');

Promise.all([
    freeProxySale(),
    foxToolsRu(),
    seoToolStation()
]).then((data) => {
    const dataFreeProxySale = data[0].data;
    const datafoxToolsRu = data[1].data;
    const dataSeoToolStation = data[2].data;

    const total = [
        ...dataFreeProxySale,
        ...datafoxToolsRu,
        ...dataSeoToolStation
    ];
    console.log('Parse Both');
    console.log(total.length);

    console.log('unique values');
    console.log(_.uniq(total, p => p.ip).length);
    require('fs').writeFile(

        './proxy.json',
    
        JSON.stringify(_.uniq(total, p => p.ip).map(it => {
           return {
               ip: it.ip.trim(),
               port: it.port.trim(),
               country: it.country.trim()
           } 
        })),
    
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );
}).catch(err => {
    console.log(err);
})