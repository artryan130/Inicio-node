const router = require('express').Router();
const UserService = require('../service/UserService');

router.post('/', async (req, res) =>{
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,        //criando um usuário novo
        image: req.body.image,
        role: 'user',
    };

    await UserService.createUser(user);
    res.status(201).end;
});

module.exports = router;
