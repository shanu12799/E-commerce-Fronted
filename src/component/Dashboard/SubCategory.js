import React,{useEffect} from 'react';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Container, Typography,MenuItem } from '@material-ui/core';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import {postDataAndImage,getData} from '../FetchServices';



const useStyles = makeStyles(theme => ({
    
paper:{padding:'30px',marginTop:'40px'},
    
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),

    
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    bigAvatar: {
      margin: 0,
      width: 60,
      height: 60,
    },
  }))

function SubCategory(props)
{
    const [categoryId,setCategoryId]=React.useState('')
    const [SubcategoryName,setSubCategoryName]=React.useState('')
    const [SubcategoryIcon,setSubCategoryIcon]=React.useState({icon:'',file:''})


    const addNewRecord=async()=>{
      let formData=new FormData()
      formData.append('categoryId',categoryId);
      formData.append('Subcategoryname',SubcategoryName)
      formData.append('Subcategoryicon',SubcategoryIcon.file)
      const config={headers:{'content-type':'multipart/form-data'}}
       const result =await postDataAndImage('subcategory/addNewRecord',formData,config)
       if(result)
       {
         //alert("Record Submitted....")
          alert("Record Submitted....")
          setCategoryId('');
          setSubCategoryName('');
          setSubCategoryIcon({icon:''});
       }
       else
       {
         alert("Failed to sumitted....")
       }
       
    }
     
    const [getlist,setlist]=React.useState([])
  const readAllRecords=async()=>{
    var list=await getData('category/dropdown') 
    setlist(list)
    }
    useEffect(()=>{
      readAllRecords()
    },[]) 
  
    const classes = useStyles();
    return(<Container maxWidth="xs">
        <Paper className={classes.paper}>
      <center><Typography>
      SUB CATEGORY
      </Typography></center> 
        <Grid container>
       <Grid item xs={12}>

      </Grid>
      <Grid item xs={12}>
      <TextField
        id="outlined-dense-multiline"
        select
        label="Category id"
        fullWidth
        className={(classes.textField,classes.dense)}
        value={categoryId}
        onChange={(event)=>setCategoryId(event.target.value)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
        variant="outlined"
      >

        {getlist.map(option => (
          <MenuItem key={option.categoryid} value={option.categoryid}>
            {option.categoryname}
          </MenuItem>
        ))}
      </TextField>
      </Grid>
      <Grid item xs={12}>

       <TextField
        id="SubCategoryName"
        label="SubCategory_Name"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={SubcategoryName}
        onChange={(event)=>setSubCategoryName(event.target.value)}
        variant="outlined"
        fullWidth
      />
      </Grid>
      <Grid item xs={12} sm={6}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event)=>setSubCategoryIcon({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}

      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </label>
      </Grid>
      <Grid item xs={12} sm={6}>
          <Avatar alt="Image" src={SubcategoryIcon.icon} className={classes.bigAvatar} />
          </Grid>   
      <Grid item xs={12}>
          <Button variant="contained" onClick={addNewRecord} color="primary" className={classes.button} fullWidth>
           Submit
          </Button>
      </Grid>

</Grid>
</Paper>
<Typography>
</Typography>
</Container>

    )
}
export default SubCategory;