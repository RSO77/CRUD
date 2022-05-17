import express from 'express'
import mongoose from 'mongoose';
import router from './Router.js';

const PORT = 3000;
const DB_URL = `mongodb+srv://RSOst:kWuVpzszQtlMW50g@cluster0.tqypt.mongodb.net/?retryWrites=true&w=majority`

const app = express();
app.use(express.json());
app.use('/api', router)


async function startApp(){
    try{
        await mongoose.connect(DB_URL)
        app.listen(PORT, ()=> console.log('Server started'))
    } catch(e) {
        console.log(e);
    }
}

startApp();