import { Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { CreateInformation } from 'src/components/create/CreateInformation';
import { CreateIngredient, UnitTypes } from 'src/components/create/CreateIngredient';
import '../create/CreateRecipe.styles.css';
import { FoodCategory, IDescription, Ingredient, Instructions, IRecipe, IRootState, ITitle } from 'src/redux/reducers/IState';
import { routes } from 'src/common/routes/routes';
import { Link } from 'react-router-dom';
import * as actions from 'src/redux/actions';
import { connect } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import 'src/common/ActionButton.styles.css';

interface IState {
    dishName: string;
    prepTimeMin: string;
    prepTimeMax: string;
    portions: string;
    foodCategory: string;

    ingredientList: string[][];
    amountOfIngredients: number;

    approachTitleList: string[];
    approachDescriptionList: string[];
    amountOfInputBoxes: string;

    currentRecipe: IRecipe | null;
    id: string;
    showDialog: boolean;
}

interface IProps {
    match: any;
    history: any;
    classes: any;
    currentRecipe: IRecipe | null;
    editRecipe(recipe: IRecipe): void;
    deleteRecipe(_id: string): void;
}

interface IReadRecipeActionProps {
    getCurrentRecipe(id: string): void;
}

type IEditRecipe = IProps & IReadRecipeActionProps;

const styles = (theme: Theme) =>
    createStyles({
        resize: {
            fontSize: 16,
            [theme.breakpoints.down(900)]: {
                fontSize: 14,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 13,
            },
        },
        resizeTitle: {
            fontSize: 20,
            [theme.breakpoints.down(900)]: {
                fontSize: 18,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 16,
            },
        },
        outline: {
            borderWidth: '3px',
            borderColor: '#555',
            borderRadius: '1rem',
            [theme.breakpoints.down(576)]: {
                borderWidth: '2px',
            },
        },
        label: {
            fontSize: 20,
            [theme.breakpoints.down(900)]: {
                fontSize: 18,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 16,
            },
        },
        focusedLabel: {
            fontSize: 12,
        }
    })

class EditRecipeBase extends React.Component<IEditRecipe, IState> {
    constructor(props: IEditRecipe) {
        super(props);

        this.state = {
            dishName: "",
            prepTimeMin: "",
            prepTimeMax: "",
            portions: "",
            foodCategory: "",

            ingredientList: [["", "", ""]],
            amountOfIngredients: 1,

            approachTitleList: [""],
            approachDescriptionList: [],
            amountOfInputBoxes: "td",

            currentRecipe: null,
            id: !!this.props.currentRecipe?._id ? this.props.currentRecipe._id : "",
            showDialog: false,
        }

        this.setDishName = this.setDishName.bind(this);
        this.setPrepTimeMin = this.setPrepTimeMin.bind(this);
        this.setPrepTimeMax = this.setPrepTimeMax.bind(this);
        this.setPortions = this.setPortions.bind(this);
        this.setFoodCategory = this.setFoodCategory.bind(this);
        this.setUnit = this.setUnit.bind(this);
        this.setAmount = this.setAmount.bind(this);
        this.setName = this.setName.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.addTitle = this.addTitle.bind(this);
        this.addDescription = this.addDescription.bind(this);
        this.removeBox = this.removeBox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.openDialog = this.openDialog.bind(this);
    }

    public componentDidMount() {
        this.props.getCurrentRecipe(this.props.match.params.id)
    }

    static getDerivedStateFromProps(props: IEditRecipe, state: IState) {
        if (props.currentRecipe !== state.currentRecipe && !!props.currentRecipe) {
            console.log("EDIT PROPS: ", props.currentRecipe)
            console.log(props.currentRecipe._id)
            const c = props.currentRecipe;

            // Building the correct ingredient list format
            const ing: string[][] = [];
            c.ingredients.map((i: Ingredient) => {
                let tmpIng: string[] = [];
                tmpIng[2] = i.ingredient;
                let tmpUnit = "";
                let tmpAmount = ";";
                if (i.volume.includes("ml")) {
                    tmpUnit = i.volume.substring(i.volume.length - 2, i.volume.length);
                    tmpAmount = i.volume.substring(0, i.volume.length - 2);
                } else if (i.volume.includes("g")) {
                    tmpUnit = i.volume.substring(i.volume.length - 1, i.volume.length);
                    tmpAmount = i.volume.substring(0, i.volume.length - 1);
                } else if (i.volume.includes("pcs")) {
                    tmpUnit = i.volume.substring(i.volume.length - 3, i.volume.length);
                    tmpAmount = i.volume.substring(0, i.volume.length - 3);
                }
                tmpIng[1] = tmpUnit;
                tmpIng[0] = tmpAmount;

                ing.push(tmpIng);
            })

            // Building instruction format 
            const titleList: string[] = [];
            const descriptionList: string[] = [];

            const amountOfBoxArr: string[] = [];
            c.instructions.titles.map((t: ITitle) => {
                titleList[Number(t.key)] = t.value;
                amountOfBoxArr[Number(t.key)] = "t";
            })

            c.instructions.descriptions.map((d: IDescription) => {
                descriptionList[Number(d.key)] = d.value;
                amountOfBoxArr[Number(d.key)] = "d";
            })

            let amountOfBox = ""
            amountOfBoxArr.map((a: string) => {
                amountOfBox += a;
            })

            return {
                dishName: c.name,
                prepTimeMin: c.prepTimeMin,
                prepTimeMax: c.prepTimeMax,
                portions: c.portions,
                foodCategory: c.type,

                ingredientList: ing,
                amountOfIngredients: c.ingredients.length,

                approachTitleList: titleList,
                approachDescriptionList: descriptionList,
                amountOfInputBoxes: amountOfBox,
                currentRecipe: props.currentRecipe,
                _id: props.currentRecipe._id
            }
        }

        return null;
    }

    public setDishName(event: any) {
        this.setState({ dishName: event.target.value }, () => console.log(this.state))
    }

    public setPrepTimeMin(prepTime: string) {
        this.setState({
            prepTimeMin: prepTime,
        }, () => console.log(this.state))
    }

    public setPrepTimeMax(prepTime: string) {
        this.setState({
            prepTimeMax: prepTime,
        }, () => console.log(this.state))
    }

    public setPortions(portions: string) {
        this.setState({
            portions,
        }, () => console.log(this.state))
    }

    public setFoodCategory(foodCategory: FoodCategory) {
        this.setState({
            foodCategory,
        }, () => console.log(this.state))
    }

    public setUnit(unit: UnitTypes, i: number) {
        let tmpIL = this.state.ingredientList;
        tmpIL[i][1] = unit;
        this.setState({
            ingredientList: tmpIL,
        })
    }

    public setAmount(amount: string, i: number) {
        let tmpIL = this.state.ingredientList;
        tmpIL[i][0] = amount;
        this.setState({
            ingredientList: tmpIL,
        })
    }

    public setName(name: string, i: number) {
        let tmpIL = this.state.ingredientList;
        tmpIL[i][2] = name;
        this.setState({
            ingredientList: tmpIL,
        })
    }

    public setTitle(event: any, i: number) {
        let tmpTL = this.state.approachTitleList;
        tmpTL[i] = event.target.value;

        this.setState({
            approachTitleList: tmpTL,
        })
    }

    public setDescription(event: any, i: number) {
        let tmpDL = this.state.approachDescriptionList;
        tmpDL[i] = event.target.value;

        this.setState({
            approachDescriptionList: tmpDL,
        })
    }

    public addIngredient() {
        let tmpIL = [...this.state.ingredientList, ["", "", ""]];

        this.setState({
            ingredientList: tmpIL,
            amountOfIngredients: this.state.amountOfIngredients + 1,
        })
    }

    public removeIngredient() {
        let tmpIL = [...this.state.ingredientList];
        tmpIL.pop();

        this.setState({
            ingredientList: tmpIL,
            amountOfIngredients: this.state.amountOfIngredients - 1,
        })
    }

    public addTitle() {
        let tmp = this.state.amountOfInputBoxes;
        tmp += "t";

        this.setState({
            amountOfInputBoxes: tmp,
        })
    }

    public addDescription() {
        let tmp = this.state.amountOfInputBoxes;
        tmp += "d";

        this.setState({
            amountOfInputBoxes: tmp,
        })
    }

    public removeBox() {
        let tmp = this.state.amountOfInputBoxes.slice(0, -1);

        this.setState({
            amountOfInputBoxes: tmp,
        })
    }

    public handleSubmit() {
        // TODO: When adding Title / Descriptions. Loop over "AmountOfBoxes", filter on "t" and "d", then take out only the first values that correspond to this.

        const ingredientList: Ingredient[] = [];
        this.state.ingredientList.map((i: any) => {
            const ingredient: Ingredient = {
                ingredient: i[2],
                volume: i[0] + i[1],
            }
            ingredientList.push(ingredient)
        });

        const titleList: ITitle[] = [];

        for (const [key, value] of Object.entries(this.state.approachTitleList)) {
            titleList.push({ key, value })
        };

        const descriptionList: IDescription[] = [];

        for (const [key, value] of Object.entries(this.state.approachDescriptionList)) {
            descriptionList.push({ key, value })
        };

        const instructions: Instructions = {
            titles: titleList,
            descriptions: descriptionList,
        }

        const recipe: IRecipe = {
            ingredients: ingredientList,
            instructions: instructions,
            name: this.state.dishName,
            prepTimeMax: this.state.prepTimeMax,
            prepTimeMin: this.state.prepTimeMin,
            portions: this.state.portions,
            type: !!this.state.foodCategory ? this.state.foodCategory as FoodCategory : FoodCategory.Dinner,
            timeCreated: Date.now(),
            _id: this.state.id
        }
        console.log(this.state.id)
        this.props.editRecipe(recipe);
    }

    public handleDelete() {
        this.props.deleteRecipe(this.state.id);
        this.setState({
            showDialog: !this.state.showDialog
        }, () => this.props.history.push("/"));
    }

    public openDialog() {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    public renderIngredientInput() {
        const { amountOfIngredients, ingredientList } = this.state;
        let ingredientInputList: JSX.Element[] = [];

        for (let i = 0; i < amountOfIngredients; i++) {
            ingredientInputList.push(<CreateIngredient key={i} setUnit={this.setUnit} setAmount={this.setAmount} setName={this.setName} defaultUnit={ingredientList[i][1]} defaultName={ingredientList[i][2]} defaultAmount={ingredientList[i][0]} index={i} />)
        }

        return ingredientInputList;
    }

    public renderDialog() {
        const { showDialog } = this.state;
        return (
            <Dialog
                open={showDialog}
                onClose={this.openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you want to delete this recipe?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={this.openDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    public renderTitleInput(key: number) {
        const { classes } = this.props;
        const { approachTitleList } = this.state;

        return <form noValidate autoComplete="off" className="title-input">
            <TextField key={`title-input-${key}`} label="Step" variant="outlined"
                style={{ width: '100%' }}
                defaultValue={approachTitleList[key]}
                onChange={(e) => this.setTitle(e, key)}
                InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                InputProps={{ classes: { input: classes.resizeTitle, notchedOutline: classes.outline } }} />
        </form>
    }

    public renderDescriptionInput(key: number) {
        const { classes } = this.props;

        return <form noValidate autoComplete="off" className="description-input">
            <TextField
                key={`description-input-${key}`}
                label="Approach&nbsp;"
                style={{ width: '100%' }}
                multiline
                rows={6}
                defaultValue={this.state.approachDescriptionList[key]}
                variant="outlined"
                onChange={(e) => this.setDescription(e, key)}
                InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                InputProps={{ classes: { input: classes.resize, notchedOutline: classes.outline, } }} />
        </form>
    }

    public renderInputBoxes() {
        const { amountOfInputBoxes } = this.state;
        let inputBoxList: JSX.Element[] = [];

        for (let i = 0; i < amountOfInputBoxes.length; i++) {
            const char = amountOfInputBoxes.substring(i, i + 1);

            if (char == 't') {
                inputBoxList.push(this.renderTitleInput(i))
            } else if (char == 'd') {
                inputBoxList.push(this.renderDescriptionInput(i))
            }
        }

        return inputBoxList;
    }

    public render() {
        const { amountOfIngredients, amountOfInputBoxes, dishName, prepTimeMin, prepTimeMax, portions, foodCategory } = this.state;
        const { classes } = this.props;
        var w = window.innerWidth;
        let param = '9.6rem';
        let size = '64px';
        if (w <= 576) {
            param = '6.4rem';
            size = '54px';
        }

        return (
            <>
                <div className="container__create">
                    <div className="container__dish--name">
                        <h2 className="heading--create">Name of the dish</h2>
                        <form noValidate autoComplete="off" className="dish-name-input">
                            <TextField key="dish-name-input" label="Name&nbsp;" variant="outlined"
                                style={{ width: '100%' }}
                                onChange={this.setDishName}
                                value={dishName}
                                InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                                InputProps={{ classes: { input: classes.resizeTitle, notchedOutline: classes.outline } }} />
                        </form>
                    </div>
                    <div className="container__dish--information">
                        <h2 className="heading--create">Information</h2>
                        <CreateInformation key={1} setPrepTimeMin={this.setPrepTimeMin} setPrepTimeMax={this.setPrepTimeMax} setPortions={this.setPortions} setCategory={this.setFoodCategory} defaultCategory={foodCategory} defaultMinTime={prepTimeMin} defaultMaxTime={prepTimeMax} defaultPortions={portions} index={1} />
                    </div>
                    <div className="container__create--ingredients">
                        <h2 className="heading--create">Ingredients</h2>
                        <div className="container__create--ingredients--row">
                            {this.renderIngredientInput().map((il: JSX.Element) => {
                                return il;
                            })}
                        </div>
                        <div className="btn-container">
                            {amountOfIngredients > 1 ? <Button variant="contained" style={{ backgroundColor: '#ff475a', marginRight: '2rem' }} className="btn-remove--ingredient" onClick={this.removeIngredient}><RemoveIcon style={{ height: '24px', width: '24px', color: '#eee' }} /></Button> : undefined}
                            <Button variant="contained" style={{ backgroundColor: '#5193fc', marginLeft: '2rem' }} className="btn-add--ingredient" onClick={this.addIngredient}><AddIcon style={{ height: '24px', width: '24px', color: '#ddd' }} /></Button>
                        </div>
                    </div>
                    <div className="container__create--instructions">
                        <h2 className="heading--create">Instructions</h2>
                        <div className="container-input-fields">
                            {this.renderInputBoxes().map((tl: JSX.Element) => {
                                return tl;
                            })}
                        </div>
                        <div className="btn-container">
                            {amountOfInputBoxes.length > 2 ? <Button variant="contained" className="btn-remove--box" onClick={this.removeBox}>Remove&nbsp;<RemoveIcon style={{ height: '24px', width: '24px', color: '#eee' }} /></Button> : undefined}
                            <Button variant="contained" className="btn-add--title" onClick={this.addTitle}>Title&nbsp;<AddIcon style={{ height: '24px', width: '24px', color: '#ddd' }} /></Button>
                            <Button variant="contained" className="btn-add--desc" onClick={this.addDescription}>Description&nbsp;<AddIcon style={{ height: '24px', width: '24px', color: '#ddd' }} /></Button>
                        </div>
                    </div>
                    <div className="btn__submit--container">
                        <Link to={routes.recipes.recipeList} className="btn__submit btn__submit--white" onClick={this.handleSubmit}>Submit</Link>
                    </div>
                </div >
                <Fab onClick={this.openDialog} className="action-button" style={{ backgroundColor: '#ff475a', top: `calc(100vh - ${param}`, left: `calc(100vw - ${param}`, position: 'fixed', height: `${size}`, width: `${size}` }} aria-label="add">
                    <DeleteForeverIcon style={{ color: '#eee' }} className="add-icon" />
                </Fab>
                {this.renderDialog()}
            </>
        )
    }
};

const mapStateToProps = ({ currentRecipe }: IRootState) => {
    return { currentRecipe };
}

const EditRecipe = connect(mapStateToProps, actions)(withStyles(styles)(EditRecipeBase));

export { EditRecipe };
