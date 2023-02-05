import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import {CircularProgress,Grid,InputAdornment,TextField,Box, Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
const EditUser=({handleCloseEdit,open, selectedId, users,setOpen,getAdminUsersData, setSelectedId})=>{

    const selecteduser = users.filter((user)=>user._id===selectedId);
    const [userToPatch, setUserToPatch]=useState({
        firstName:selecteduser[0].firstName,
        lastName:selecteduser[0].lastName,
        phoneNumber:selecteduser[0].phoneNumber,
        age:selecteduser[0].age
    })


    const handleValueChanges=(e)=>{
        setUserToPatch({
          ...userToPatch,
          [e.target.name]: e.target.value,
        });
  
      }

    //   Make a patch call to update user details 
      const PatchCall =  async (event) => {
       
        try{
        // console.log("edit user", selecteduser[0]);
        //   console.log("inside try block of patch")
          const response = await axios.patch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${selectedId}`,  userToPatch);
         // console.log(response.data);
          getAdminUsersData();
          setOpen(false);
        }
        catch(error) {

          console.log('Error: ', error);
        }
        
        setOpen(false);
        setSelectedId("");
    };
      return(


        <Dialog open={open} onClose={handleCloseEdit} 
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "40%",
              maxWidth: "500px", 
              backgroundColor:"#292c2f" ,
              color:"white"// Set your width here
            },
          },
        }}>
          <Grid container direction="row" justifyContent="space-between">
              <DialogTitle>Update Details</DialogTitle>
              <IconButton aria-label="close"onClick={handleCloseEdit}>
                  <ClearIcon sx={{color:"white"}}/>
                  </IconButton>
                  
          </Grid>
        <DialogContent sx={{padding:"1rem"}}>
        
          <TextField
              fullWidth
              id="outlined-helperText"
              name="firstName"
              label="firstName"
              onChange={handleValueChanges}
              defaultValue={selecteduser[0].firstName}
              sx={{marginBottom:"0.5rem", color:"#292c2f",
                  "& .MuiInputBase-root": {
                      color: 'white'
                  },
                  "& .MuiFormLabel-root": {
                      color: "rgba(246, 244, 244, 0.5)"
                  },}}
             /> 
              <TextField
              fullWidth
              id="outlined-helperText"
              name="lastName"
              label="lastName"
              onChange={handleValueChanges}
              defaultValue={selecteduser[0].lastName}
              sx={{marginBottom:"0.5rem", color:"#292c2f",
                  "& .MuiInputBase-root": {
                      color: 'white'
                  },
                  "& .MuiFormLabel-root": {
                      color: "rgba(246, 244, 244, 0.5)"
                  },}}
             />
              <TextField
              fullWidth
              type="number"
              id="outlined-helperText"
              name="phoneNumber"
              label="phoneNumber"
              onChange={handleValueChanges}
              defaultValue={selecteduser[0].phoneNumber}
              sx={{marginBottom:"0.5rem", color:"#292c2f",
                  "& .MuiInputBase-root": {
                      color: 'white'
                  },
                  "& .MuiFormLabel-root": {
                      color: "rgba(246, 244, 244, 0.5)"
                  },}}
             />
                <TextField
              fullWidth
              type="number"
              id="outlined-helperText"
              name="age"
              label="age"
              onChange={handleValueChanges}
              defaultValue={selecteduser[0].age}
              sx={{marginBottom:"0.5rem", color:"#292c2f",
                  "& .MuiInputBase-root": {
                      color: 'white'
                  },
                  "& .MuiFormLabel-root": {
                      color: "rgba(246, 244, 244, 0.5)"
                  },}}
             />
             </DialogContent>
          <DialogActions sx={{justifyContent:"flex-start", paddingBottom:"1rem", paddingLeft:"1rem" }}  >
          <Button variant="contained" onClick={PatchCall} sx={{backgroundColor:"red",color:"white"}}>Update</Button>
          <Button onClick={handleCloseEdit} sx={{color:"white"}}>Cancel</Button>
        </DialogActions>
      </Dialog>  

      );
}

export default EditUser;