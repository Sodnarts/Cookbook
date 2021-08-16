import axios from 'axios';
import React from 'react';
import { routes } from 'src/common/routes/routes';
import { IRecipe, IRootState } from 'src/redux/reducers/IState';
import * as actions from 'src/redux/actions';
import "./RecipeList.styles.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import 'src/common/ActionButton.styles.css';

interface IState {
    recipeList: IRecipe[];
}

interface IProps {
    recipeList: IRecipe[];
}

interface IRecipeListActionProps {
    getRecipes(): void;
}

type IRecipeList = IRecipeListActionProps & IProps;

class RecipeListBase extends React.Component<IRecipeList, IState> {
    constructor(props: IRecipeList) {
        super(props);

        this.state = {
            recipeList: this.props.recipeList
        }
    }

    public componentDidMount() {
        this.props.getRecipes();
    }

    static getDerivedStateFromProps(props: IRecipeList, state: IState) {
        if (props.recipeList !== state.recipeList) {
            return { recipeList: props.recipeList }
        }
        else {
        }
        return null;
    }

    public getType(recipe: IRecipe) {
        switch (recipe.type) {
            case "Dinner":
                return 1;
            case "Dessert":
                return 2;
            case "Snack":
                return 3;
            default:
                return 1;
        }
    }

    public renderCard(rl2: IRecipe[], i: number) {
        const rl = rl2.sort((a, b) => (a.timeCreated > b.timeCreated) ? -1 : ((b.timeCreated > a.timeCreated) ? 1 : 0))
        return (
            <div className="row" key={i}>
                {rl.map((r: IRecipe, index: number) => {
                    return (
                        <div className="col-1-of-3" key={index}>
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className={`card__picture card__picture--${this.getType(r)}`}>

                                    </div>
                                    <h4 className="card__heading">
                                        <span className={`card__heading-span card__heading-span--${this.getType(r)}`}>
                                            {r.name}
                                        </span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>{r.prepTimeMin} - {r.prepTimeMax} min</li>
                                            <li>Portions: {r.portions}</li>
                                            <li>{r.type}</li>
                                            <li>Eehh, food?</li>
                                            <li>Difficulty: Easy</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`card__side card__side--back card__side--back-${this.getType(r)}`}>
                                    <div className="card__cta">
                                        <div className="card__price-box">
                                            <p className="card__price-only">Created:</p>
                                            <p className="card__price_value">{`${new Date(r.timeCreated).getDate()}.${new Date(r.timeCreated).getMonth()}.${new Date(r.timeCreated).getFullYear()}`}</p>
                                        </div>
                                        <Link to={`/read/${r._id}`} className="btn btn--white">Go to Recipe</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }


    public render() {
        const { recipeList } = this.state;
        var w = window.innerWidth;
        let param = '9.6rem';
        let size = '64px';
        if (w <= 576) {
            param = '6.4rem';
            size = '54px';
        }

        return (
            <div className="container">
                <div className="container__card">
                    {recipeList.map((r: IRecipe, i: number) => {
                        if (i % 3 == 0) {
                            let tmpRL = [];
                            if (!!recipeList[i]) tmpRL.push(recipeList[i])
                            if (!!recipeList[i + 1]) tmpRL.push(recipeList[i + 1])
                            if (!!recipeList[i + 2]) tmpRL.push(recipeList[i + 2])
                            return this.renderCard(tmpRL, i);
                        }
                    })}
                </div>
                <Link to={routes.recipes.createRecipe} className="action-button-container">
                    <Fab className="action-button" style={{ backgroundColor: '#5193fc', top: `calc(100vh - ${param}`, left: `calc(100vw - ${param}`, position: 'fixed', height: `${size}`, width: `${size}` }} aria-label="add">
                        <AddIcon style={{ color: '#eee' }} className="add-icon" />
                    </Fab>
                </Link>
            </div >
        )
    }
}

const mapStateToProps = ({ recipeList }: IRootState) => {
    return { recipeList };
}
const RecipeList = connect(mapStateToProps, actions)(RecipeListBase);
export { RecipeList };