//un middleware sólo es una función
// los middleware en express se ejecutan de forma secuencial

const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req,res = response, next ) => {
  const errors = validationResult( req );
  if(!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      errors:errors.mapped()
    })
  }

  // el next hace que se pase al siguiente middleware si lo hubiera
  next();
}

module.exports = {
  validarCampos
}
