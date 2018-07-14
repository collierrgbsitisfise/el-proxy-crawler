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

const baseUrl = 'https://free.proxy-sale.com';

const getLastPage = (html) => {
    const $ = cheerio.load(html);
    const lastElemnt = $('ul.pagination').children().last().html();
    const value = $(lastElemnt).text();  
    return value;
}

const  freeProxySale = async () => {
    try {
        const html =  await getHtml(baseUrl);
        const numOfPage = Number(getLastPage(html));
        let data = [];
        await ( () => new Promise((resolve, rej) => {
            Array(numOfPage).fill(0).forEach((_, i) => {
                parsePageNumber(i + 1)
                    .then(arr => {
                        data = [...data, ...arr]
                        if (i + 1 === numOfPage) {
                            resolve(true);
                        }
                    }).catch(err => {
                        if (i + 1 === numOfPage) {
                            resolve(true);
                        }
                        console.warn(err);   
                    });
            });
        }))();

        return {
            error: false,
            data
        }
    } catch (err) {
        return {
            error: true,
            data: null
        }
    }

}

parsePageNumber = async (num) => {
    const html =  await getHtml(`${baseUrl}?pg=${num}`);
    let data = [];
        
    const $ = cheerio.load(html);
    
    $('table.table-lk tbody tr').each(function (i, tr) {
        data.push({
          ip: $(tr).children().eq(0).text(),
          port: $($(tr).children().eq(2).html()).attr('src').split('=').pop(),
          country: $(tr).children().eq(4).text(),
          type: $(tr).children().eq(10).text(),
          lastCheckTime: $(tr).children().eq(12).text()
        })
    });

    return data;
}

exports.freeProxySale = freeProxySale;