require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./config/db.js');

connectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});