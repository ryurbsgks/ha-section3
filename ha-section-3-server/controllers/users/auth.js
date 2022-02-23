const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  // TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.

  if(!accessTokenData){

    return res.json({data: null, message: "not authorized"})
  }
  // id: 1,
  // email: 'hoyong@codestates.com',
  // username: 'hoyong',
  // mobile: '010-1234-5678',
  // createdAt: '2020-10-10T10:00:12.000Z',
  // updatedAt: '2020-10-10T10:00:12.000Z',

  let userInfo = {
    id: accessTokenData.id,
    email: accessTokenData.email,
    username: accessTokenData.username,
    mobile: accessTokenData.mobile,
    createdAt: accessTokenData.createdAt,
    updatedAt: accessTokenData.updatedAt
  }

  res.status(200).send({data: {userInfo: userInfo}})
};