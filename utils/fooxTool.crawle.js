const rp = require('request-promise');
const cheerio = require('cheerio');
const brw = require('simulate-browser');

const baseUrl = 'http://foxtools.ru/Proxy?page=2';
// http://foxtools.ru/Proxy?page=2
// https://free-proxy-list.net
// https://free.proxy-sale.com/

const  parseHideMy = async () => {
    brw.get(baseUrl)
        .then(html => {
            let result = [];
            const $ = cheerio.load(html);
            $('#theProxyList tbody tr').each(function (i, tr) {
                result.push({
                  ip: $(tr).children().eq(1).text(),
                  port: $(tr).children().eq(2).text(),
                  country: $(tr).children().eq(3).text(),
                  type: $(tr).children().eq(5).text(),
                  pingTime: $(tr).children().eq(6).text(),
                  lastCheckTime: $(tr).children().eq(7).text()
                })
            });
            console.log('it is all proxy');
            console.log(result);
        }).catch(err => {
            console.log('error');
            console.log(err);
        })
}

exports.parseHideMy = parseHideMy;
// console.log(getResult());