/**
 * Parse 'https://seotoolstation.com/free-proxy-list' 
 */

const cheerio = require('cheerio');
const { getHtml } = require('./common/getHtml');

const baseUrl = 'https://seotoolstation.com/free-proxy-list';

const  seoToolStation = async () => {
    const html =  await getHtml(baseUrl);

    let data = [];
        
    const $ = cheerio.load(html);
    
    $('table.table.table-striped tbody tr').each(function (i, tr) {
        data.push({
          ip: $(tr).children().eq(1).text(),
          port: $(tr).children().eq(2).text(),
          country: $(tr).children().eq(3).text(),
        })
    });

    return data;
}

seoToolStation()

exports.seoToolStation = seoToolStation;