"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
// const TODOS: Todo[] = [];
const createTodo = async (req, res, next) => {
    try {
        const data = req.body;
        console.log(data);
        let todos = await todo_1.default.create(data);
        return res.status(200)
            .json({ message: 'Todo created successfully', todos });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
    // // const text = req.body.text;
    // const text = (req.body as { text: string }).text;
    // const newTodo = new Todo(Math.random().toString(), text);
    // Todo.create(newTodo);
    // res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = async (req, res, next) => {
    try {
        let todos = await todo_1.default.find();
        return res.status(200).json({ todos });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
    // res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new todo_1.default(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted!' });
};
exports.deleteTodo = deleteTodo;
