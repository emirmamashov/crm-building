module.exports = (app)=>{
  let db = app.get('db');
  app.use(async (req, res, next)=>{
    req.user = await db.User.findOne({'_id': req.user_id}) || undefined;
    next()
  })
};