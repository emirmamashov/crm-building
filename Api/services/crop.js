var sharp = require('sharp');
//var config = require('../config');

module.exports = function (url, height, width) {
    console.log('crop---url = '+url);
    var urls = url.split('/');
    var fileNames = urls[urls.length-1].split('.');
    var uniqueName = fileNames[0]+'_'+Date.now().toString()+'_'+height+'x'+width+'.'+fileNames[1];
    var newUrl = url.replace(urls[urls.length-1], '') + uniqueName;
    return new Promise (function (resolve, reject) {
      sharp(url).resize(parseInt(height), parseInt(width))
              .toFile(newUrl, function(err) {
                console.log(err);
                if (err) reject(err);
                resolve({
                 height: height,
                 width: width,
                 photo: uniqueName
                });
        });
    });
}