
var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
let request = require('request');
let fs = require('fs');

// services
let crop = require('./crop');

module.exports = {
    uploadNetwork (url, userId, network_id) {
        console.log('-------------uploadNetwork-------------');
        let urlArr = url.split('/');
        let fileName = urlArr[urlArr.length-1];

        let fileNameArr = [];
        fileNameArr = fileName.split('?');
        fileName = fileNameArr[0] ? fileNameArr[0] : fileName;
        console.log(fileNameArr);
        let fileNameOptions = fileName.split('.');
        console.log(fileNameOptions);
        let dateNow = new Date();
        let imageExtension = fileNameOptions.length > 1? '.'+fileNameOptions[fileNameOptions.length - 1] :'.jpg';
        console.log(imageExtension);
        fileName = fileNameOptions[0]+'_'+dateNow.getMilliseconds()+imageExtension;
        var date = new Date();
        var newurl = config.UPLOAD_DIR+'/'+fileName;
        console.log(newurl);

        return new Promise((resolve, reject) => {
                if (!fileName || !userId) reject({
                    success: false,
                    message: 'что то пошло не так',
                    data: {
                        status: 403
                    }
                });
                var streamReq =  request(url).on('response', (response) => {
                    console.log('---------request download in network----------');
                    if (response.statusCode === 200) {
                        var file = streamReq.pipe(fs.createWriteStream(newurl));
                        file.on('finish',function (err) {
                            console.log(err);
                            var photo = new db.Photo({
                                url: '/uploads'+newurl.replace(config.UPLOAD_DIR, ''),
                                user: userId,
                                network_url: url,
                                network_id: network_id
                            });

                            var urlForCrop = config.STATIC_DIR + photo.url;
                            var cropsPromise = [];
                            for(idx in config.sizes) {
                                cropsPromise.push(crop(urlForCrop, config.sizes[idx].height, config.sizes[idx].width));
                            }
                            
                            Promise.all(cropsPromise).then(
                                (photoNames) => {
                                    console.log(photoNames);
                                    for (var idx in photoNames) {
                                        var fieldName = 'url_'+photoNames[idx].height+'x'+photoNames[idx].width;
                                        photo[fieldName] = '/uploads/'+photoNames[idx].photo;
                                    }

                                    console.log(photo);

                                    photo.save().then(
                                        (response) => {
                                            resolve({
                                                success: true,
                                                message: 'Успешно',
                                                status: 'green',
                                                data: {
                                                    code: 200,
                                                    message: 'ok',
                                                    data: {
                                                        photo: photo
                                                    }
                                                }
                                            });
                                        }
                                    ).catch(
                                        (err) => {
                                            reject({
                                                success: false,
                                                message: 'Что то пошло не так',
                                                status: 'red',
                                                data: {
                                                    code: 500,
                                                    message: err
                                                }
                                            });
                                        }
                                    );
                                }
                            ).catch(
                                (err) => {
                                    reject({
                                        success: false,
                                        message: 'Что то пошло не так',
                                        status: 'red',
                                        data: {
                                            code: 500,
                                            message: err
                                        }
                                    });
                                }
                            );
                        });
                    } else {
                        reject({
                            success: false,
                            message: 'Что то пошло не так',
                            status: 'red',
                            data: {
                                code: 500,
                                message: err
                            }
                        });
                    }
                });
        });
    }
}
