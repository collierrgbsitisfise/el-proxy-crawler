const brw = require('simulate-browser');

exports.getHtml = url => new Promise((res, rej) => {
    brw.get(url)
        .then(html => res(html))
        .catch(err => rej(err))
});