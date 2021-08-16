import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';

interface IProps {
    progressBar: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
            'marginTop': '65px',
            'position': 'fixed',
            'width': '100%',
            'zIndex': 1000,
        },
    }),
);

const ProgressBarBase = ({ progressBar }: IProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LinearProgress style={{ visibility: !!progressBar ? 'visible' : 'hidden' }} />
        </div>
    );
};

function mapStateToProps({ progressBar }: any) {
    return { progressBar };
}

const ProgressBar = connect(mapStateToProps)(ProgressBarBase);

export { ProgressBar };
