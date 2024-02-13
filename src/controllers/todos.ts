import { RequestHandler } from 'express';
import Todo, { TodoModel } from '../models/todo';

// const TODOS: Todo[] = [];

export const createTodo: RequestHandler = async (req, res, next) => {
    try {
        const data: TodoModel = req.body;
        console.log(data);
        let todos = await Todo.create(data);
        return res.status(200)
            .json({ message: 'Todo created successfully', todos });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
    // // const text = req.body.text;
    // const text = (req.body as { text: string }).text;
    // const newTodo = new Todo(Math.random().toString(), text);
    // Todo.create(newTodo);
    // res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};

export const getTodos: RequestHandler = async (req, res, next) => {
    try {
        let todos = await Todo.find();
        return res.status(200).json({ todos });
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
    // res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = (req.body as { text: string }).text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted!' });
}