import { combineReducers, Reducer } from 'redux';
import { IRootAction, IToggleProgressBarAction } from 'src/redux/actions/IActions';
import { currentRecipeReducer } from 'src/redux/reducers/currentRecipeReducer';
import { IRootState } from 'src/redux/reducers/IState';
import { progressBarReducer } from 'src/redux/reducers/progressBarReducer';
import { recipeListReducer } from 'src/redux/reducers/recipeListReucer';

const combinedReducers: Reducer<IRootState, IRootAction> = combineReducers({
    progressBar: progressBarReducer,
    recipeList: recipeListReducer,
    currentRecipe: currentRecipeReducer,
})

export const rootReducer = combinedReducers;