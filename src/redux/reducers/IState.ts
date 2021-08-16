
export type IProgressBarState = number;

export enum FoodCategory {
    Dinner = "Dinner",
    Dessert = "Dessert",
    Snack = "Snack"
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
    prepTimeMax: string;
    prepTimeMin: string;
    portions: string;
    type: FoodCategory;
    timeCreated: number;
    image?: File;
    _id?: string;
}

export interface IRootState {
    progressBar: IProgressBarState;
    recipeList: IRecipe[];
    currentRecipe: IRecipe | null;
}