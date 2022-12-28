const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = ( req,res = response ) => {
  console.log('createUser');

  /*
  const errors = validationResult( req );
  
  if(!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      msg: errors.mapped()
    })
  }
  */

  const { email, name, password } = req.body;
  console.log(email,password);

  return res.json({
    ok: true,
    msg: 'create user /new'
  })
}

const loginUser = ( req,res ) => {
  console.log('loginUser');

  /*
  const errors = validationResult( req );
  
  if(!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      msg: errors.mapped()
    })
  }
  */

  const { email, password } = req.body;
  console.log(email,password);

  return res.json({
    ok: true,
    msg: 'login user /'
  })
}

const revalidateToken = ( req,res ) => {
  return res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidateToken
}