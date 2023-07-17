import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
dotenv.config();

const app = express();
const port = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
