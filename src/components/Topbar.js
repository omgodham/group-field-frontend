import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      background: '#eeeeee',
    },
    Toolbar: {

    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(5),
    },
    topbarChild: {
      marginRight: theme.spacing(5)
    }
}));

export default function Topbar() {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Toolbar className={classes.Toolbar}>
                <Typography variant="h6" color='primary' className={classes.title}>
                    Group&Field
                </Typography>
                <Typography variant="body2" color='primary' className={classes.topbarChild}>
                    About
                </Typography>
                <Typography variant="body2" color='primary' className={classes.topbarChild}>Contact</Typography>
            </Toolbar>
        </div>
    )
}