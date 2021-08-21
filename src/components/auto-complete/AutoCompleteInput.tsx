import { createStyles, TextField, Theme, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { ISubCategory } from 'src/common/utils/SubCategoryConfig';

interface IProps {
    listOfSelectableValues: ISubCategory[];
    label: string;
    variant: "outlined" | "standard" | "filled";
    classes: any;
    setSelectedValue(value: ISubCategory): void;
}

export function AutoCompleteInputBase({listOfSelectableValues, label, classes, setSelectedValue}: IProps) {
    const [value, setValue] = React.useState<ISubCategory | null>(null);
    const labelProps = { classes:{root: classes.label, focused: classes.focusedLabel } }

    const onChange = (value: ISubCategory | null) => {
        if (value) setSelectedValue(value);
        setValue(value);
    }
    return (
      <Autocomplete 
        id="combo-box-demo"
        classes={{ option: classes.option }}
        className="inner-text-field" 
        options={listOfSelectableValues}
        value={value}
        onChange={(event: any, newValue: ISubCategory | null) => {
            onChange(newValue);
          }}
        getOptionLabel={(listOfSelectableValues) => listOfSelectableValues.label}
        style={{ width: '100%', border: '3px solid #555', borderRadius: '1rem'}}
        renderOption={(o) => (
            <React.Fragment>
              <span>{o.label}</span>
            </React.Fragment>
          )}
        renderInput={(params) => <TextField {...params} label={label} InputLabelProps={labelProps} variant={"outlined"} />}
      />
    );
  }

  
  const styles = (theme: Theme) =>
    createStyles({    
        option: {
            '& > span': {
                marginRight: 10,
                fontSize: '1.6rem',
                [theme.breakpoints.down(900)]: {
                    fontSize: '1.4rem',
                },
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
        resize: {
            fontSize: 16,
            [theme.breakpoints.down(900)]: {
                fontSize: 14,
            },
            [theme.breakpoints.down(576)]: {
                fontSize: 13,
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
    });

const AutoCompleteInput = (withStyles(styles)(AutoCompleteInputBase));

export { AutoCompleteInput }