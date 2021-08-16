import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { routes } from 'src/common/routes/routes';
import { CreateRecipe } from 'src/components/create/CreateRecipe';
import { EditRecipe } from 'src/components/edit/EditRecipe';
import { ReadRecipe } from 'src/components/read/ReadRecipe';
import { RecipeList } from 'src/components/recipe-list/RecipeList';


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
