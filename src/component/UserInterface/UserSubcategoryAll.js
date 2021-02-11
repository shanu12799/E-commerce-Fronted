import React, { useEffect } from "react"
import {postData,BaseUrl} from '../FetchServices'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';




const useStyles =makeStyles((theme) =>({
  root:{
  //   display:'flex',
  //   flexWrap:'wrap',
  //  justifyContent:'center',
  //  paddingLeft:"3%",
},
    card: {
      
    maxWidth: 250,
    margin:40,
    "&:hover":{
        transform:'scale(1.1)',
        transition:'.5s',
    }
  },
  margin: {
    margin: theme.spacing(1),
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

function UserSubcategory(props){
const classes = useStyles();
const [getlist,setList]=React.useState([])  
const[name,setname]=React.useState([])   
const readAllRecords=async()=>{
    let body={'categoryid':props.categoryid}
    var list=await postData('subcategory/displayByCategoryId',body) 
    setList(list)   
}
const handleClick=(subcategoryid)=>{
props.setViews('PRODUCT',subcategoryid)

}
const Search=async(event)=>{
  setname(event.target.value)
  let body={'searchname':event.target.value,
            'categoryid':props.categoryid

}
  var list=await postData('subcategory/searchbyname',body)
  // alert(list) 
  setList(list)
  // setList(list)
}


const displayList=()=>{
 return getlist.map((item,index)=>{

  return(
    <Card className={classes.card}>
    <CardActionArea onClick={()=>handleClick(item.subcategoryid)}>
      <CardMedia
      component='img'
        className={classes.media}
        image={`${BaseUrl}/images/${item.subcategoryicon}`}
        title={item.subcategoryname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {item.subcategoryname}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  
  )

 })

}
useEffect(()=>{
readAllRecords() 
},[])
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

<div className={classes.displaycard}>
{displayList()}
   </div>
</div>)

}

export default UserSubcategory;



