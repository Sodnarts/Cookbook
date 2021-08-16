import { AppBar, Button, createStyles, Theme, Toolbar, Typography, withStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import React from 'react';
import { getLanguageFile } from 'src/common/internationalization/lang';
import './Header.styles.css';
import { Link } from 'react-router-dom';
import { routes } from 'src/common/routes/routes';

class HeaderBase extends React.Component<any> {
    private lang = getLanguageFile();

    public render() {
        const { classes } = this.props;

        return (
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar style={{ overflow: 'hidden' }}>
                    <Link to={routes.recipes.recipeList} className="heading-secondary">
                        {this.lang.cookbook}
                    </Link>
                    <img className={classes.backgroundImg} src="./assets/header.jpg" />
                </Toolbar>
            </AppBar>
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

const Header = (withStyles(styles)(HeaderBase));

export { Header };