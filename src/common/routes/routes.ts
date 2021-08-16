export const routes = {
    api: {
        getRecipes: `${process.env.REACT_APP_API_BASE_URL}/api/recipes`,
        getCurrentRecipe: `${process.env.REACT_APP_API_BASE_URL}/api/recipes/current`,
        newRecipe: `${process.env.REACT_APP_API_BASE_URL}/api/recipes/new`,
        editRecipe: `${process.env.REACT_APP_API_BASE_URL}/api/recipes/edit`,
        deleteRecipe: `${process.env.REACT_APP_API_BASE_URL}/api/recipes/delete`,
    },
    recipes: {
        recipeList: '/',
        createRecipe: '/create',
        editRecipe: '/edit',
        readRecipe: '/read/:id'
    }
};
