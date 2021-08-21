import { AppBar, Button, createStyles, Theme, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';
import { getLanguageFile } from 'src/common/internationalization/lang';
import './Header.styles.css';
import { Link } from 'react-router-dom';
import { routes } from 'src/common/routes/routes';
import { FilterDrawer } from 'src/components/drawer/FilterDrawer';
import { FoodCategory, IRootState } from 'src/redux/reducers/IState';
import { connect } from 'react-redux';
import * as actions from 'src/redux/actions';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IState {
    isOpen: boolean;
    pathName: string;
    showDialog: boolean;
}

interface IProps {
    pathName: string;
    classes: any;
    searchValue: string;
    filterValue: FoodCategory | "none";
    filterSubCategoryValue: FoodCategory | "none"; 
    filterList(filterValue: FoodCategory | "none"): void;
    filterSubCategory(filterValue: FoodCategory | "none"): void;
    searchList(searchValue: string): void;
    deleteRecipe(_id: string): void;
}

class HeaderBase extends React.Component<IProps, IState> {
    private lang = getLanguageFile();
    constructor(props: IProps) {
        super(props);

        this.state = {
            isOpen: false,
            pathName: window.location.pathname,
            showDialog: false,
        }

        this.openDialog = this.openDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    public handleDrawer = (): void => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    public handleCloseDrawer = (reason: string): void => {
        (document.getElementById('drawer-toggle') as HTMLInputElement).checked = false;
        this.setState({ isOpen: false });
    }   

    public handleSetFilterValue = (filterValue: FoodCategory | "none") => {
        this.props.filterList(filterValue);
    }

    public handleSetFilterSubCategory = (filterValue: FoodCategory | "none") => {
        this.props.filterSubCategory(filterValue);

    }

    public handleSetSearchValue = (searchValue: string) => {
        this.props.searchList(searchValue);   
    }

    public handleDelete() {
        this.props.deleteRecipe(window.location.pathname.substring(6, window.location.pathname.length));
        this.setState({
            showDialog: !this.state.showDialog
        });
    }

    public openDialog() {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    public renderDrawerButton() {
        return (
            <>
                <input type="checkbox" className="checkbox-invis" id="drawer-toggle"/>
                <label htmlFor="drawer-toggle" className="drawer-btn" onClick={this.handleDrawer}><span className="menu-icon">&nbsp;</span></label>
                <FilterDrawer isOpen={this.state.isOpen} searchValue={this.props.searchValue} filterValue={this.props.filterValue} filterSubCategoryValue={this.props.filterSubCategoryValue} setFilterValue={this.handleSetFilterValue} setFilterSubCategory={this.handleSetFilterSubCategory} setSearchValue={this.handleSetSearchValue} handleCloseDrawer={this.handleCloseDrawer}/>
            </>
        )
    }

    public renderCreateButton = () => {
        return (
            <Link to={routes.recipes.createRecipe} className="container__delete">
                <AddIcon style={{ color: '#555' }} fontSize="large" className="add-icon" />
            </Link>
        )
    }   

    public renderEditButton = () => {
        const id = window.location.pathname.substring(6, window.location.pathname.length)
        return (
            <Link to={`${routes.recipes.editRecipe}/${id}`} className="container__delete">
                <EditIcon style={{ color: '#555' }} fontSize="large" className="add-icon" />
            </Link>
        )
    }   

    public renderDeleteButton = () => {
        return (
            <div className="container__delete" onClick={this.openDialog}>
                <DeleteForeverIcon style={{ color: '#555' }} fontSize="large" className="add-icon" />
            </div>
        )
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
                <DialogTitle id="alert-dialog-title">{this.lang.confirmDelete}</DialogTitle>
                <DialogActions>
                    <div onClick={this.openDialog} color="primary" className="delete__link">
                        {this.lang.cancel}
                    </div>
                    <Link to={"/"} onClick={this.handleDelete} color="primary" className="delete__link">
                        {this.lang.delete}
                    </Link>
                </DialogActions>
            </Dialog>
        )
    }

    public render() {
        const { classes } = this.props;

        return (
            <>
            {!!(window.location.pathname === "/") ? this.renderDrawerButton() : undefined}
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar style={{ overflow: 'hidden' }}>
                    
                    <Link to={routes.recipes.recipeList} className="heading-secondary">
                        {this.lang.cookbook}
                    </Link>
                    <img className={classes.backgroundImg} src="./assets/header.jpg"  alt="Header background"/>
                    {!!(window.location.pathname === "/") ? this.renderCreateButton() : undefined}
                    {!!(window.location.pathname.includes("/read/")) ? this.renderEditButton() : undefined}
                    {!!(window.location.pathname.includes("/edit/")) ? this.renderDeleteButton() : undefined}
                </Toolbar>
            </AppBar>
            {this.renderDialog()}
            </>
        );
    }
}

const styles = (theme: Theme) =>
    createStyles({
        appbar: {
            backgroundColor: '#cccccc',
            maxHeight: '64px',
            minHeight: '64px',
            position: 'fixed'
        },
        backgroundImg: {
            width: '100vw',
            position: 'absolute',
            left: 0,
            zIndex: -1,
            opacity: 0.25,
            overflow: 'hidden'
        },
    });


const mapStateToProps = ({ pathName, searchValue, filterValue, filterSubCategoryValue }: IRootState) => {
    return { pathName, searchValue, filterValue, filterSubCategoryValue };
}
const Header = connect(mapStateToProps, actions)(withStyles(styles)(HeaderBase));
    
export { Header };