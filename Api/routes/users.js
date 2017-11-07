var express = require('express');
var router = express.Router();

module.exports = app=>{
  let db = app.get('db');
  let token = app.get('token');
  router.post('/sign_up', async (req, res, next)=>{
    try{
      let data = req.body;
      if(!data.username || !data.password){
        return res.json({
          success: false,
          message: 'Пустые значение'
        })
      }
      let dataForCreate = {};
      dataForCreate.username = data.username;
      dataForCreate.password = data.password;
      dataForCreate.companyId = data.company_id;
      let company = await db.Company.findOne({_id: dataForCreate.companyId});
      if(!company){
        return res.json({
          success: false,
          message: 'Не было найдено такой компании'
        })
      }
      let newUser = await db.User.create(dataForCreate);
      await newUser.cryptPassword(newUser);
      return res.json({
        success: true,
        data: token.sign({user_id: newUser._id})
      })
    }catch(e){
      if(e.code === 11000){
        return res.json({
          success: false,
          message: 'Такой пользователь уже существует'
        })
      }
      return res.json({
        success: false,
        message: e
      })
    }
  });
  
  app.use('/users', router)
}