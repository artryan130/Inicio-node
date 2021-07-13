const User = require('../model/User');
const bcrypt = require('bcrypt');
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
        return await User.findByPk(id, {raw: true, atributes: {exclude: ['password', 'createdAt', 'updatedAt']},});
    }

    async updateUser(id, reqUserId, reqUserRole, body) {
        const user = await User.findByPk(id);
        
        const isAdmin = reqUserRole === 'admin';
        const isUpdateUser = reqUserId == id;

        if(isAdmin || isUpdateUser){
            if(!isAdmin && body.role){
                throw new Error('Voce nao tem permissão para atualizar o seu papel de usuario')
            }
            await user.update(body);

        }else{
            throw new Error('Voce nao tem permissão para atualizar esse usuário');
        }
    }

    async deleteUser(id, reqUserId){
        const user = await User.findByPk(id);
        
        if(id == reqUserId){
            throw new Error ('Voce nao tem permissãio para se deletar!')
        }
        await user.destroy();
    }

    async getCurrentUser(id){
        return await User.findByPk(id, {atributes: {exclude: ['password', 'createdAt', 'updatedAt']}});
    }
}

module.exports = new UserService;