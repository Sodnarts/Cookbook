import { en } from 'src/common/internationalization/en';
import { no } from 'src/common/internationalization/no';
import { store } from 'src/redux/store';

export const getLanguageFile: any = () => {
    const state = store.getState();
    // if (!!state.account.language) {
    //     switch (state.account.language) {
    //         case 'en':
    //             return en;
    //         case 'no':
    //             return no;
    //     }
    // }

    // If no file was found, return english.
    return no;
};

export const lang = getLanguageFile();
