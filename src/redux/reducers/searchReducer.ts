import { ISearchValue } from 'src/redux/actions/IActions';
import { SEARCH_VALUE } from 'src/redux/types';

export const searchReducer = (state: string = "", action: ISearchValue) => {
    switch (action.type) {
        case SEARCH_VALUE:
    return !!action.payload ? action.payload : state;
        default:
            return state;
    }
}