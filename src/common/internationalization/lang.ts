import { en } from 'src/common/internationalization/en';
//import { no } from 'src/common/internationalization/no';

export const getLanguageFile: any = () => {
    // if (!!state.account.language) {
    //     switch (state.account.language) {
    //         case 'en':
    //             return en;
    //         case 'no':
    //             return no;
    //     }
    // }

    // If no file was found, return english.
    return en;
};

export const lang = getLanguageFile();
