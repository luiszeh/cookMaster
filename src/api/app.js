const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const { validateToken } = require('../auth/validateToken');
const recipesController = require('../controllers/recipesController');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

// POSTS

app.post('/users', userController.createUser);

app.post('/login', userController.login);

app.post('/recipes', validateToken, recipesController.newRecipe);

// GETS

app.get('/recipes', recipesController.getRecipes);

app.get('/recipes/:id', recipesController.getRecipe);

// PUTS

app.put('/recipes/:id', validateToken, recipesController.editRecipe);

// DELETES

app.delete('/recipes/:id', validateToken, recipesController.deleteRecipe);

// MIDDLEWARE DE UPLOAD:

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// PUTS UPLOAD

app.put('/recipes/:id/image', validateToken, upload.single('image'), recipesController.insertImage);

// LER A IMG FEITA NO UPLOAD:

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
