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
	Collapse,
	ListItemAvatar,
	ListItemSecondaryAction,
	Paper,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
	ExpandLess,
	ExpandMore,
	StarBorder,
	SubjectOutlined,
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ClassIcon from "@material-ui/icons/Class";
import PaymentIcon from "@material-ui/icons/Payment";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, verifyToken } from "../redux/actions/authActions";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getUserById } from "../components/Dashboard/helpers";
import { setChilds, setTimeZone } from "../redux/actions/userActions";
import Logo from "../images/logo.png";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FaceIcon from "@material-ui/icons/Face";
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { deleteNotification, getAllNotifications } from "./helpers";
import CloseIcon from '@material-ui/icons/Close';
import { getTimeZone } from "../utils/momenttz";
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
		margin: "auto",
		width: "80%",
		color:'#fff',
	},
	drawerPaper: {
		width: drawerWidth,
		// boxShadow:'2px 0px 5px 0px hsl(0deg 0% 13% / 52%)'
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
		  width: "100%",
		  // marginLeft: drawerWidth,
		},
		backgroundColor: "#fefefe",
		backgroundColor: theme.palette.primary,
		// boxShadow:'2px 3px 9px 0px hsl(0deg 0% 13% / 52%)'
		zIndex: theme.zIndex.drawer + 1,
		display: "100%",
		display:"flex",
		flexDirection:'row',
		justifyContent:'space-between',
		// position:'relative'
		// padding:'10px'
	},
	appBarlogo:{
		width:'18%',
		// height:'35px',
	},
	// navbar:{
	// 	position:'relative'
	// },
	notificationBlock:{
		paddingTop:'20px',
		position:'absolute',
		top:'70px',
		right:'50px',
		height:'350px',
		width:'400px',
		backgroundColor:"white",
		overflowY:'scroll'
	},
	title: {
		flexGrow: "1",
		padding: theme.spacing(2),
	},
	subTitle: {
		fontWeight: "700",
	},
	and: {
		color: theme.palette.text.secondary,
		margin: "2px",
	},
	list: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	listitem: {
		width: "90%",
		borderRadius: "10px",
		color: theme.palette.text.black,
		margin: "10px auto",
		"&:hover": {
			backgroundColor: "secondary",
		},
	},
	activeListItem: {
		width: "90%",
		borderRadius: "10px",
		backgroundColor: theme.palette.primary.main,
		color: "#fff",
		margin: "10px auto",
    "&:hover": {
			backgroundColor: "#434fa8",
		},
	},
	Icon: {
		color: theme.palette.text.black,
	},
	activeIcon: {
		color: "#fff",
	},
	date: {
		flexGrow: "1",
		fontWeight: "500",
		marginLeft: theme.spacing(1),
	},
	logoutIcon: {
		marginLeft: theme.spacing(1),
	},
	rootList: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(2),
	},
	notificationIcon:{
		position:'relative'
	},
	notificationCount:{
		position:'absolute',
		top:'5px',
		right:'10px',
		
	},
	closeIcon:{
		position:'absolute',
		top:'5px',
		right:'10px',
	}
}));

