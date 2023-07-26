const fs = require("fs");

const readRecipes = () => {
    const data = fs.readFileSync("./data/recipe.json");
    return JSON.parse(data);
};

const writeRecipes = (recipe) => {
    const recipeArray = readRecipes();
    recipeArray.push(recipe);
    fs.writeFileSync("./data/recipe.json", JSON.stringify(recipeArray));
};
module.exports = { readRecipes };
