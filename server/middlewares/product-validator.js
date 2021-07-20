const {body} = require('express-validator');
const validate = require('./validate');

function getValidations(method){
    switch(method){
        case 'createProduct': {
            return [
                body('name')
                .exists()
                .withMessage('Voce deve enviar um nome')
                .notEmpty()
                .withMessage('Nao pode ser vazio'),

                body('description')
                .exists()
                .withMessage('Voce deve enviar uma descricao')
                .notEmpty()
                .withMessage('Nao pode ser vazio'),

                body('image')
                .exists()
                .withMessage('O campo imagem deve ser preenchido')
                .isURL()
                .withMessage('A imagem deve ser uma URL'),

                body('price')
                .exists()
                .withMessage('Voce deve enviar um preço')
                .isFloat({gt: 0})
                .withMessage('O preco deve ser positivo'),

                body('condition')
                .exists()
                .withMessage('Voce deve enviar uma condicao')
                .isIn(['new','used'])
                .withMessage('A condicao é invalida'),
            ];
        };

        case 'updateProduct': {
            return [
                body('name')
                .optional()
                .notEmpty()
                .withMessage('Nao pode ser vazio'),

                body('description')
                .optional()
                .notEmpty()
                .withMessage('Nao pode ser vazio'),

                body('image')
                .optional()
                .isURL()
                .withMessage('A imagem deve ser uma URL'),

                body('price')
                .optional()
                .isFloat({gt: 0})
                .withMessage('O preco deve ser positivo'),

                body('condition')
                .optional()
                .isIn(['new','used'])
                .withMessage('A condicao é invalida'),

            ];
        }
    }
}

function userValidate(method){
    const validations = getValidations(method);
    return validate(validations);
}

module.exports = productValidate;