const _ = require('underscore');
const mongoose = require('mongoose');
const rp = require("request-promise");
const cron = require('node-cron');

const {
    foxToolsRu,
    freeProxySale,
    seoToolStation
} = require('./utils');
const Proxy = require('./models/Proxy.model');

mongoose.connect('mongodb://admin:vadim1@ds247330.mlab.com:47330/easy-links-db', { useNewUrlParser: true }, async (err) => {
    if (err) {
        return;
    }

    cron.schedule('0 0 0 * * *', async function(){
        try {
            const allProxy = await getAllProxy();
            await Proxy.remove({}).exec();
            for (let prox of allProxy) {
                try {
                    result = await rp.get({
                        url: 'http://google.com',
                        method: 'GET',
                        timeout: 3000,
                        followRedirect: true,
                        proxy: `http://${prox.ip}:${prox.port}`
                      });
                    const newProxy = new Proxy(prox);
                    await newProxy.save();
                } catch (err) {
                    console.log('err in saving for proxy ', prox.ip);
                }

            }
        } catch (err) {
            console.log('ERRO TRYC1');
            console.log(err);
        }
    });
});

const getAllProxy = () => new Promise((resolve, reject) => {
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

        resolve(_.uniq(total, p => p.ip).map(it => {
            return {
                ip: it.ip.trim(),
                port: it.port.trim(),
                type: it.type.trim(),
                country: it.country.trim(),
                time: new Date()
            }
        }));
    }).catch(err => {
        reject(err);
    });
});
