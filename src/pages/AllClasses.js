import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserById } from "../components/Dashboard/helpers";
import {
	Typography,
	Box,
	Paper,
	Button,
	makeStyles,
	Container,
	CircularProgress,
	Select,
	FormControl,
	InputLabel,
    Divider
} from "@material-ui/core";
import ClassesTable from "../components/Classes/ClassesTable";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(2),
	},
	button: {
		width: "100px",
		backgroundColor: theme.palette.text.secondary,
		borderRadius: "20px",
		color: "black",
		marginRight: "30px",
	},
}));

function Classes({unpaidLectures,setUnpaidLectures}) {
	const { user } = useSelector((state) => state.user);
	const [childs, setChilds] = useState([]);
	const [selectedChild, setSelectedChild] = useState(null);

	const classes = useStyles();
	useEffect(() => {
		let tempChilds = [];
		if (user && user?.role === "ROLE_PARENT") {
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
					setSelectedChild(tempChilds[0]);
					setChilds(tempChilds);
				}, 1000);
			};
			return getChilds();
		} else if (user?.role === "ROLE_STUDENT" || user?.role === 'ROLE_TEACHER') {
			setSelectedChild(user);
		}

        console.log('childs',childs);
	}, [user]);

	const handleChange = (e) => {

        let selected = childs.find(child => child._id === e.target.value)    
        setSelectedChild(selected);
    
    };


	return (
		<Container>
			<Paper style={{padding : 0, minHeight: '90vh'}}>
			{childs.length ? <Box className={classes.paper}>
					<Typography variant="h6" style={{marginRight:10}}>SELECT YOUR CHILD</Typography>
					<FormControl className={classes.formControl} variant="outlined">
						{/* <InputLabel htmlFor="age-native-simple">Age</InputLabel> */}
						<InputLabel htmlFor="outlined-age-native-simple">
							Childrens
						</InputLabel>
						<Select
							native
							// value={selectedChild}
							onChange={handleChange}
							label="CHILDRENS"
							size="sm"
                            style={{width: '120px'}}
							inputProps={{
								name: "Childrens",
								id: "outlined-age-native-simple",
							}}
						>
							<option aria-label="None" value="" disabled/>
							{childs.length &&
								childs.map((child, index) => {
                                    console.log('PASSED VALUES',child);
									return <option value={child._id} key={index}>
											{child.name}
										</option>
								})}
						</Select>
					</FormControl>
				</Box>: ''}
                
                  
				
							
		<Divider />
        <Box  display='flex' flexDirection='column' alignItems='center' justifyContent='center' sx={{p:2}}>
            {selectedChild ? <ClassesTable child={selectedChild} setUnpaidLectures={setUnpaidLectures}/> : <CircularProgress />}
        </Box>
		</Paper>


        </Container>
    )
}

export default Classes;
