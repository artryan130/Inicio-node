const {body} = require('express-validator');
const validate = require('./validate'); 

function getValidations(method){
    switch(method){
        case 'login': {
            return [
                body('email')
                    .exists()
                    .withMessage('O campo de email deve estar preenchido!')
                    .isEmail()
                    .withMessage('O email inserido nao é valido'),
                body('password')
                    .exists()
                    .withMessage('Voce deve digitar uma senha!')
                    .notEmpty()
                    .withMessage('O campo de senha deve estar preenchido')
            ];
        };
        case 'creatUser': {
            return [
                body('name')
                    .exists()
                    .withMessage('Voce deve enviar um nome')
                    .isAlpha('pt-BR', {ignore: ' '})
                    .withMessage('Seu nome deve conter apenas letras'),
                body('email')
                    .exists()
                    .withMessage('Voce deve enviar um email')
                    .isEmail()
                    .withMessage('O email inserido nao é valido'),
                body('password')
                    .exists()
                    .withMessage('Insira uma senha')
                    .isStrongPassword()
                    .withMessage('Sua senha deve conter 8 caracteres, com letras maiusculas, minusculas, numeros e caracteres especiais'),
                body('image')
                    .exists()
                    .withMessage('O campo imagem deve ser preenchido')
                    .isURL()
                    .withMessage('A imagem deve ser uma URL')
            ];
        };

        case 'updateUser': {
            return [
                body('name')
                    .optional()
                    .isAlpha('pt-BR', {ignore: ' '})
                    .withMessage('Seu nome deve conter apenas letras'),
                body('email')
                    .optional()
                    .isEmail()
                    .withMessage('O email inserido nao é valido'),
                body('image')
                    .optional()
                    .isURL()
                    .withMessage('A imagem deve ser uma URL'),
                body('role')
                    .optional()
                    .isIn(['admin', 'user'])
                    .withMessage('O papel do usuario é invalido')
            ];
        };
    }
}

function userValidate(method){
    const validations = getValidations(method);
    return validate(validations);
}
module.exports = userValidate;