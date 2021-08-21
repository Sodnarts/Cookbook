import React from 'react';
import { routes } from 'src/common/routes/routes';
import { FoodCategory, IRecipe, IRootState } from 'src/redux/reducers/IState';
import * as actions from 'src/redux/actions';
import "./RecipeList.styles.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import 'src/components/action-button/ActionButton.styles.css';
import { getLanguageFile } from 'src/common/internationalization/lang';
import { ISubCategory } from 'src/common/utils/SubCategoryConfig';

interface IState {
    recipeList: IRecipe[];
    filteredList: IRecipe[];
    filterValue: FoodCategory | "none" | "initial";
    filterSubCategoryValue: FoodCategory | "none" | "initial";
    searchValue: string;
}

interface IProps {
    recipeList: IRecipe[];
    match: any;
    filterValue: FoodCategory | "none";
    filterSubCategoryValue: FoodCategory | "none";
    searchValue: string;
}

interface IRecipeListActionProps {
    getRecipes(): void;
    getCurrentPathName(pathName: string): void;
}

type IRecipeList = IRecipeListActionProps & IProps;

class RecipeListBase extends React.Component<IRecipeList, IState> {
    private lang = getLanguageFile();

    constructor(props: IRecipeList) {
        super(props);

        this.state = {
            recipeList: this.props.recipeList,
            filteredList: this.props.recipeList,
            filterValue: "initial",
            filterSubCategoryValue: "initial",
            searchValue: ""
        }
    }

    public componentDidMount() {
        this.props.getRecipes();
        this.props.getCurrentPathName(this.props.match.path)
    }

    static getDerivedStateFromProps(props: IRecipeList, state: IState) {
        let filteredList: IRecipe[] = [];
        let filteredSubCategoryList: IRecipe[] = [];
        let searchedList: IRecipe[] = [];

        if (props.filterValue === "none") {
            filteredList = [...props.recipeList];
        } else {
            props.recipeList.forEach((r: IRecipe) => {
                if (r.type === props.filterValue) filteredList.push(r);
            })
        }
        // Filter the filtered list 
        if (props.filterSubCategoryValue === "none") {
            filteredSubCategoryList = [...filteredList];
        } else {
            filteredList.forEach((r: IRecipe) => {
                r.subCategories.forEach((sc: ISubCategory) => {
                    if (sc.value === props.filterSubCategoryValue) filteredSubCategoryList.push(r);
                })
            })
        }

        // Searched List
        if (props.searchValue === "") {
            searchedList = [...filteredSubCategoryList];
        } else {
            filteredSubCategoryList.forEach((r: IRecipe) => {
            if(r.name.toLowerCase().includes(props.searchValue.toLowerCase())) {
                    searchedList.push(r);
                }
            })
        }

        return { 
            recipeList: props.recipeList,
            filteredList:searchedList,
            filterValue: props.filterValue,
            filterSubCategoryValue: props.filterSubCategoryValue,
            searchValue: props.searchValue,
        }
    }

    public getType(recipe: IRecipe) {
        switch (recipe.type) {
            case "Dinner":
                return 1;
            case "Dessert":
                return 2;
            case "Drinks":
                return 3;
            case "Breakfast":
                return 4;
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
                                            <li>{this.lang.portions}: {r.portions}</li>
                                            <li>{r.type}</li>
                                            <li>{this.lang.missingText}</li>
                                            <li>{this.lang.missingText}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`card__side card__side--back card__side--back-${this.getType(r)}`}>
                                    <div className="card__cta">
                                        <div className="card__price-box">
                                            <p className="card__price-only">{this.lang.created}:</p>
                                            <p className="card__price_value">{`${new Date(r.timeCreated).getDate()}.${new Date(r.timeCreated).getMonth()}.${new Date(r.timeCreated).getFullYear()}`}</p>
                                        </div>
                                        <Link to={`/read/${r._id}`} className="btn btn--white">{this.lang.goToRecipe}</Link>
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
        const { filteredList } = this.state;
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
                    {filteredList.map((r: IRecipe, i: number) => {
                        if (i % 3 === 0) {
                            let tmpRL = [];
                            if (!!filteredList[i]) tmpRL.push(filteredList[i])
                            if (!!filteredList[i + 1]) tmpRL.push(filteredList[i + 1])
                            if (!!filteredList[i + 2]) tmpRL.push(filteredList[i + 2])
                            return this.renderCard(tmpRL, i);
                        }
                        return undefined;
                    })}
                </div>
                <Link to={routes.recipes.createRecipe} className="action-button-container">
                    <Fab className="action-button-add" style={{ backgroundColor: '#5193fc', top: `calc(100vh - ${param}`, left: `calc(100vw - ${param}`, position: 'fixed', height: `${size}`, width: `${size}` }} aria-label="add">
                        <div style={{ color: '#eee', fontSize: '38px' }} className="add-icon-add" />
                    </Fab>
                </Link>
            </div >
        )
    }
}

const mapStateToProps = ({ recipeList, filterValue, filterSubCategoryValue, searchValue }: IRootState) => {
    return { recipeList, filterValue, filterSubCategoryValue, searchValue };
}
const RecipeList = connect(mapStateToProps, actions)(RecipeListBase);
export { RecipeList };