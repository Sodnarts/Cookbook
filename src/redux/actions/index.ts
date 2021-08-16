import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_CURRENT_RECIPE, FETCH_RECIPE_LIST, TOGGLE_PROGRESS_BAR } from 'src/redux/types';
import { ICreateRecipeAction, IDeleteRecipeAction, IEditRecipeAction, IFetchCurrentRecipeAction, IFetchRecipesAction, IToggleProgressBarAction } from 'src/redux/actions/IActions';
import { routes } from 'src/common/routes/routes';
import { IRecipe } from 'src/redux/reducers/IState';

export const toggleProgressBar = (show: boolean) => (dispatch: Dispatch<IToggleProgressBarAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: show });
};

export const getRecipes = () => async (dispatch: Dispatch<IToggleProgressBarAction | IFetchRecipesAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    const response = await axios.get(routes.api.getRecipes)

    dispatch({ type: FETCH_RECIPE_LIST, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}

export const getCurrentRecipe = (_id: string) => async (dispatch: Dispatch<IToggleProgressBarAction | IFetchCurrentRecipeAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    const response = await axios.post(routes.api.getCurrentRecipe, { _id })

    dispatch({ type: FETCH_CURRENT_RECIPE, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}

export const createRecipe = (recipe: IRecipe) => async (dispatch: Dispatch<IToggleProgressBarAction | ICreateRecipeAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    const response = await axios.post(routes.api.newRecipe, { recipe })

    dispatch({ type: FETCH_RECIPE_LIST, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}

export const editRecipe = (recipe: IRecipe) => async (dispatch: Dispatch<IToggleProgressBarAction | IEditRecipeAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    const response = await axios.post(routes.api.editRecipe, { recipe })

    dispatch({ type: FETCH_RECIPE_LIST, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}

export const deleteRecipe = (_id: string) => async (dispatch: Dispatch<IToggleProgressBarAction | IDeleteRecipeAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    console.log("ID: ", _id);
    const response = await axios.post(routes.api.deleteRecipe, { _id })

    dispatch({ type: FETCH_RECIPE_LIST, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}