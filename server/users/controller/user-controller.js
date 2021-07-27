const router = require('express').Router();
const UserService = require('../service/UserService');
const {
    loginMiddleware, 
    notLoggedIn, 
    jwtMiddleware, 
    checkRole,
} = require('../../middlewares/auth-middlewares');
const objectFilter = require('../../middlewares/object-filter');
const userValidate = require('../../middlewares/user-validator');

router.post('/', objectFilter('body',['name', 'email', 'image', 'password']), 
userValidate('creatUser'),
async (req, res, next) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,        //criando um usuário novo
            image: req.body.image,
            role: 'user',
        };

    await UserService.createUser(user);
    
    res.status(201).end();
    } catch (error) {
        next(error);
    }
});

router.get('/', jwtMiddleware, async (req, res, next) =>{ //retornando todos usuários
    try {
     const users = await UserService.getAllUsers();
     
     res.status(200).json(users);   
    } catch (error) {
        next(error);
    }
});

router.get('/user/:id', jwtMiddleware, async (req, res, next) =>{ //retornar usuario por id
    try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    
    res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.put('/user/:id', jwtMiddleware, objectFilter('body',['name', 'email', 'image', 'password']),
userValidate('updateUser'),
async (req, res, next) =>{ //alterar por id
    try {
    const userId = req.params.id;
    await UserService.updateUser(userId, req.user.id, req.user.role, req.body);

    res.status(204).end();    
    } catch (error) {
        next(error);
    }

});

router.delete('/user/:id', jwtMiddleware, checkRole('admin'), async (req, res, next) =>{ //deletar por id
    try {
    const userId = req.params.id;
    await UserService.deleteUser(userId, req.user.id);
    
    res.status(204).end();    
    } catch (error) {
        next(error);
    }
});

router.post('/login',notLoggedIn, userValidate('login'), loginMiddleware); //logar

    
router.get('/logout', jwtMiddleware, (req, res, next) =>{ //deslogar
    try {
        res.clearCookie('jwt');
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

router.get('/me', jwtMiddleware, async (req, res, next) => {
    try{
    const user = await UserService.getCurrentUser(req.user.id)
    res.status(200).json(user);
    }catch(error){
        next(error);
    }
});

module.exports = router;
