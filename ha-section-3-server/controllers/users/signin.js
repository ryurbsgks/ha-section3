const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달

  let userInfo = await user.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })

  if(!userInfo){

    res.status(404).send("invalid user");
  }else{

    let data = {
      id: userInfo.dataValues.id,
      email: userInfo.dataValues.email,
      username: userInfo.dataValues.username,
      mobile: userInfo.dataValues.mobile,
      createdAt: userInfo.dataValues.createdAt,
      updatedAt: userInfo.dataValues.updatedAt
    }
    const accessToken = generateAccessToken(data);
    sendAccessToken(res, accessToken);
    res.status(200).send({data: {accessToken: accessToken}, message: "ok"})
  }
};
