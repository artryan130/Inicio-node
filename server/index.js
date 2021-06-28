const app = require('./config/express-config');

app.get('/',(req, res) =>{
    res.send('<h1>Hello World!</h1>')
});

app.get('/user', (req, res) => {
    const pessoa = {
        nome: 'Arthur',
        sobrenome: 'Ryan'
    }
res.json(pessoa);
})


app.listen(3000, 'localhost', () => console.log('Servidor rodando'));