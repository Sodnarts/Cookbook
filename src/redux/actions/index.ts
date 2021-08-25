import axios from 'axios';
import { Dispatch } from 'redux';
import { FETCH_CURRENT_RECIPE, FETCH_RECIPE_LIST, FILTER_STRING, FILTER_SUB_CATEGORY, GET_CURRENT_PATH_NAME, SEARCH_VALUE, TOGGLE_PROGRESS_BAR } from 'src/redux/types';
import { ICreateRecipeAction, IDeleteRecipeAction, IEditRecipeAction, IFetchCurrentRecipeAction, IFetchRecipesAction, IFilterSubCategoryValue, IFilterValue, IGetCurrentPathName, ISearchValue, IToggleProgressBarAction } from 'src/redux/actions/IActions';
import { routes } from 'src/common/routes/routes';
import { FoodCategory } from 'src/redux/reducers/IState';

const config = {
    headers: { 'content-type': 'multipart/form-data' }
}

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

export const createRecipe = (recipe: FormData) => async (dispatch: Dispatch<IToggleProgressBarAction | ICreateRecipeAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    const response = await axios.post(routes.api.newRecipe, recipe, config)
    
    dispatch({ type: FETCH_RECIPE_LIST, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}

export const editRecipe = (recipe: FormData) => async (dispatch: Dispatch<IToggleProgressBarAction | IEditRecipeAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    const response = await axios.post(routes.api.editRecipe, recipe, config)

    dispatch({ type: FETCH_RECIPE_LIST, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}

export const deleteRecipe = (_id: string) => async (dispatch: Dispatch<IToggleProgressBarAction | IDeleteRecipeAction>) => {
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: true });
    const response = await axios.post(routes.api.deleteRecipe, { _id })

    dispatch({ type: FETCH_RECIPE_LIST, payload: response.data })
    dispatch({ type: TOGGLE_PROGRESS_BAR, payload: false })
}

export const getCurrentPathName = (pathName: string) => async (dispatch: Dispatch<IGetCurrentPathName>) => {
    dispatch({ type: GET_CURRENT_PATH_NAME, payload: pathName })
}

export const filterList = (filterValue: FoodCategory | "none") => async (dispatch: Dispatch<IFilterValue>) => {
    dispatch({ type: FILTER_STRING, payload: filterValue })
}

export const filterSubCategory = (filterValue: FoodCategory | "none") => async (dispatch: Dispatch<IFilterSubCategoryValue>) => {
    dispatch({ type: FILTER_SUB_CATEGORY, payload: filterValue })
}

export const searchList = (searchValue: string) => async (dispatch: Dispatch<ISearchValue>) => {
    dispatch({ type: SEARCH_VALUE, payload: searchValue })
}