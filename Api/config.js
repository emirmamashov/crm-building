var path = require('path');

module.exports = {
  PRIVATE_KEY: process.env.PRIVATE_KEY || 'in_code_we_trust',
  ROOT: path.normalize(__dirname),
  ATTACHMENT_PATH: path.normalize(__dirname + '/attachments'),
  DB_PATH: path.normalize(__dirname + '/../Database'),
  production: {
    url: process.env.DB_URL || "mongodb://localhost:27017/crm_building",
  },
  development: {
    url: process.env.DB_URL || "mongodb://localhost:27017/crm_building",
  },
  test: {
    url: process.env.DB_URL || "mongodb://localhost:27017/crm_building_test",
  }
};
