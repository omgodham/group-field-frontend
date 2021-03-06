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
	Box,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";

import { SubjectOutlined } from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ClassIcon from "@material-ui/icons/Class";
import PaymentIcon from "@material-ui/icons/Payment";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../redux/actions/authActions";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getUserById } from "../components/Dashboard/helpers";
import { setChilds } from "../redux/actions/userActions";
import Logo from "../images/logo.png";
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    page: {
      background: "#F0F5FA",
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
    logo: {
      margin: 'auto',
      width: "80%",
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow:'2px 0px 5px 0px hsl(0deg 0% 13% / 52%)'
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
      boxShadow:'2px 3px 9px 0px hsl(0deg 0% 13% / 52%)'
    },
    title: {
      flexGrow: "1",
      padding: theme.spacing(2),
    },
    subTitle: {
      fontWeight:"700"
    },
    and: {
      color: theme.palette.text.secondary,
      margin: '2px',
    },  
    list: {
      display:'flex' ,
      flexDirection:'column',
      justifyContent:'center',
       alignItems: 'center'
    },
    listitem: {
      width: '90%',
      borderRadius: '10px',
      color: theme.palette.text.secondary,
      margin: '5px auto'
    },
    activeListItem: {
      width: '90%',
      borderRadius: '10px',
      backgroundColor:'#f4f4f4',
      color: theme.palette.text.primary,
      margin: '10px auto'

    },
    Icon: {
      color: theme.palette.text.secondary,
    },
    activeIcon: {
      color: theme.palette.text.primary
    },
    date:{
      flexGrow: "1",
      fontWeight:'500',
      marginLeft: theme.spacing(1)
    },
    logoutIcon:{
      marginLeft:theme.spacing(1)
    },
    navbar:{

    }
  }));
  
  function Layout(props) {
     const history = useHistory();
     const location = useLocation();
     const {user} = useSelector(state => state.user)
      const dispatch = useDispatch();
      

	useEffect(() => {
		dispatch(verifyToken(history));
	}, []);

	useEffect(() => {

		if (user?.role === "ROLE_PARENT") {
			let tempChilds = [];
			if (user) {
				const getChilds = () => {
					user.childs.forEach(async (element) => {
						try {
							const response = await getUserById(element);
							// console.log(response)
							tempChilds.push(response);
						} catch (error) {
							console.log(error);
						}
					});

					setTimeout(() => {
						// setSelectedChild(tempChilds[0])
						// setChilds(tempChilds)
						dispatch(setChilds(tempChilds));
					}, 1000);
				};
				return getChilds();
			}
		}
	}, [user]);

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
          icon:<DashboardIcon />,
          path:'/dashboard'
        },
        (user && (user.role === 'ROLE_PARENT' || user.role === 'ROLE_STUDENT')) ? {
          text:'Calender',
          icon:<CalendarTodayIcon />,
          path:'/calendar'
        } : '',
        (user && (user.role === 'ROLE_PARENT' || user.role === 'ROLE_STUDENT')) ? {
            text:'Classes',
            icon:<ClassIcon />,
            path:'/classes'
          } : '',
          (user && user.role === 'ROLE_PARENT') ? {
            text:'Payments',
            icon:<PaymentIcon />,
            path:'/payment'
          }  :'']

	const drawer = (
		<div>
			<Link to="/dashboard" style={{ textDecoration: "none" }}>
				<Box
					display="flex"
					// alignItems="left"
					// justifyContent="left"
					className={classes.title}
				>
					<img src={Logo} className={classes.logo}></img>
				</Box>
			</Link>
			<Divider />
			<List className={classes.list}>
				{menuItems.map((item, index) => (
					<ListItem
						button
						key={index}
						onClick={() => {
							history.push(item.path);
						}}
						className={
							item.path === location.pathname
								? classes.activeListItem
								: classes.listitem
						}
					>
						<ListItemIcon
							className={
								item.path === location.pathname
									? classes.activeIcon
									: classes.Icon
							}
						>
							{item.icon}
						</ListItemIcon>
						<ListItemText>{item.text}</ListItemText>
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const handleLogout = () => {
		localStorage.removeItem("jwt");
		localStorage.removeItem("userId");
		history.push("/signin");
	};


    return (
      <div className={classes.root}>
        <Box className={classes.navbar}>
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
              variant="h5"
              noWrap
              color="textPrimary"
              className={classes.date}
            >
              
            </Typography>
            <Box display='flex'  alignItems='center' justifyContent='center'>
              <Typography variant='body2' color='textSecondary' style={{marginRight:'10px',textTransform:'capitalize'}}>Hello, {user ? user.name : ''}</Typography>
            <Avatar src="http://rtablada.github.io/ember-profile-upload/profile.jpg" />
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              color="primary"
              onClick={handleLogout}
              className={classes.logoutIcon}
            >
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        </Box>
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
