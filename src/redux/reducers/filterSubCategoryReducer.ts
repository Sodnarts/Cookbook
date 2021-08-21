import { IFilterSubCategoryValue } from 'src/redux/actions/IActions';
import { FILTER_SUB_CATEGORY } from 'src/redux/types';
import { FoodCategory } from 'src/redux/reducers/IState'

export const filterSubCategoryReducer = (state: FoodCategory | "none" = "none", action: IFilterSubCategoryValue) => {
    switch (action.type) {
        case FILTER_SUB_CATEGORY:
    return !!action.payload ? action.payload : state;
        default:
            return state;
    }
}