import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'src/components/information/InformationInput.styles.css';
import { FoodCategory } from 'src/redux/reducers/IState';
import { getLanguageFile } from 'src/common/internationalization/lang';
import { foodCategoryList, IFoodCategory } from 'src/common/utils/FoodCategoryConfig';

interface IProps {
    setCategory(category: FoodCategory): void;
    setPrepTimeMin(num: string): void;
    setPrepTimeMax(num: string): void;
    setPortions(num: string): void;
    index: number;
    classes: any;
    defaultMinTime?: string;
    defaultMaxTime?: string;
    defaultPortions?: string;
    defaultCategory?: string;
}

export enum TextFieldTypes{
    Standard = "standard",
    Outlined = "outlined"
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
            backgroundColor: '#e4e2e1',
            fontSize: 18,
            paddingRight: '4px',
            [theme.breakpoints.down(900)]: {
                fontSize: 16,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 14,
            },
            [theme.breakpoints.down(480)]: {
                backgroundColor: '#d0cece',
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


const InformationInputBase = (props: IProps) => {
    const lang = getLanguageFile();

    const [category, updateCategory] = React.useState(!!props.defaultCategory ? props.defaultCategory : "");

    const handleChangeCategory = (event: any) => {
        updateCategory(event.target.value);
        props.setCategory(event.target.value);
    }

    const handleChangePrepTimeMin = (event: any) => {
        props.setPrepTimeMin(event.target.value);
    }

    const handleChangePrepTimeMax = (event: any) => {
        props.setPrepTimeMax(event.target.value)
    }

    const handleChangePortions = (event: any) => {
        props.setPortions(event.target.value)
    }

    const renderSelector = () => {
        return (
            <FormControl className="selector-info-input">
                <InputLabel id={`select-label-${props.index}`} className="input-label">{lang.mainCategory}</InputLabel>
                <Select
                    className="selector-info-element"
                    labelId="select-label"
                    id="select"
                    value={category}
                    onChange={handleChangeCategory}
                >
                    {foodCategoryList.map((fc: IFoodCategory) => {
                            return <MenuItem key={`menu-item-${fc.value}`} value={fc.value} className="menu-item">{fc.label}</MenuItem>
                    })}
                </Select>
            </FormControl>
        )
    }

    const renderPrepTimeMinInput = () => {
        const classes = props.classes;
        var w = window.innerWidth;
        const type: TextFieldTypes = !!(w <= 900) ? TextFieldTypes.Outlined : TextFieldTypes.Standard
        const inputProps = !!(w <= 900) ? { classes: { input: classes.resize, notchedOutline: classes.outline}} : { classes:{input: classes.resize}}
        const labelProps = !!(w <= 900) ? { classes: { root: classes.label, focused: classes.focusedLabel } } : { classes:{root: classes.label, focused: classes.focusedLabel}}
        
        return (
            <form noValidate autoComplete="off" className="prep-min-input">
                <TextField id={`standard-min-${props.index}`}
                    onChange={handleChangePrepTimeMin}
                    label={lang.minTime} size="medium"
                    style={{ width: '100%' }}
                    InputLabelProps={labelProps}
                    variant={type}
                    defaultValue={props.defaultMinTime}
                    InputProps={inputProps} />
            </form>
        )
    }

    const renderPrepTimeMaxInput = () => {
        const classes = props.classes;
        var w = window.innerWidth;
        const type: TextFieldTypes = !!(w <= 900) ? TextFieldTypes.Outlined : TextFieldTypes.Standard
        const inputProps = !!(w <= 900) ? { classes: { input: classes.resize, notchedOutline: classes.outline}} : { classes:{input: classes.resize}}
        const labelProps = !!(w <= 900) ? { classes: { root: classes.label, focused: classes.focusedLabel } } : { classes:{root: classes.label, focused: classes.focusedLabel}}
        
        return (
            <form noValidate autoComplete="off" className="prep-max-input">
                <TextField id={`standard-max-${props.index}`}
                    onChange={handleChangePrepTimeMax}
                    label={lang.maxTime} className="name-field"
                    style={{ width: '100%' }}
                    defaultValue={props.defaultMaxTime}
                    InputLabelProps={labelProps}
                    variant={type}
                    InputProps={inputProps} />
            </form>
        )
    }

    const renderPortionsInput = () => {
        const classes = props.classes;
        var w = window.innerWidth;
        const type: TextFieldTypes = !!(w <= 900) ? TextFieldTypes.Outlined : TextFieldTypes.Standard
        const inputProps = !!(w <= 900) ? { classes: { input: classes.resize, notchedOutline: classes.outline}} : { classes:{input: classes.resize}}
        const labelProps = !!(w <= 900) ? { classes: { root: classes.label, focused: classes.focusedLabel } } : { classes:{root: classes.label, focused: classes.focusedLabel}}
        
        return (
            <form noValidate autoComplete="off" className="portions-input">
                <TextField id={`standard-portions-${props.index}`}
                    onChange={handleChangePortions}
                    label={lang.portions} className="name-field"
                    style={{ width: '100%' }}
                    defaultValue={props.defaultPortions}
                    InputLabelProps={labelProps}
                    variant={type}
                    InputProps={inputProps} />
            </form>
        )
    }
    return (
        <div className="information_input_container">
            {renderPrepTimeMinInput()}
            {renderPrepTimeMaxInput()}
            {renderPortionsInput()}
            {renderSelector()}
        </div>
    )
}

const InformationInput = (withStyles(styles)(InformationInputBase));
export { InformationInput };