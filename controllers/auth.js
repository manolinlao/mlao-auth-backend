const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const createUser = async( req,res = response ) => {
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
  console.log(email,name,password);

  try{
    // verificar que el email no existe en la DB
    const user = await User.findOne({email:email});
    if(user){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese email'
      })
    }

     // crear el usuario con el modelo
     const dbUser = new User(req.body);

    // encriptar contraseña mediante Hash
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password,salt);

    // generar el JWT
    const token = await generarJWT( dbUSer.id, name );

    // crear el usuario en la DB
    await dbUser.save();

    // generar respuesta exitosa

    return res.status(201).json({
      ok: true,
      uid:dbUser.id,
      name,
      token
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin.'
    })
  }  

}

const loginUser = async( req,res ) => {
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
  console.log( email, password );

  try{
    const dbUser = await Usuario.findOne({email:email});

    if(!dbUser){
      return res.status(400).json({
        ok: false,
        msg: 'El correo no existe'
      });
    }

    // confirmar si el password hace match
    // compara el password sin encriptar con el encriptado de la DB, internamente lo hashea para comparar
    const validPassword = bcrypt.compareSync( password, dbUser.password);
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'El password no es válido'
      });
    }

    // tenemos un usuario, su password y son válidos
    // generamos el jwt
    const token = await generarJWT( dbUser.id, dbUser.name );

    // respuesta del servicio - por defecto el status es 200
    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    });
  

  }catch(error){
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin.'
    })
  }

}

// renovación del token
// 
// Si hago login con el mismo usuario, varias veces, me está retornando un jwt diferente cada vez.
// Como es una autenticación pasiva, mi backend no mantiene la sesión activa del usuario
//    por lo que puedo tener millones usuarios de forma simultánea
//    y hasta que no hacen una petición,  ahí es donde voy a confirmar ese jwt.
// En el servicio de renew, le vamos  a mandar el jwt en los headers

const revalidateToken = async( req,res ) => {
  const { uid,name } = req;

  // generamos el jwt
  const token = await generarJWT(uid, name );

  return res.json({
    ok:true,
    uid,
    name,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidateToken
}