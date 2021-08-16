import { IFetchCurrentRecipeAction, IFetchRecipesAction } from 'src/redux/actions/IActions';
import { FoodCategory, IRecipe } from 'src/redux/reducers/IState';
import { FETCH_CURRENT_RECIPE, FETCH_RECIPE_LIST } from 'src/redux/types';


export const currentRecipeReducer = (state: IRecipe | null = null, action: IFetchCurrentRecipeAction) => {
    switch (action.type) {
        case FETCH_CURRENT_RECIPE:
            return !!action.payload ? action.payload : state;
        default:
            return state;
    }
}