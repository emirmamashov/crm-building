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

module.exports = {
  first_name: {
    length: {
      maximum: 16
    }
  },
  last_name: {
    length: {
      maximum: 16
    }
  },
  password: {
    presence:true,
    length: {
      minimum: 6
    }
  },
  city: {
  },
  oath_id: {
    presence: true
  },
  email: {
    email: true
  }
};
