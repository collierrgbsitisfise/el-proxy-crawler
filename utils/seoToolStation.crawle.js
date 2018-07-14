/**
 * Parse 'https://seotoolstation.com/free-proxy-list' 
 */

const cheerio = require('cheerio');
const { getHtml } = require('./common/getHtml');

const baseUrl = 'https://seotoolstation.com/free-proxy-list';

const  seoToolStation = async () => {
    try {
        const html =  await getHtml(baseUrl);

        let data = [];
            
        const $ = cheerio.load(html);
        
        $('table.table.table-striped tbody tr').each(function (_, tr) {
            try {
                data.push({
                    ip: $(tr).children().eq(1).text(),
                    port: $(tr).children().eq(2).text(),
                    country: $(tr).children().eq(3).text(),
                  })
            } catch (err) {
                //oooop shit happens -_-
            }
        });
    
        console.log('seoToolStation ', data.length);
        return {
            error: false,
            data
        };
    } catch (err) {
        return {
            error: true,
            data: []
        }
    }

}

exports.seoToolStation = seoToolStation;