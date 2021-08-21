import { Divider, createStyles, Theme, Chip} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useState } from 'react';
import { ISubCategory } from 'src/common/utils/SubCategoryConfig';
import 'src/components/sub-category/SubCategoryInput.styles.css';
import { AutoCompleteInput } from 'src/components/auto-complete/AutoCompleteInput';

const styles = (theme: Theme) =>
    createStyles({
        chip: {
            margin: '.4rem',
        },
        formControl: {
            marginBottom: '4px',
            minWidth: 150,
        },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '.4rem',
        },
    });

interface IProps {
    categoryList: ISubCategory[];
    selectedCategories: ISubCategory[];
    classes: any;
    setSubCategories(subCategories: ISubCategory[]): void;
}

const SubCategoryInputBase = (props: IProps) => {
    const classes = props.classes;
    const [categories, setCategories] = useState<ISubCategory[]>(props.selectedCategories);
    const [list, setList] = useState<ISubCategory[]>(props.categoryList);
 
    const handleRemoveCategory = (currentCategory: ISubCategory) => {
        let tmpCategories: ISubCategory[] = [];
        categories.forEach((category: ISubCategory) => {
            if (category.value !== currentCategory.value) tmpCategories.push(category)
        })

        setCategories(tmpCategories);
        setList([...list, currentCategory]);
        props.setSubCategories(tmpCategories);
    }


    const handleSetSelectedValue = (value: ISubCategory) => {
        let tmpList: ISubCategory[] = [];
        list.forEach((category: ISubCategory) => {
            if (category.value !== value.value) tmpList.push(category)
        })

        setList(tmpList);
        setCategories([...categories, value]);
        props.setSubCategories([...categories, value]);
    }

    return (
        <div className="container__sub-category-input">
            <AutoCompleteInput  label={'Underkategori'} setSelectedValue={handleSetSelectedValue} listOfSelectableValues={list} variant={"standard"}/> 
            <div className="chip-container">
                <div style={{ flexGrow: 1, marginLeft: '.5rem', marginRight: '.5rem' }}>
                    {categories.map((category: ISubCategory) => {
                        return (
                            <Chip
                                key={category.value}
                                label={category.label}
                                color="primary"
                                style={{ color: '#ddd', fontSize: '1.2rem', marginBottom: '1rem', marginTop: '1rem'}}
                                // tslint:disable-next-line: jsx-no-lambda
                                onDelete={() => handleRemoveCategory(category)}
                                className={classes.chip}
                            />
                        );
                    })}
                </div>
               
            </div>
            <Divider />
        </div>
    )
}

const SubCategoryInput = withStyles(styles)(SubCategoryInputBase);

export { SubCategoryInput }