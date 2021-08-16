import { IToggleProgressBarAction } from 'src/redux/actions/IActions';
import { TOGGLE_PROGRESS_BAR } from 'src/redux/types';
import { IProgressBarState } from 'src/redux/reducers/IState';

export const progressBarReducer = (state: IProgressBarState = 0, action: IToggleProgressBarAction) => {
    switch (action.type) {
        case TOGGLE_PROGRESS_BAR:
            return state + (!!action.payload ? 1 : -1);
        default:
            return state;
    }
};