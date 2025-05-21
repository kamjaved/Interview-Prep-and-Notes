const express = require('express');
const recipeRouter = require('./recipesRouter');

const app = express();
const PORT = 3001;

//ROUTES
app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
