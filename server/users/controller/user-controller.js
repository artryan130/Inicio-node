const router = require('express').Router();
const { session } = require('passport');
const passport = require('passport');
const UserService = require('../service/UserService');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
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
        console.log(error);
    }
});

router.get('/', async (req, res) =>{
    try {
     const users = await UserService.getAllUsers();
     
     res.status(200).json(users);   
    } catch (error) {
        console.log(error);
    }
});

router.get('/user/:id', async (req, res) =>{
    try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    
    res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

router.put('/user/:id', async (req, res) =>{
    try {
    const userId = req.params.id;
    await UserService.updateUser(userId, req.body);

    res.status(204).end();    
    } catch (error) {
        console.log(error);
    }

});

router.delete('/user/:id', async (req,res) =>{
    try {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    
    res.status(204).end();    
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res, next) =>{ //rota de autenticação de login
    passport.authenticate(
        'login',
        (error, user, info) =>{
            try {
                if(error){
                    return next(error);
                }

                req.login(
                    user,
                    {session: false},
                    (error) => {
                        if(error) next(error);

                        const body = {
                            id: user.id,
                            role: user.role
                        }

                        const token = jwt.sign({user: body}, process.env.SECRET_KEY, 
                        {expiresIn: process.env.JWT_EXPIRATION});

                        res.cookie('jwt', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                        });

                        res.status(204).end();

                    },
                );

            } catch (error) {
                next(error);
            }
        },
    )(req, res, next);
});

module.exports = router;
