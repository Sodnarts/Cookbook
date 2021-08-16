import { IFetchRecipesAction } from 'src/redux/actions/IActions';
import { IRecipe } from 'src/redux/reducers/IState';
import { FETCH_RECIPE_LIST } from 'src/redux/types';

export const recipeListReducer = (state: IRecipe[] = [], action: IFetchRecipesAction) => {
    switch (action.type) {
        case FETCH_RECIPE_LIST:
            return !!action.payload ? action.payload : state;
        default:
            return state;
    }
}