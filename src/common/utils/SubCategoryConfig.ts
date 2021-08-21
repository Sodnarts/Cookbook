import { getLanguageFile } from 'src/common/internationalization/lang';
import { SubCategory } from 'src/redux/reducers/IState';

const lang = getLanguageFile();
export interface ISubCategory {
    value: string;
    label: string
}

export const subCategoryList: ISubCategory[] = [
    {value: SubCategory.Burger, label: lang.burger},
    {value: SubCategory.Cake, label: lang.cake},
    {value: SubCategory.Christmas, label: lang.christmas},
    {value: SubCategory.Cocktail, label: lang.cocktail},
    {value: SubCategory.Cookies, label: lang.cookies},
    {value: SubCategory.Easter, label: lang.easter},
    {value: SubCategory.Icecream, label: lang.icecream},
    {value: SubCategory.Italian, label: lang.italian},
    {value: SubCategory.Mexican, label: lang.mexican},
    {value: SubCategory.Milkshake, label: lang.milkshake},
    {value: SubCategory.Pasta, label: lang.pasta},
    {value: SubCategory.Pizza, label: lang.pizza},
    {value: SubCategory.Sauce, label: lang.sauce},
    {value: SubCategory.Smoothie, label: lang.smoothie},
    {value: SubCategory.Summer, label: lang.summer},
    {value: SubCategory.Vegan, label: lang.vegan},
]