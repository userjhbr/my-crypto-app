// server.js
//servidor para acesso ao banco mongodb... teste js, mas esse backend a ideia é ser python
//para iniciar o servidor: na pasta sentiment-analysis node server.js

// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Porta para o seu servidor backend

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://mongodb:27017/sentiment_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
//
mongoose.connection.on('connected', () => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB:', err);
  });  
//
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => console.log('Conectado ao MongoDB'));

// Definição do esquema do documento
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

// Rota para criar um novo Todo
app.post('/todos', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = new Todo({ title, completed });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar todos os Todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar um Todo específico por ID
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo === null) {
      return res.status(404).json({ message: 'Todo não encontrado' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para atualizar um Todo existente por ID
app.put('/todos/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    if (updatedTodo === null) {
      return res.status(404).json({ message: 'Todo não encontrado' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para excluir um Todo existente por ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (deletedTodo === null) {
      return res.status(404).json({ message: 'Todo não encontrado' });
    }
    res.json({ message: 'Todo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
