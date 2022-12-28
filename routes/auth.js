const { Router } = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// crear nuevo usuario
router.post('/new', [
  check('name','El nombres es obligatorio').not().isEmpty(),
  check('email','El email es obligatorio').isEmail(),
  check('password','El password es obligatorio').isLength(6),
  validarCampos
],createUser);

// login de usuario
router.post('/',[
  check('email','El email es obligatorio').isEmail(),
  check('password','El password es obligatorio').isLength(6),
  validarCampos
],loginUser);

// valida si el jwt que tiene la app de Angular sigue siendo vigente
router.get('/renew',revalidateToken);

module.exports = router;