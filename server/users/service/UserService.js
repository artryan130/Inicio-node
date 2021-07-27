const User = require('../model/User');
const bcrypt = require('bcrypt');
const PermissionError = require('../../error/PermissionError');
const QueryError = require('../../error/QueryError');


class UserService {
   async createUser(user){
    try {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
        await User.create(user);
    } catch (error) {
        throw error;
    }   
    }

    async  getAllUsers() {
        return await User.findAll({raw: true, atributes: {exclude: ['password', 'createdAt', 'updatedAt']},});
    }

    async getUserById(id) {
        const user = await User.findByPk(id, {raw: true, atributes: 
            {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
            });
            if(!user){
                throw new QueryError('Nao foi encontrado usuario com essa ID : ${id}')
            }
            return user;
        }

    async updateUser(id, reqUserId, reqUserRole, body) {
        const user = await User.findByPk(id);
        
        if(!user){
            throw new QueryError('Nao foi encontrado usuario com essa ID : ${id}')
        }

        const isAdmin = reqUserRole === 'admin';
        const isUpdateUser = reqUserId == id;

        if(isAdmin || isUpdateUser){
            if(!isAdmin && body.role){
                throw new PermissionError('Voce nao tem permissão para atualizar o seu papel de usuario')
            }
            await user.update(body);

        }else{
            throw new PermissionError('Voce nao tem permissão para atualizar esse usuário');
        }
    }

    async deleteUser(id, reqUserId){
        const user = await User.findByPk(id);
        
        if(id == reqUserId){
            throw new PermissionError('Voce nao tem permissãio para se deletar!')
        }

        if(!user){
            throw new QueryError('Nao foi encontrado usuario com essa ID : ${id}')
        }

        await user.destroy();
    }

    async getCurrentUser(id){
        const user = await User.findByPk(id, {atributes: {exclude: ['password', 'createdAt', 'updatedAt']},});
    
        if(!user){
            throw new QueryError('Nao foi encontrado usuario com essa ID : ${id}')
        }
        return user;
    }
}

module.exports = new UserService;