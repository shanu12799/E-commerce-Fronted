import React, { useEffect } from "react"
import {postData,BaseUrl} from '../FetchServices'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { deepOrange} from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



import Avatar from '@material-ui/core/Avatar';
import { async } from "q";

const useStyles = makeStyles((theme) => ({
  root:{
   
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
    marginLeft:'18%',
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
    card: {
      
        maxWidth: 300,
        margin:40,
  },
  cart: {
      
    display:'flex',
},
formcon:{
marginLeft:'80px;'
// justifyContent:'center',
},
displaycard:{
  display:'flex',
  flexWrap:'wrap',
 justifyContent:'left',
//  marginLeft:"14%",



 paddingLeft:"14%",
 marginTop:'2%'
},
  media: {
    width:'100%',
    height:'100%'
  },
}));

export default  function ProductAll(props){
const classes = useStyles();
const [getlist,setList]=React.useState([])    
const[user,setUser]=React.useState([])
const [name,setname]=React.useState([])
const[price,setprice]=React.useState([])

const[r,setr]=React.useState([]) 

const Search=async(event)=>{
  setname(event.target.value)
  let body={'searchname':event.target.value,
            'subcategoryid':props.subcategoryid

}
var list=await postData('Product/searchbyname',body)
  // alert(list) 
  setList(list)
}
const readAllRecords=async()=>{
    let body={'subcategoryid':props.subcategoryid}
    var list=await postData('Product/displayBySubCategoryId',body) 
    setList(list)   
}


var user_id;
useEffect(()=>{
  user_id=JSON.parse(localStorage.getItem('USER_ID'))
  set(user_id)
  
  },[])

  function set(user_id)
  {
     setUser(user_id)
    
    
    // alert("re"+rec)
    
  }

  


  const AddToCart=async(item)=>{
      if(!localStorage.getItem("US_USER"))
      {
        alert("You need to Login first")
      } 
      else
      {
        let body={
          'productid':item.productid,
        'userid':user,
        'itemname':item.productname,
        'quantity':'1',
        'price':item.price
        }
        var result = await postData('cart/addNewRecord',body)
            if(result.error==="duplicate")
            {
              
              alert('item already in the cart')
              
            }
            else if(result.error==="success")
            {
              
              alert("item is added successfully on cart")
              // props.setCheck(2)
              props.CountCartItem()
              // window.location.reload(false);
            }
            else {
              alert('error')
            }
         }
         //  props.countCartItems()
       }



const handleChange=async(event)=>{
  let body={'price':event.target.value,
            'subcategoryid':props.subcategoryid

}
var list=await postData('Product/searchbyprice',body)
  // alert(list) 
  setList(list)
}







const displayList=()=>{
 return getlist.map((item,index)=>{


  return(
    <Card className={classes.card}>
    <CardActionArea>
      <CardMedia
      component='img'
        className={classes.media}
        image={`${BaseUrl}/images/${item.picture}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {item.productname}
        </Typography>
        <div className={classes.cart}>
        <Button size="small" color="primary" onClick={()=>AddToCart(item)}>
        ADD TO CART
        </Button> 
        <Avatar className={classes.orangeAvatar}>{item.price}/-</Avatar>
        </div> 
      </CardContent>
    </CardActionArea>
  </Card>
  
  )

 })

}
useEffect(()=>{
readAllRecords() 

},[props.subcategoryid])
return(<div className={classes.root}>
  <Container maxWidth="md" style={{marginTop:"20px"}}>
   <Grid>
     <Grid item >
     <TextField 
     id="outlined-basic" 
     label="Search"     
     fullWidth
     value={name}
     variant="outlined" 
     onChange={(event)=>Search(event)}
     />
    
     </Grid>
   </Grid>

  </Container> 
  <Container maxWidth="sm" style={{marginTop:"20px"}}>
    <Paper elevation={3} >
    <Grid >
    <FormControl component="fieldset" className={classes.formcon} >
      <RadioGroup row aria-label="position"  onChange={handleChange} name="position" defaultValue="top">
        <center>
        <div>
        <FormControlLabel
          value="all"
          control={<Radio color="primary" />}
          label="All"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="0-700"
          control={<Radio color="primary" />}
          label="0-700"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="700-1200"
          control={<Radio color="primary" />}
          label="700-1200"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="above 1200"
          control={<Radio color="primary" />}
          label="above 1200"
          labelPlacement="bottom"
        />
        </div>
        </center>
      
    </RadioGroup>
    </FormControl>
    </Grid>
    </Paper>

  </Container>
 <div className={classes.displaycard}>
{displayList()}
</div>
 
</div>)

}




