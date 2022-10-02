const express = require("express");
const md5 = require("md5");
const sql = require("../modules/mysql");
const jwt = require("jsonwebtoken");
const model = require("../models/usuario.model");

module.exports = {
    login : async (req, res) => {
        let dados = req.body;

        try {

            let result = await model.checkLogin(dados.login, dados.senha);

            if(result.length != 0)
            {
                
                const id = result[0].id;
    
                const token = jwt.sign({id}, process.env.SECRET, {
                    expiresIn:'30d'
                });
    
                return res.json({erro: false, token: token, usuario: result[0]});
    
            }
    
            return res.status(401).json({erro: true, msg:"Login inválido"});
    
        } catch (error) {
            
            return res.status(500).json({erro: true, msg:"Erro interno do servidor"});
            
        }
    },
    registro : async (req, res) => {

        let dados = req.body;
    
        try {
    
            let email_repetido = await model.checkEmail(dados.email);
    
            if(email_repetido.length != 0){
                return res.status(400).json({erro: true, msg:"Email já cadastrado"});
            }
    
            let usuario_repetido = await model.checkUsuario(dados.usuario);
    
            if(usuario_repetido.length != 0){
                return res.status(400).json({erro: true, msg:"Nome de Usuário já cadastrado"});
            }

            let id_novo_usuario = model.novoUsuario(dados.usuario);
            
            const token = jwt.sign({id_novo_usuario}, process.env.SECRET, {
                expiresIn:'30d'
            });
    
            let dados_usuario = await model.getUsuario(id_novo_usuario);
    
            res.json({erro: false, token: token, usuario: dados_usuario});
    
        } catch (error) {

            res.status(500).json({erro: true, msg:"Erro interno do servidor"});
            
        }
    
    },
    alterarSenhaUsuario : async (req, res) => {

        if(req.body.senha == undefined || req.body.senha.length < 6){
            return res.status(400).json({erro: true, msg: "Parâmetros incorretos"});
        }
    
        try {
            
            let alterar_senha = model.alterarSenhaUsuario(req.usuario, req.body.senha);
    
            if(alterar_senha){
                return res.json({erro: false, msg:"Senha Alterada com Sucesso!"});
            }
            
            return res.status(500).json({erro: true, msg: "Erro ao alterar senha"});
    
        } catch (error) {
            res.status(500).json({erro: true, msg:"Erro interno do servidor"});
        }
    }
}