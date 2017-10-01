module.exports = {
    development: {
      ROOT_DIR: __dirname,
      DB_URL: process.env.DB_URL || 'mongodb://localhost/meetings',
      UPLOAD_DIR: __dirname + '/public/uploads',
      STATIC_DIR: __dirname + '/public'
    }
}