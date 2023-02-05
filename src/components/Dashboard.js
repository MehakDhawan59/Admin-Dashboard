import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ConstructionSharp, LocalDining, Search, SentimentDissatisfied } from "@mui/icons-material";
import {CircularProgress,Grid,InputAdornment,TextField,Box, Button} from "@mui/material";
import './Dashboard.css';
import axios from "axios";
import { useSnackbar } from "notistack";
import DataGrid ,{GridColDef, GridValueGetterParams}from 'react-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import CreateUser from './CreateUser';
import { useRowSelect } from 'react-table';
import EditUser from './EditUser';


const Dashboard =()=>{

    const { enqueueSnackbar } = useSnackbar();
    const[users, setUsers]= useState([]);
    const[loading, setloading]= useState(false);
    const URL = "https://blue-journalist-bbrpv.ineuron.app:4000/users";
     // State variable to Post Data
     const[regUserData, setUserData] = useState({
        firstName: "", 
        lastName: "", 
        phoneNumber: "",
        age:""
      });

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    // get admin users data
    const getAdminUsersData = async () => {
        
            try{
                setloading(true);
                const res = await axios.get(URL);
                setUsers(res.data.data);
                console.log(res.data.data);
                setloading(false);
                return res.data;
            }
            catch(error){
              enqueueSnackbar(error.response.data.message, { variant: "error" });
              console.log(error);
              setloading(false);
            }
            
    };

    const handleClickOpen=()=>{
        // setSelectedId();
        setOpen(true);
      }

      const handleClose = () => {
        setOpen(false);
        // setSelectedId("");
    };

    const handleClickOpenEdit=(id)=>{
      setOpen(true);
      setSelectedId(id);
    }

    const handleCloseEdit=()=>{
      setOpen(false);
      setSelectedId("");
    }
    useEffect(() => {

        getAdminUsersData();

      },[]);

     // Create A Post
     const post_URL = "https://blue-journalist-bbrpv.ineuron.app:4000/user/create";
  
     //api call 
      const createUserPost =  async (userData) => {
        userData.preventDefault();
    
        console.log(regUserData);
      
        if(validateInput(regUserData, users)){
          try{
            console.log("insode try create block")
            const response = await axios.post(post_URL, {firstName:regUserData.firstName, lastName:regUserData.lastName, phoneNumber:Number(regUserData.phoneNumber), age:Number(regUserData.age)});
              console.log(response.data.data);
              const res = response.data.data;
              getAdminUsersData();
              enqueueSnackbar('User added successfully', {variant:"success"});

          }
          catch(error){
            if(error){
              setOpen(false);
            }
            
            else{
                enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', {variant:"error"});
            }
          }
    
        }
        setOpen(false);
       
      };

    // Validate the create user data
      const validateInput = (data, users) => {
        if(data.firstName.length===0){
          setOpen(false);
          enqueueSnackbar("firstName is a required field", {variant:"error"});
          return false;
        }
        else if(users.find((user => user.firstName === data.firstName))){
          setOpen(false);
          enqueueSnackbar("firstName should be unique", {variant:"error"});
          return false;
        }
        else if(data.lastName.length===0){
          setOpen(false);
          enqueueSnackbar("lastName is a required field",{variant:"error"});
          return false;
        }
    
        else if(data.phoneNumber.length===0){
          setOpen(false);
          enqueueSnackbar("Phone Number is req.", {variant:"error"});
          return false;
        }
        else if (data.age.length===0){
          setOpen(false);
          enqueueSnackbar("Age is req.", {variant:"error"});
          return false;
        }
       
        else{
          //setIsValidInput(true);

          return true;
        }
        
      };


    //   Delete User data
    const deleteUser = async (userId) => {
        try {
          // delete user with Id
          console.log("inside try block")
          const response = await axios.delete(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${userId}`)
          console.log("data",response.data);
          //setUsers(response.data.data);
          getAdminUsersData();
          return response.data;
        } catch (e) {
          if (e.response.status ===400) {
            enqueueSnackbar(e.response.data.message, { variant: "success" });
          } else {
            enqueueSnackbar(
              "Could not delete this address. Check that the backend is running, reachable and returns valid JSON.",
              {
                variant: "error",
              }
            );
          }
        }
      };

   
    return(
        <>
        <Box padding="1rem">
       
                <Box >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    First Name
                                  </TableCell>
                                <TableCell >Last Name</TableCell>
                                <TableCell >Phone Number</TableCell>
                                <TableCell >Age</TableCell>
                                <TableCell >Edit</TableCell>
                                <TableCell >Delete</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {users.map((user) => (
                                <TableRow
                                    key={user._id}>
                                    <TableCell >
                                    {user.firstName.toUpperCase()}
                                    </TableCell>
                                    <TableCell >{user.lastName.toUpperCase()}</TableCell>
                                    <TableCell >{user.phoneNumber}</TableCell>
                                    <TableCell >{user.age}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>{handleClickOpenEdit(user._id)}}><ModeEditIcon fontSize="small" sx={{color:"black"}}/></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={()=>{deleteUser(user._id)}} >
                                        {/* <IconButton align="left" aria-label="delete" size="small" > */}
                                        <DeleteIcon fontSize="small" sx={{color:"red"}} />
                                        </Button>
                                        {/* </IconButton> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                            
                        </TableBody>
                        
                    </Table>
                </TableContainer>
                {/* create user dialog box */}
                <Button onClick={()=>{handleClickOpen()}}sx={{color:"white", textDecoration:"none", backgroundColor:"blue", margin:"1rem"}}>Create User</Button>
                <CreateUser open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} createUserSubmit={createUserPost} regUserData={regUserData} setUserData={setUserData}/>
                {
                selectedId.length>0 &&
                <EditUser open={open} handleClickOpenEdit={handleClickOpenEdit} handleCloseEdit={handleCloseEdit} users={users}
                selectedId={selectedId} setOpen={setOpen}  getAdminUsersData={ getAdminUsersData} setSelectedId={setSelectedId}
                />

                }
                </Box>
        </Box>
        </>
    )
}

export default Dashboard;