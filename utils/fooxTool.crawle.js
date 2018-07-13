const rp = require('request-promise');
const cheerio = require('cheerio');
const { getHtml } = require('./common/getHtml');

const baseUrl = 'http://foxtools.ru/Proxy?page=2';


const  foxToolsRu = async () => {
    try {
        const html =  await getHtml(baseUrl);
        
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

exports.foxToolsRu = foxToolsRu;
// console.log(getResult());