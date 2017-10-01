var validator = require('validate.js');
var moment = require('moment');

validator.extend(validator.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

/* axilary gender lists*/
var genderList = ["M", "F"];

module.exports = {
  first_name: {
    presence: true,
    length: {
      maximum: 25
    }
  },
  last_name: {
    //presence: true,
    length: {
      maximum: 25
    }
  },
  gender: {
    //presence: true,
    //inclusion: genderList
  },
  birth_date: {
    //presence: true,
    /*datetime: {
      dateOnly: true,
      latest: moment.utc().subtract(18, 'years'),
      earliest: moment.utc().subtract(80, 'years')
    }*/
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
  session_secret_key_ok: {

  },
  nambaOneId: {
    
  },
  nambaOneToken: {

  },
  email: {
    //presence: true,
    //email: true
  }
};