function Layout(props) {
	const history = useHistory();
	const location = useLocation();
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [notificationsOn,setNotificationsOn] = useState(false);

	useEffect(async () => {
		dispatch(verifyToken(history));
		try {
			let thisZone = await getTimeZone();
			dispatch(setTimeZone(thisZone));
		} catch (error) {
			console.log(error)
		}
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
	const [notifications,setNotifications] = useState([])
;

useEffect(() => {
	getAllNotifications().then(data => {
		// console.log(data)
		setNotifications(data);

	}).catch(error => console.log(error))		
},[])

	useEffect(() => {
		getAllNotifications().then(data => {
			console.log(data)
			setNotifications(data);
		}).catch(error => console.log(error))		
	},[notificationsOn])

	

	
	const classes = useStyles();

	const { window } = props;

	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	const menuItems = [
		{
			text: "Dashboard",
			icon: <DashboardIcon />,
			path: "/dashboard",
		},
		user &&
			(user.role === "ROLE_PARENT" || user.role === "ROLE_STUDENT") && {
				text: "Calender",
				icon: <CalendarTodayIcon />,
				path: "/calendar",
			},
		user &&
			(user.role === "ROLE_PARENT" || user.role === "ROLE_STUDENT") && {
				text: "Past Classes",
				icon: <ClassIcon />,
				path: "/classes",
			},
		user &&
		(user.role === "ROLE_PARENT" || user.role === "ROLE_STUDENT") && {
				text: "Make Payment",
				icon: <PaymentIcon />,
				path: "/payment",
			},
		user &&
			user.role === "ROLE_ADMIN" && {
				text: "Payout",
				icon: <PaymentIcon />,
				path: "/payout",
			},
	];
const handleDeleteNotification = (id) => {
	deleteNotification(id).then(data => {
		console.log(data)
		setNotifications(notifications.filter(item => item._id !== id))
	}).catch(error => console.log(error))
}
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
			{/* <Divider /> */}
			<List className={classes.list}>
				{menuItems.map((item, index) => {
					return (
						<>
							{item && (
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
							)}
						</>
					);
				})}
				<ListItem button onClick={handleClick} className={classes.listitem}>
					<ListItemIcon>
						<FaceIcon />
					</ListItemIcon>
					<ListItemText primary="Profile" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<Link to="/account-details" style={{ textDecoration: "none" }}>
							<ListItem button className={classes.nested}>
								<ListItemIcon>
									<ChevronRightIcon />
								</ListItemIcon>
								<ListItemText primary="Account Details" />
							</ListItem>
						</Link>
						{user?.role === 'ROLE_ADMIN' && <Link to="/signup" style={{ textDecoration: "none" }}>
							<ListItem button className={classes.nested}>
								<ListItemIcon>
									<ChevronRightIcon />
								</ListItemIcon>
								<ListItemText primary="Create User" />
							</ListItem>
						</Link>}
					</List>
				</Collapse>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const handleLogout = () => {
		// localStorage.removeItem("jwt");
		// localStorage.removeItem("userId");
		// dispatch({
		//   type: "USER_LOGOUT",
		//   payload: null,
		// });
		dispatch(logoutAction(history));
		// history.push("/signin");
	};

	// console.log(notificationsOn)
	return (
		<div className={classes.root}>
			<Box className={classes.navbar}>
				<AppBar position="fixed" className={classes.appBar} elevation={0}>
				<Link to="/dashboard" style={{ textDecoration: "none" }}>
				<Box
					display="flex"
					// alignItems="left"
					// justifyContent="left"
					className={classes.title}
				>
					<img src={Logo} className={classes.appBarlogo}></img>
				</Box>
			</Link>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							// color="primary"
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
						></Typography>
							<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							// color="primary"
							className={classes.notificationIcon}
							onClick={() => setNotificationsOn(!notificationsOn)}
						>
							<NotificationsIcon />
							<Typography className={classes.notificationCount} variant='body2'>{notifications.length}</Typography>
						</IconButton>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Typography
								variant="body2"
								color="background"
								style={{ marginRight: "10px", textTransform: "capitalize" }}
							>
								Hello, {user ? user.name : ""}
							</Typography>
							<Avatar src="http://rtablada.github.io/ember-profile-upload/profile.jpg" />
						</Box>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							// color="primary"
							onClick={handleLogout}
							className={classes.logoutIcon}
						>
							<ExitToAppIcon />
						</IconButton>
							
					</Toolbar>
					{notificationsOn && notifications.length ? <Paper className={classes.notificationBlock}>
					<CloseIcon className={classes.closeIcon} onClick={() => setNotificationsOn(false)}/>
					<div className={classes.demo}>
            <List dense={true}>
			{notifications.length ? notifications.map((item,index) => {
               return <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Payment request from ${item.from.name}`}
                    secondary={`${item.from.name} is requesting of payment of $${item.amount?.toFixed(2)}`}
					style={{color:'black'}}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNotification(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              })
			  : ''}
            </List>
          </div>
				</Paper>:''}
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
