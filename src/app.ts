import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routing/router.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
mongoose
  .connect(
    'mongodb+srv://eltac:4771680El@cluster0.f9vmpjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err: any) => console.log(err));

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
