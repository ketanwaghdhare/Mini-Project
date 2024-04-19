require('dotenv').config();
const http = require("http");
const PORT = process.env.PORT || 8080;
const app = require('./app/app.js');
const connectDB = require('./app/db/dbConnection.js');

const server = http.createServer(app);

async function startServer(){
    await connectDB();
    server.listen(PORT,()=>{
        console.log(`Listening on http://localhost:${PORT}`);
    })
}

startServer();

