const router = require('express').Router();
const recipes = require('./recipies.json');

router.get('/', (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 3;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const paginatedRecipes = recipes.slice(startIndex, endIndex);

	res.json(paginatedRecipes);
});

module.exports = router;
