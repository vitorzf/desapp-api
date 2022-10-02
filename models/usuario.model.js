const md5 = require("md5");
const sql = require("../modules/mysql");

exports.checkLogin = async (usuario, senha) => {

    return await sql.execSQL("SELECT id, email, usuario, foto FROM usuario WHERE (email = ? OR usuario = ?) AND senha = ? and ativo = 1",[usuario, usuario, md5(senha)]);

}

exports.getUsuario = async (id) => {

    return await sql.execSQL("SELECT * FROM usuario WHERE id = ?", [id]);

}

exports.mudarSenha = async (id, senha) => {

    let params = {senha: md5(id)};
    
    let where = {id: id};

    return await sql.update("usuario", params, where);

}

exports.checkEmail = async (email) => {

    return await sql.execSQL("SELECT * FROM usuario WHERE email = ?",[email]);

}

exports.checkUsuario = async (usuario) => {

    return await sql.execSQL("SELECT * FROM usuario WHERE usuario = ?",[usuario]);

}

exports.novoUsuario = async (dados) => {

    dados.senha = md5(dados.senha);
    
    return await sql.insert("usuario", dados, true);
}