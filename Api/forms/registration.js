var validator = require('validate.js');
var moment = require('moment');
var i18n = require('i18n');

validator.extend(validator.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
        console.log(moment.utc(value));
        return moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
        var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
        console.log(value);
        return moment.utc(value).format(format);
    }
});
validator.options = { format: "flat" };
validator.async.options = { format: "flat", cleanAttributes: false };

/* axilary gender lists*/
var genderList = ["M", "F"];

var validation = i18n.__('validation');

module.exports = {
    first_name: {
        presence: {
            message: validation.first_name.required
        },
        length: {
            maximum: 25,
            message: validation.first_name.maxLength
        }
    },
    last_name: {
        //presence: true,
        length: {
            maximum: 25,
            message: validation.last_name.maxLength
        }
    },
    gender: {
        presence: {
            message: validation.gender.required
        },
        inclusion: {
            within: genderList,
            message: ''
        }
    },
    birth_date: {
        presence: {
            message: validation.birth_date.required
        },
        datetime: {
            dateOnly: true,
            latest: moment.utc().subtract(18, 'years'),
            earliest: moment.utc().subtract(80, 'years'),
            message: validation.birth_date.yearsLimit
        }
    },
    city: {
        //presence: true
    },
    oath_id: {
        //presence: true
    },
    oath_token: {
        //presence: true
    },
    oath_id_vk: {

    },
    oath_token_vk: {

    },
    oath_id_ok: {

    },
    oath_token_ok: {

    },
    nambaOneId: {

    },
    nambaOneToken: {

    },
    email: {
        presence: {
            message: validation.email.required
        },
        email: {
            message: validation.email.format
        }
    }
};