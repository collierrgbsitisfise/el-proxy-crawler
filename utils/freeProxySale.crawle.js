/**
 * Parse 'https://free.proxy-sale.com'
 * to get next page just add a query param
 * just like this
 * https://free.proxy-sale.com?pg=1 [get second page]
 * https://free.proxy-sale.com?pg=2 [get second page]
 * https://free.proxy-sale.com?pg=n [get n page] 
 */

const cheerio = require('cheerio');
const { getHtml } = require('./common/getHtml');

const baseUrl = 'https://free.proxy-sale.com/?pg=1';

const getLastPage = (html) => {
    const $ = cheerio.load(html);
    const lastElemnt = $('ul.pagination').children().last().html();
    const value = $(lastElemnt).text();  
    return value;
}

const  foxToolsRu = async () => {
    try {
        const html =  await getHtml(baseUrl);
        getLastPage(html);
    } catch (err) {
        return {
            error: true,
            data: null
        }
    }

}
foxToolsRu();
parsePageNumber = async (num) => {
    const html =  await getHtml(`${baseUrl}?page=${num}`);
    let data = [];
        
    const $ = cheerio.load(html);
    
    $('#theProxyList tbody tr').each(function (i, tr) {
        data.push({
          ip: $(tr).children().eq(1).text(),
          port: $(tr).children().eq(2).text(),
          country: $(tr).children().eq(3).text(),
          type: $(tr).children().eq(5).text(),
          pingTime: $(tr).children().eq(6).text(),
          lastCheckTime: $(tr).children().eq(7).text()
        })
    });

    return data;
}

exports.foxToolsRu = foxToolsRu;