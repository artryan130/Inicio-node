const app = require('./config/express-config');

const User = require('./users/model/User');

app.listen(3000, 'localhost', () => console.log('Servidor rodando'));