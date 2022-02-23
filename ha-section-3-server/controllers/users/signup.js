const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.

  if(!req.body.username || !req.body.email || !req.body.password || !req.body.mobile){

    return res.status(422).send("insufficient parameters supplied");
  }

  user.findOrCreate({
    where: {
      email: req.body.email
    },
    default: {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      mobile: req.body.mobile
    }
  }).then(([result, created]) =>{
    if(!created){

      res.status(409).send("email exists");
    }
    
    let data = {
      id: result.dataValues.id,
      email: result.dataValues.email,
      username: result.dataValues.username,
      mobile: result.dataValues.mobile,
      createdAt: result.dataValues.createdAt,
      updatedAt: result.dataValues.updatedAt
    }
    const accessToken = generateAccessToken(data);

    sendAccessToken(res, accessToken);
    res.status(201).send({message: "ok"})
  }).catch( error => {

    res.status(500).send();
  })
};