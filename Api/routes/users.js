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
  
  router.post('/auth', async (req, res, next)=>{
    let data = req.body;
    let user = await db.User.findOne({username: data.username});
    if(typeof data.username !== 'string' || typeof data.password !== 'string' || !user){
      return res.json({
        success: false,
        message: 'Не правильно пароль или логин'
      })
    }
    if(user.verifyPassword(data.password, user)){
      return res.json({
        success: true,
        data: token.sign({user_id: user._id})
      })
    }else{
      return res.json({
        success: false,
        message: 'Не правильно пароль или логин'
      })
    }
  });
  
  app.use('/users', router)
}