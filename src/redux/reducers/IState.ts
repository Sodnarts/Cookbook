import { ISubCategory } from 'src/common/utils/SubCategoryConfig';

export type IProgressBarState = number;

export enum FoodCategory {
    Breakfast = "Breakfast",
    Dessert = "Dessert",
    Dinner = "Dinner",
    Drinks = "Drinks",
}

export enum UnitTypes {
    Millilitres = "ml",
    Desilitres = "dl",
    Litres = "l",
    Grams = "g",
    Kilograms = "kg",
    Pieces = "stk",
    Tablespoon = "ss",
    Teaspoon = "ts"
}

export enum SubCategory {
    Christmas = "Christmas",
    Easter = "Easter",
    Summer = "Summer",
    Icecream = "Icecream",
    Cake = "Cake",
    Vegan = "Vegan",
    Smoothie = "Smoothie",
    Milkshake = "Milkshake",
    Cookies = "Cookies",
    Cocktail = "Cocktail",
    Mexican = "Mexican",
    Italian = "Italian",
    Burger = "Burger",
    Pizza = "Pizza",
    Pasta = "Pasta",
    Sauce = "Sauce",
}

export interface Ingredient {
    ingredient: string;
    volume: string;
}

export interface ITitle {
    key: string;
    value: string;
}

export interface IDescription {
    key: string;
    value: string;
}

export interface Instructions {
    titles: ITitle[];
    descriptions: IDescription[];
}

export interface IRecipe {
    ingredients: Ingredient[];
    instructions: Instructions;
    name: string;
    portions: string;
    prepTimeMax: string;
    prepTimeMin: string;
    subCategories: ISubCategory[];
    timeCreated: number;
    type: FoodCategory;
    image?: File;
    _id?: string;
}

export interface IRootState {
    progressBar: IProgressBarState;
    recipeList: IRecipe[];
    currentRecipe: IRecipe | null;
    pathName: string;
    filterValue: FoodCategory | "none";
    filterSubCategoryValue: FoodCategory | "none";
    searchValue: string;
}