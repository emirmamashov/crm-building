var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];
let request = require('request');

module.exports = {
    /*body = {
        token: token,
        title: title,
        message: message,
        target_url: target_url
    }*/
    sendPush(body) {
        console.log('-----------sendPush----------------');
        let options = {
            method: 'POST',
            url: config.nambaOne.root_url_prod + '/apps/notifications/push',
            headers: { 'content-type': 'application/json' },
            body: {
                token: body.nambaOneToken,
                title: body.title,
                message: body.message,
                target_url: body.target_url
            },
            json: true
        };
        console.log(options);
        return new Promise((resolve, reject) => {
            console.log('-----------sendPush----------------');
            console.log(options);
            request(options, (error, response, body) => {
                if (error) {
                    reject(error);
                }

                console.log(body);
                resolve(body);
            });
        });
    }
}