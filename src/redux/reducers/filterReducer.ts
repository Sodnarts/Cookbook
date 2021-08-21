import { IFilterValue } from 'src/redux/actions/IActions';
import { FILTER_STRING } from 'src/redux/types';
import { FoodCategory } from 'src/redux/reducers/IState'

export const filterReducer = (state: FoodCategory | "none" = "none", action: IFilterValue) => {
    switch (action.type) {
        case FILTER_STRING:
    return !!action.payload ? action.payload : state;
        default:
            return state;
    }
}