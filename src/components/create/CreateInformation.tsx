import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import './CreateInformation.styles.css';
import { FoodCategory } from 'src/redux/reducers/IState';

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
            [theme.breakpoints.down(900)]: {
                fontSize: 16,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 14,
            },
        },
        focusedLabel: {
            fontSize: 12,
        },
        cssOutlinedInput: {
            '&$cssFocused $outline': {
                borderWidth: 0,
                borderColor: '#555',
                borderRadius: 0,
                borderBottom: '1px solid #555',
                [theme.breakpoints.down(900)]: {
                    borderWidth: '3px',
                    borderColor: '#555',
                    borderRadius: '1rem',
                },
                [theme.breakpoints.down(576)]: {
                    borderWidth: '2px',
                },
            },
        },
        outline: {
            borderWidth: 0,
            borderColor: '#555',
            borderRadius: 0,
            borderBottom: '1px solid #555',
            [theme.breakpoints.down(900)]: {
                borderWidth: '3px',
                borderColor: '#555',
                borderRadius: '1rem',
            },
            [theme.breakpoints.down(576)]: {
                borderWidth: '2px',
            },
        },
        cssFocused: {
        },
    })


const CreateInformationBase = (props: IProps) => {
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
                <InputLabel id={`select-label-${props.index}`} className="input-label">Category</InputLabel>
                <Select
                    className="selector-info-element"
                    labelId="select-label"
                    id="select"
                    value={category}
                    onChange={handleChangeCategory}
                >
                    <MenuItem value={FoodCategory.Dinner} className="menu-item">Dinner</MenuItem>
                    <MenuItem value={FoodCategory.Dessert} className="menu-item">Dessert</MenuItem>
                    <MenuItem value={FoodCategory.Snack} className="menu-item">Snack</MenuItem>
                </Select>
            </FormControl>
        )
    }

    const renderPrepTimeMinInput = () => {
        const classes = props.classes;
        return (
            <form noValidate autoComplete="off" className="prep-min-input">
                <TextField id={`standard-min-${props.index}`}
                    onChange={handleChangePrepTimeMin}
                    label="Min time&nbsp;" size="medium"
                    style={{ width: '100%' }}
                    InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                    variant="outlined"
                    defaultValue={props.defaultMinTime}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.outline,
                        },
                    }} />
            </form>
        )
    }

    const renderPrepTimeMaxInput = () => {
        const classes = props.classes;
        return (
            <form noValidate autoComplete="off" className="prep-max-input">
                <TextField id={`standard-max-${props.index}`}
                    onChange={handleChangePrepTimeMax}
                    label="Max time&nbsp;" className="name-field"
                    style={{ width: '100%' }}
                    InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                    defaultValue={props.defaultMaxTime}
                    variant="outlined"
                    InputProps={{
                        classes: {
                            input: classes.resize,
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.outline,
                        },
                    }} />
            </form>
        )
    }

    const renderPortionsInput = () => {
        const classes = props.classes;
        return (
            <form noValidate autoComplete="off" className="portions-input">
                <TextField id={`standard-portions-${props.index}`}
                    onChange={handleChangePortions}
                    label="Portions&nbsp;" className="name-field"
                    style={{ width: '100%' }}
                    defaultValue={props.defaultPortions}
                    InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                    variant="outlined"
                    InputProps={{
                        classes: {
                            input: classes.resize,
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.outline,
                        },
                    }} />
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

const CreateInformation = (withStyles(styles)(CreateInformationBase));
export { CreateInformation };