import { combineReducers, Reducer } from 'redux';
import { IRootAction } from 'src/redux/actions/IActions';
import { currentRecipeReducer } from 'src/redux/reducers/currentRecipeReducer';
import { IRootState } from 'src/redux/reducers/IState';
import { progressBarReducer } from 'src/redux/reducers/progressBarReducer';
import { recipeListReducer } from 'src/redux/reducers/recipeListReucer';
import { pathNameReducer } from 'src/redux/reducers/pathNameReducer';
import { filterReducer } from 'src/redux/reducers/filterReducer';
import { filterSubCategoryReducer } from 'src/redux/reducers/filterSubCategoryReducer';
import { searchReducer } from 'src/redux/reducers/searchReducer';

const combinedReducers: Reducer<IRootState, IRootAction> = combineReducers({
    progressBar: progressBarReducer,
    recipeList: recipeListReducer,
    currentRecipe: currentRecipeReducer,
    pathName: pathNameReducer,
    filterValue: filterReducer,
    filterSubCategoryValue: filterSubCategoryReducer,
    searchValue: searchReducer,
})

export const rootReducer = combinedReducers;