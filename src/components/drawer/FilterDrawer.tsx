import { createStyles, Theme, FormControl, InputLabel, MenuItem, Select, TextField, withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { getLanguageFile } from 'src/common/internationalization/lang';
import { foodCategoryList, IFoodCategory } from 'src/common/utils/FoodCategoryConfig';
import { ISubCategory, subCategoryList } from 'src/common/utils/SubCategoryConfig';
import { FoodCategory } from 'src/redux/reducers/IState';
import './Drawer.styles.css';

interface IProps {
    isOpen: boolean;
    searchValue: string;
    filterValue: FoodCategory | "none";
    filterSubCategoryValue: FoodCategory | "none";
    classes: any;
    handleCloseDrawer(reason: string): void;
    setFilterValue(filterValue: FoodCategory | "none"): void;
    setFilterSubCategory(filterValue: FoodCategory | "none"): void;
    setSearchValue(searchValue: string): void;
}

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
        label: {
            fontSize: 18,
            paddingRight: '4px',
            [theme.breakpoints.down(900)]: {
                fontSize: 16,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 14,
            },
        },
        focusedLabel: {
            fontSize: 18,
            [theme.breakpoints.down(900)]: {
                fontSize: 16,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 14,
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
    })

const FilterDrawerBase = (props: IProps) => {
    const lang = getLanguageFile();
    const classes = props.classes;

    const handleChangeCategory = (event: any) => {
        props.setFilterValue(event.target.value) 
    }

    const handleChangeSubCategory = (event: any) => {
        props.setFilterSubCategory(event.target.value) 
    }

    return (
        <Drawer style={{zIndex: 1050, width: '300px'}} anchor={'left'} open={props.isOpen} onClose={(e: object, reason: "backdropClick" | "escapeKeyDown") => props.handleCloseDrawer(reason)}>
            <div className="drawer-container">
                <h2 className="filter-title">{lang.search}</h2>
                <form noValidate autoComplete="off" className="search-input">
                    <TextField id={`standard-max`}
                        onChange={(event: any) => props.setSearchValue(event.target.value)}
                        label={lang.dishName} className="search-field"
                        style={{ width: '100%' }}
                        defaultValue={props.searchValue}
                        InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel }}}
                        variant="standard"
                        InputProps={{ classes: { input: classes.resize }}} />
                </form>
                <h2 className="filter-title">{lang.filter}</h2>
                <FormControl className="drawer-selector-input">
                    <InputLabel id="select-label" className="input-label">{lang.mainCategory}</InputLabel>
                    <Select
                        className="drawer-selector-info"
                        labelId="select-label"
                        id="select"
                        value={props.filterValue}
                        onChange={handleChangeCategory}
                    >
                        <MenuItem value={"none"} className="menu-item">{lang.noFilter}</MenuItem>
                        {foodCategoryList.map((fc: IFoodCategory) => {
                            return <MenuItem key={`menu-item-${fc.value}`} value={fc.value} className="menu-item">{fc.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className="drawer-selector-input">
                    <InputLabel id="select-label" className="input-label">{lang.subCategories}</InputLabel>
                    <Select
                        className="drawer-selector-info"
                        labelId="select-label"
                        id="select"
                        value={props.filterSubCategoryValue}
                        onChange={handleChangeSubCategory}
                    >
                        <MenuItem value={"none"} className="menu-item">{lang.noFilter}</MenuItem>
                        {subCategoryList.map((sc: ISubCategory) => {
                            return <MenuItem key={`menu-item-${sc.value}`} value={sc.value} className="menu-item">{sc.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        </Drawer>
    )
}


const FilterDrawer = (withStyles(styles)(FilterDrawerBase));
export { FilterDrawer };