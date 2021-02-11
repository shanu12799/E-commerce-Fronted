import React,{useEffect} from 'react';
import clsx from 'clsx';
import { Grid,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Container, Typography,MenuItem } from '@material-ui/core';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import {postDataAndImage,getData,postData} from '../FetchServices';





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

function Video(props)
{
    const [categoryId,setCategoryId]=React.useState('')
    const [subcategoryId,setsubcategoryId]=React.useState('')
    const [productname,setproductname]=React.useState('')
    const [productdescription,setproductdescription]=React.useState('')
    const [quantity,setquantity]=React.useState('')
    const [amount,setamount]=React.useState('')
    const [productIcon,setproductIcon]=React.useState({icon:'',file:''})

  
    const addNewRecord=async()=>{
      let formData=new FormData()
      formData.append('categoryId',categoryId);
      formData.append('SubcategoryId',subcategoryId);
      formData.append('productname',productname);
      formData.append('productdescription',productdescription);
      formData.append('quantity',quantity);
      formData.append('amount',amount);
      formData.append('productIcon',productIcon.file)
      const config={headers:{'content-type':'multipart/form-data'}}
       const result =await postDataAndImage('Product/addNewRecord',formData,config)
       if(result)
       {
         setCategoryId('');
         setsubcategoryId('');
         setproductname('');
         setproductdescription('');
         setquantity('');
         setamount('');
         setproductIcon({icon:''});
        alert("Record Submitted....")
          
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
    const[getdrop,setdrop]=React.useState([])
    
    const fetchSC=async(categoryId)=>{
      let body={'categoryId':categoryId}
      var list=await postData('subcategory/dropdown',body) 
      setdrop(list)
    }
    
    const handleChangeq=(event)=>{
      setCategoryId(event.target.value)
      fetchSC(event.target.value)
    }
  
    const classes = useStyles();
    return(<Container maxWidth="xs">
        <Paper className={classes.paper}>
      <center><Typography>
       ADD PRODUCTS
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
        onChange={(event)=>handleChangeq(event)}
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
        id="outlined-dense-multiline"
        select
        label=" SubCategory id"
        fullWidth
        className={(classes.textField,classes.dense)}
        value={subcategoryId}
        onChange={(event)=>setsubcategoryId(event.target.value)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
        variant="outlined"
      >

        {getdrop.map(option => (
          <MenuItem key={option.subcategoryid} value={option.subcategoryid}>
            {option.subcategoryname}
          </MenuItem>
        ))}
      </TextField>
      </Grid>
      <Grid item xs={12}>

       <TextField
        id="productname"
        label="Product Name"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={productname}
        onChange={(event)=>setproductname(event.target.value)}
        variant="outlined"
        fullWidth
      />
      </Grid>
      <Grid item xs={12}>
      <TextField
        id="productdescription"
        label="Product Description"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={productdescription}
        onChange={(event)=>setproductdescription(event.target.value)}
        variant="outlined"
        fullWidth
      />
      </Grid>
      <Grid item xs={12}>
      <TextField
        id="quantity"
        label="Product Quantity"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={quantity}
        onChange={(event)=>setquantity(event.target.value)}
        variant="outlined"
        fullWidth
      />
      </Grid>
        <Grid item xs={12}>
      <TextField
      id="amount"
        label="Amount"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        value={amount}
        onChange={(event)=>setamount(event.target.value)}
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
        onChange={(event)=>setproductIcon({icon:URL.createObjectURL(event.target.files[0]),file:event.target.files[0]})}
        fullWidth

      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </label>
      </Grid>
      <Grid item xs={12} sm={6}>
          <Avatar alt="Image" src={productIcon.icon} className={classes.bigAvatar} />
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
export default Video;