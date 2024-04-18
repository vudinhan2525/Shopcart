const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE?.replace(
    '<password>',
    process.env.DATABASE_PASSWORD as string,
);
mongoose
    .connect(DB)
    .then(() => console.log('Connecting to database successfully!!'))
    .catch(() => console.log('Error when connecting to database'));

const server = require('./app.ts');
const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`App is running in port ${port}`);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});
