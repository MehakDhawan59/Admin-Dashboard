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

const CreateUser=({handleClose,regUserData, setUserData , createUserSubmit, open})=>{

    const handleValueChanges=(e)=>{
        setUserData({
            ...regUserData,
            [e.target.name]: e.target.value,
          });
          console.log(regUserData);
    
    }

    return(


        <Dialog open={open} onClose={handleClose} 
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
              <DialogTitle>Create  New User</DialogTitle>
              <IconButton aria-label="close"onClick={handleClose}>
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
          <Button variant="contained" onClick={createUserSubmit} sx={{backgroundColor:"red",color:"white"}}>create User</Button>
          <Button onClick={handleClose} sx={{color:"white"}}>Cancel</Button>
        </DialogActions>
      </Dialog>   
    )
}

export default CreateUser;