const express = require("express");
const router = express.Router();
// const uiudv4 = require("uuid/v4");

const { readRecipes } = require("../utils/helper.js");

router.get("/", (req, res) => {
    // const recipe = readRecipe();
    const listRecipes = readRecipes().map((recipe) => {
        const { id, name, main_ingredient, ingredients, image_url } = recipe;
        return { id, name, main_ingredient, ingredients, image_url };
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

// router.post("/upload", (req, res) => {
//     const newRecipe = {
//         id: uuidv4(),
//         name: req.body.name,
//         description: "Classic Caesar salad with grilled chicken and homemade dressing.",
//         ingredients: [
//             "Chicken Breasts",
//             "Chicken",
//             "Romaine Lettuce",
//             "Croutons",
//             "Parmesan Cheese",
//             "Caesar Dressing",
//         ],
//         main_ingredient: "chicken",
//         steps: [
//             "Season the chicken breasts with salt and pepper.",
//             "Grill the chicken until cooked through and slice it into strips.",
//             "Wash and dry the romaine lettuce, then tear it into bite-sized pieces.",
//             "In a large bowl, toss the romaine with Caesar dressing until well coated.",
//             "Top the salad with sliced chicken, croutons, and shaved Parmesan cheese.",
//             "Serve chilled, garnished with additional Parmesan and cracked black pepper if desired.",
//         ],
//         prep_time: req.body.prep_time,
//         cook_time: req.body.cook_time,
//         total_time: req.body.total_time,
//         servings: req.body.servings,
//         image_url: "http://localhost:5050/images/recipe_01.jpg",
//     };
//     writeRecipe(newRecipe);
//     res.status(201).json(newRecipe);
// });

module.exports = router;
