/**
 * Parse 'http://foxtools.ru/Proxy'
 * to get net page just add a query param
 * just like this
 * http://foxtools.ru/Proxy?page=2 [get second page]
 * http://foxtools.ru/Proxy?page=2 [get second page]
 * http://foxtools.ru/Proxy?page=n [get n page] 
 */

const cheerio = require('cheerio');
const { getHtml } = require('./common/getHtml');

const baseUrl = 'http://foxtools.ru/Proxy?page=2';

const getLastPage = (html) => {
    const $ = cheerio.load(html);
    return $('div.pager').children().last().text()
}

const  foxToolsRu = async () => {
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
        }))()
        
        
        return {
            error: false,
            data: data
        }

    } catch (err) {
        return {
            error: true,
            data: null
        }
    }

}

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