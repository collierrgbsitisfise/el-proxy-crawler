const _ = require('underscore');
const mongoose = require('mongoose');
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
                    const newProxy = new Proxy(prox);
                    await newProxy.save();
                } catch (err) {
                    // console.log('err in saving');
                }

            }
        } catch (err) {
            // console.log('GET ALL PROXY IN CRON JOB');
            // console.log(err);
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
                country: it.country.trim(),
                time: new Date()
            }
        }));
    }).catch(err => {
        reject(err);
    });
});
