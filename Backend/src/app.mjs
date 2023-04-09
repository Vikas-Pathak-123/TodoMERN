import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './todo.mjs';
import todoRoutesMDB from './todoMongoDB.mjs';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/todos', todoRoutes);
app.use('/todomdb', todoRoutesMDB);

export default app;
   