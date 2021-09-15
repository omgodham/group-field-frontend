import {
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemText,
    Hidden,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    ListItemIcon,
    Box
  } from "@material-ui/core";
  import { makeStyles, useTheme } from "@material-ui/core/styles";
  import React,{useState,useEffect} from "react";
  import PropTypes from "prop-types";
  import MenuIcon from "@material-ui/icons/Menu";

  import {  SubjectOutlined } from "@material-ui/icons";
  import { Link, useHistory, useLocation } from "react-router-dom";
  import DashboardIcon from '@material-ui/icons/Dashboard';
  import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
  import ClassIcon from '@material-ui/icons/Class';
  import PaymentIcon from '@material-ui/icons/Payment';
  import {useDispatch} from 'react-redux'  
import { verifyToken } from "../redux/actions/authActions";
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    page: {
      background: "#f9f9f9",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        paddingTop: theme.spacing(10),
      },
      [theme.breakpoints.up("xs")]: {
        paddingTop: theme.spacing(10),
      },
  
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(9),
      },
    },
    root: {
      display: "flex",
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      height: "100vh",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      backgroundColor: "#fefefe",
    },
    title: {
      flexGrow: "1",
      padding: theme.spacing(2),
    },
    subTitle: {
      fontWeight:"700"
    },
    listItem:{
        backgroundColor:'#f4f4f4'
    },
    date:{
      flexGrow: "1",
      fontWeight:'600'
    }
  }));
  
  function Layout(props) {
     const history = useHistory();
     const location = useLocation();
      const dispatch = useDispatch();
      
     console.log(location);

      useEffect(() => {

        dispatch(verifyToken(history))
       
      }, [])

    const classes = useStyles();
  
    const { window } = props;
  
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };


    const menuItems = [
        {
          text:'Dashboard',
          icon:<DashboardIcon color="primary"/>,
          path:'/dashboard'
        },
        {
          text:'Calender',
          icon:<CalendarTodayIcon color="primary"/>,
          path:'/calendar'
        },
        {
            text:'Classes',
            icon:<ClassIcon color="primary"/>,
            path:'/'
          },
          {
            text:'Payments',
            icon:<PaymentIcon color="primary"/>,
            path:'/'
          }

    ]
    const drawer = (
      <div>
          <Link to='/dashboard' style={{textDecoration:'none'}}>
        <Box display='flex' flexDirection="row" alignItems='center' justifyContent='center' className={classes.title}>
          <Typography variant="h5" color='textPrimary' className={classes.subTitle}>Group</Typography>
            <Typography variant="h5" color='textSecondary' style={{margin:'0 10px'}} className={classes.subTitle}>&</Typography>
            <Typography variant="h5" color='textPrimary' className={classes.subTitle}>Field</Typography>
        </Box>
        </Link>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => {history.push(item.path)}} className={item.path === location.pathname ? classes.listItem : null }>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  
    const container =
      window !== undefined ? () => window().document.body : undefined;
  
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              color="primary"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              color="textPrimary"
              className={classes.date}
            >
              Dashboard
            </Typography>
            <Box display='flex'  alignItems='center' justifyContent='center'>
              <Typography variant='body2' color='textSecondary' style={{marginRight:'10px'}}>Hello, Omkar Godham</Typography>
            <Avatar src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            </Box>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.toolbar} />
        <div className={classes.page}>{props.children}</div>
      </div>
    );
  }
  Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
  export default Layout;