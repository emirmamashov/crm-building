let mongoose = require('mongoose');
let glob = require('glob');

let config = require('./config');

db = {
    connect: (databaseUrl) => {
        return mongoose.connect(databaseUrl);
    }
};

let models = glob.sync(config.MODELS_URL);
models.forEach((model) => {
    require(model)(db);
});

module.exports = db;