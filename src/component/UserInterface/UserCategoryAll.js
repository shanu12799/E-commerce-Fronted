import React, { useEffect } from "react"
import {getData,BaseUrl} from '../FetchServices'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Stepper from './Stepper'
import Container from '@material-ui/core/Container';
const useStyles = makeStyles({
  root:{
    display:'flex',
    flexWrap:'wrap',
   justifyContent:'center'
  },
    card: {
      
    maxWidth: 400,
    margin:50,
  },
  media: {
    width:'100%',
    height:'100%'
  },
  shop:{
      paddingTop:'5%'
  },
});

function UserCategoryAll(props){
const classes = useStyles();
const [getlist,setList]=React.useState([])     
const readAllRecords=async()=>{
var list=await getData('category/displayall') 
setList(list)   
}
const handleClick=(categoryid)=>{
props.setViews('SUBCATEGORY',categoryid)

}

const displayList=()=>{
 return getlist.map((item,index)=>{

  return(
    <Card className={classes.card}>
    <CardActionArea onClick={()=>handleClick(item.categoryid)}>
      <CardMedia
      component='img'
        className={classes.media}
        image={`${BaseUrl}/images/${item.categoryicon}`}
        title={item.categoryname}
      />
    </CardActionArea>
  </Card>
  
  )

 })

}
useEffect(()=>{
readAllRecords() 

},[])
return(<div className={classes.root}>

<Stepper/>
 <Container className={classes.shop}>
    <Typography variant="h4" align="center">OUR SHOP</Typography>
</Container> 
{displayList()}

</div>)

}

export default UserCategoryAll;



