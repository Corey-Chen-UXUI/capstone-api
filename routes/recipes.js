const express = require("express");
const router = express.Router();

const { readRecipes } = require("../utils/helper.js");

router.get("/", (req, res) => {
    // const recipe = readRecipe();
    const listRecipes = readRecipes().map((recipe) => {
        const { id, name, main_ingredient, ingredients } = recipe;
        return { id, name, main_ingredient, ingredients };
    });
    res.status(200).json(listRecipes);
});

router.get("/recipes-all", (req, res) => {
    // const recipe = readRecipe();
    const listRecipes = readRecipes().map((recipe) => {
        return recipe;
    });
    res.status(200).json(listRecipes);
});

router.get("/:id", (req, res) => {
    const recipe = readRecipes();
    const selectedRecipe = recipe.find((recipe) => {
        return recipe.id === req.params.id;
    });
    res.status(200).json(selectedRecipe);
});

module.exports = router;
