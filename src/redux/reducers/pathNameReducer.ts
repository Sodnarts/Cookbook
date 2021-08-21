import { IGetCurrentPathName } from 'src/redux/actions/IActions';
import { GET_CURRENT_PATH_NAME } from 'src/redux/types';


export const pathNameReducer = (state: string = "", action: IGetCurrentPathName) => {
    switch (action.type) {
        case GET_CURRENT_PATH_NAME:
            return !!action.payload ? action.payload : state;
        default:
            return state;
    }
}