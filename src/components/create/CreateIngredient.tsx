import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import './CreateIngredient.styles.css';

interface IProps {
    setUnit(unit: UnitTypes, i: number): void;
    setAmount(amount: string, i: number): void;
    setName(amount: string, i: number): void;
    index: number;
    classes: any;
    defaultName?: string;
    defaultAmount?: string;
    defaultUnit?: string;
}

export enum UnitTypes {
    Millilitres = "ml",
    Grams = "g",
    Pieces = "pcs"
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
        }
    })


const CreateIngredientBase = (props: IProps) => {
    const [unit, updateUnit] = React.useState(!!props.defaultUnit ? props.defaultUnit : "");

    const handleChangeUnit = (event: any) => {
        updateUnit(event.target.value);
        props.setUnit(event.target.value, props.index);
    }

    const handleChangeAmount = (event: any) => {
        props.setAmount(event.target.value, props.index);
    }

    const handleChangeName = (event: any) => {
        props.setName(event.target.value, props.index)
    }

    const renderSelector = () => {
        return (
            <FormControl className="selector-input">
                <InputLabel id={`demo-simple-select-label-${props.index}`} className="input-label">Unit</InputLabel>
                <Select
                    className="selector-element"

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={unit}
                    onChange={handleChangeUnit}
                >
                    <MenuItem value={UnitTypes.Millilitres} className="menu-item">Millilitres</MenuItem>
                    <MenuItem value={UnitTypes.Grams} className="menu-item">Grams</MenuItem>
                    <MenuItem value={UnitTypes.Pieces} className="menu-item">Pieces</MenuItem>
                </Select>
            </FormControl>
        )
    }

    const renderAmountInput = () => {
        const classes = props.classes;
        return (
            <form noValidate autoComplete="off" className="amount-input">
                <TextField id={`standard-amount-${props.index}`}
                    onChange={handleChangeAmount}
                    label="Amount" size="medium"
                    InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                    defaultValue={props.defaultAmount}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }} />
            </form>
        )
    }

    const renderIngredientName = () => {
        const classes = props.classes;
        return (
            <form noValidate autoComplete="off" className="name-input">
                <TextField id={`standard-name-${props.index}`}
                    onChange={handleChangeName}
                    label="Ingredient" className="name-field"
                    InputLabelProps={{ classes: { root: classes.label, focused: classes.focusedLabel } }}
                    defaultValue={props.defaultName}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }} />
            </form>
        )
    }
    return (
        <div className="ingredient_input_container">
            {renderAmountInput()}
            {renderSelector()}
            {renderIngredientName()}
        </div>
    )
}

const CreateIngredient = (withStyles(styles)(CreateIngredientBase));
export { CreateIngredient };