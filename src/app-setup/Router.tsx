import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { routes } from 'src/common/routes/routes';
import { CreateRecipe } from 'src/pages/recipe-create/CreateRecipe';
import { EditRecipe } from 'src/pages/recipe-edit/EditRecipe';
import { ReadRecipe } from 'src/pages/recipe-read/ReadRecipe';
import { RecipeList } from 'src/pages/recipe-list/RecipeList';


/**
 * // TODO: REDIRECT to "/" if page is not found, instead of using PAGE NOT FOUND component!
 * @component RouterComponent
 * @extends {<IRouter, IState>}
 */
const RouterComponentBase = (props: any) => {
    const renderContent = () => {
        return (
            <Switch>
                <Route exact path={routes.recipes.recipeList} component={RecipeList} />
                <Route path={routes.recipes.createRecipe} component={CreateRecipe} />
                <Route path={routes.recipes.readRecipe} component={ReadRecipe} />
                <Route path={routes.recipes.editRecipe} component={EditRecipe} />
                <Redirect to={routes.recipes.recipeList} />
            </Switch>
        );
    };

    return <div>{renderContent()}</div>;
};

const RouterComponent = withRouter<any, typeof RouterComponentBase>(RouterComponentBase);

export { RouterComponent };
