const express = require("express");
const controller = require("../controllers/usuario.controller");
const guard = require("../modules/guard");

const router = express.Router();

router.post("/usuarios/login", controller.login);

router.post("/usuarios/registro", controller.registro);

router.put("/usuarios/alterar_senha", guard.check_token, controller.alterarSenhaUsuario);

module.exports = router;