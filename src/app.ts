// const express = require('express');
import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todo';
import { json } from 'body-parser';
import db from 'mongoose';

const app = express();
app.use(json());

app.listen(3005);

app.use('/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

db.connect('mongodb://127.0.0.1/todos');