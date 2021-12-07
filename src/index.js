const app = require('./app');
const mongooseConnection = require('./config/mongoose');

mongooseConnection.once('open', () => console.log('Connected to database'));
mongooseConnection.on('error', (e) => console.log(e));

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
