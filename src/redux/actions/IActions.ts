import { FoodCategory, IRecipe } from 'src/redux/reducers/IState';
import { CREATE_RECIPE, DELETE_RECIPE, EDIT_RECIPE, FETCH_CURRENT_RECIPE, FETCH_RECIPE_LIST, FILTER_STRING, FILTER_SUB_CATEGORY, GET_CURRENT_PATH_NAME, SEARCH_VALUE, TOGGLE_PROGRESS_BAR } from 'src/redux/types';

export interface IToggleProgressBarAction {
    type: typeof TOGGLE_PROGRESS_BAR;
    payload: boolean;
}

export interface IFetchRecipesAction {
    type: typeof FETCH_RECIPE_LIST;
    payload: IRecipe[];
}

export interface IFetchCurrentRecipeAction {
    type: typeof FETCH_CURRENT_RECIPE;
    payload: IRecipe;
}

export interface ICreateRecipeAction {
    type: typeof CREATE_RECIPE;
    payload: IRecipe[];
}

export interface IEditRecipeAction {
    type: typeof EDIT_RECIPE;
    payload: IRecipe[];
}

export interface IDeleteRecipeAction {
    type: typeof DELETE_RECIPE;
    payload: IRecipe[];
}

export interface IGetCurrentPathName {
    type: typeof GET_CURRENT_PATH_NAME;
    payload: string;
}

export interface IFilterValue {
    type: typeof FILTER_STRING;
    payload: FoodCategory | "none";
}

export interface IFilterSubCategoryValue {
    type: typeof FILTER_SUB_CATEGORY;
    payload: FoodCategory | "none";
}

export interface IFilterSubCategoryValue {
    type: typeof FILTER_SUB_CATEGORY;
    payload: FoodCategory | "none";
}

export interface ISearchValue {
    type: typeof SEARCH_VALUE;
    payload: string;
}

export type IRootAction = IToggleProgressBarAction | IFetchRecipesAction | IFetchCurrentRecipeAction | IGetCurrentPathName | IFilterValue | IFilterSubCategoryValue | ISearchValue;