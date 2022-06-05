import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { mongo } from 'mongoose';
import userRouter from './routes/user.routes';
import orgRouter from './routes/organizator.routes';
import vodjaRouter from './routes/vodja.routes';
import delegatRouter from './routes/delegat.routes';
import homeRouter from './routes/home.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/testproj');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo ok');
})

const router = express.Router();
router.use('/user', userRouter);
router.use('/organizator', orgRouter);
router.use('/vodja', vodjaRouter);
router.use('/delegat', delegatRouter);
router.use('/home', homeRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));