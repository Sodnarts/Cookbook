import { getLanguageFile } from 'src/common/internationalization/lang';
import { FoodCategory } from 'src/redux/reducers/IState';


export const foodCategoryMappings = (foodCategory: FoodCategory) => {
    const lang = getLanguageFile();

    switch (foodCategory) {
        case FoodCategory.Breakfast:
            return lang.breakfast;
        case FoodCategory.Dessert:
            return lang.dessert;
        case FoodCategory.Dinner:
            return lang.dinner;
        case FoodCategory.Drinks:
            return lang.drinks;
    }
}

export interface IFoodCategory {
    value: string;
    label: string;
}

export const foodCategoryList: IFoodCategory[] = [
    { value: FoodCategory.Breakfast, label: foodCategoryMappings(FoodCategory.Breakfast)},
    { value: FoodCategory.Dessert, label: foodCategoryMappings(FoodCategory.Dessert)},
    { value: FoodCategory.Dinner, label: foodCategoryMappings(FoodCategory.Dinner)},
    { value: FoodCategory.Drinks, label: foodCategoryMappings(FoodCategory.Drinks)},
]
