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
            console.log('it is html');
            console.log(html);
        }).catch(err => {
            console.log('error');
            console.log(err);
        })
}

exports.parseHideMy = parseHideMy;
// console.log(getResult());