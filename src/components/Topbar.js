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
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      marginLeft: theme.spacing(5),
      letterSpacing: '0.05rem'
    },
    topbarChild: {
      marginRight: theme.spacing(5),
      fontFamily: 'Roboto, sans-serfi',
      fontWeight: '400'
    },
    and: {
      margin: '2px',
      color: theme.palette.text.secondary
    }
}));

export default function Topbar() {

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Toolbar className={classes.Toolbar}>
                <Typography 
                  variant="h5" 
                  color='primary' 
                  className={classes.title}
                  fontWeight='300'
                >
                    Group<span className={classes.and}>&</span>Field
                </Typography>
                <Typography variant="h6" color='primary' className={classes.topbarChild}>
                    About
                </Typography>
                <Typography variant="h6" color='primary' className={classes.topbarChild}>Contact</Typography>
            </Toolbar>
        </div>
    )
}
