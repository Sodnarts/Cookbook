import React from 'react';
import { connect } from 'react-redux';
import { Ingredient, IRecipe, IRootState, ITitle, IDescription } from 'src/redux/reducers/IState';
import * as actions from 'src/redux/actions';
import './ReadRecipe.styles.css';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { routes } from 'src/common/routes/routes';
import 'src/components/action-button/ActionButton.styles.css';
import { getLanguageFile } from 'src/common/internationalization/lang';

interface IState {
    currentRecipe: IRecipe | null;
}

interface IProps {
    currentRecipe: IRecipe | null;
    match: any;
}

interface IReadRecipeActionProps {
    getCurrentRecipe(id: string): void;
    getCurrentPathName(pathName: string): void;
}

type IReadRecipe = IReadRecipeActionProps & IProps;



class ReadRecipeBase extends React.Component<IReadRecipe, IState> {
    private lang = getLanguageFile();

    constructor(props: IReadRecipe) {
        super(props);

        this.state = {
            currentRecipe: null
        }
    }

    public componentDidMount() {
        this.props.getCurrentRecipe(this.props.match.params.id)
        this.props.getCurrentPathName(this.props.match.path)
    }

    static getDerivedStateFromProps(props: IReadRecipe, state: IState) {
        if (props.currentRecipe !== state.currentRecipe) {
            return { currentRecipe: props.currentRecipe }
        }

        return null;
    }

    public renderInstructions() {
        if (!!this.state.currentRecipe && !!this.state.currentRecipe !== undefined) {
            const instructions: JSX.Element[] = [];

            this.state.currentRecipe.instructions.titles.forEach((t: ITitle, i: number) => {
                instructions[Number(t.key)] = <h1 key={`title-${i}`} className="instruction__title">{t.value}</h1>
            })

            this.state.currentRecipe.instructions.descriptions.forEach((d: IDescription, i: number) => {
                instructions[Number(d.key)] = <p key={`description-${i}`} className="instruction__description">{d.value}</p>
            })

            return instructions;
        }
        else return undefined;
    }

    public render() {
        const { currentRecipe } = this.state;
        var w = window.innerWidth;
        let param = '9.6rem';
        let size = '64px';
        if (w <= 576) {
            param = '6.4rem';
            size = '54px';
        }

        return (
            <div>
                <div className="container__read">
                    <div className="container__read--ingredients">
                        <h2 className="heading--read">{this.lang.ingredients}</h2>
                        <div className="container__read--ingredients--ingredients">{!!currentRecipe ? currentRecipe.ingredients.map((i: Ingredient, index: number) => {
                            return (<p key={index} className="p--ingredient"><span className="read--ingredient-col-1">{i.volume}</span>	&nbsp;<span className="read--ingredient-col-2">{i.ingredient}</span></p>)
                        }) : undefined}
                        </div>
                    </div>
                    <div className="container__instructions">
                        <h2 className="heading--read">{this.lang.instructions}</h2>
                        {this.renderInstructions()}
                    </div>
                    <div className="divider__read"></div>
                </div>
                <Link to={`${routes.recipes.editRecipe}/${this.props.match.params.id}`} className="action-button-container">
                    <Fab className="action-button" style={{ backgroundColor: '#ff9645', top: `calc(100vh - ${param}`, left: `calc(100vw - ${param}`, position: 'fixed', height: `${size}`, width: `${size}` }} aria-label="add">
                        <EditIcon style={{ color: '#eee' }} className="add-icon" />
                    </Fab>
                </Link>
            </div >
        )
    }
};

const mapStateToProps = ({ currentRecipe }: IRootState) => {
    return { currentRecipe };
}
const ReadRecipe = connect(mapStateToProps, actions)(ReadRecipeBase);

export { ReadRecipe };
