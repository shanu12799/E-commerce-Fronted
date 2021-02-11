import React,{useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import {getData,postData} from '../FetchServices'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Footer from './Footer'
import UserCategoryAll from './UserCategoryAll'
import UserSubcategoryAll from "./UserSubcategoryAll"
import ProductAll from './ProductAll';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import UserLogin from './UserLogin'
import ViewCart from './ViewCart'
import Checkout from './Checkout'
import UserRegistration from "./UserRegistration"; 
const StyledBadge1 = withStyles(theme => ({
  badge: {
    right: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    color:'#fafafa',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    paddingLeft:"7%",
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
    
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerHeader: {
      display: 'flex',
      // flexDirection:'column',
      alignItems: 'center',
     marginLeft:'10%',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
 

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function LandingPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const setViews=(views,id)=>{
    if(views==="SUBCATEGORY"){
      setView(<UserSubcategoryAll categoryid={id} setViews={setViews}/>)
    }
    if(views==="CATEGORYALL"){
      
      setView(<UserCategoryAll setViews={setViews}/>)
      // window.location.reload(false);
      setCheck(1)
    }
    if(views==="PRODUCT"){
      setView(<ProductAll  CountCartItem={CountCartItem} setCheck={setCheck} subcategoryid={id}   setViews={setViews}/>)
    }
    // if(views=="PRODUCTLOGIN"){
    //   setView(<ProductAll subcategoryid={id} setViews={setViews}/>)
    // }
    if(views==="USERLOGIN"){
      setView(<UserLogin setViews={setViews} emailid={id} />)
    }
    if(views==="PAYMENT"){
      setView(<Checkout setViews={setViews} CountCartItem={CountCartItem} clearCartItems={clearCartItems}emailid={id} />)
    }
    
  }
  const [counter,setCounter]=React.useState(0) 
  const [view, setView] = React.useState(<UserCategoryAll setViews={setViews} />); 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getMlist,setMList]=React.useState([])   
  const [getSClist,setSCList]=React.useState([])
  const [anchorElAM, setAnchorElAM] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [checkone, setCheck] = React.useState([]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function handleClickAM(event) {

    setAnchorElAM(event.currentTarget);
     

  }
  function handleCloseAM() {
    setAnchorElAM(null);
  }
  const handleClickAMMenu=(opt)=>
  { 
    if(opt==='USERLOGIN')
    {
       setView(<UserLogin setViews={setViews} emailid={''} />)
       {handleCloseAM()}
  }
    else if(opt==='REGISTRATION')
    {
      setView(<UserRegistration setViews={setViews} />) 
      {handleCloseAM()} 
    }
    else if(opt==='CLEAR CART')
    {
    //  clearCartItems()
    clearCartItems()
  
    }
    else if(opt==='LOGOUT')
    {
    localStorage.clear();
    setCounter(0)
    {handleCloseAM()}
    //  countCartItems()
    //  setView(<UserCategoryAll setViews={setViews}/>)
  
    }
    else
    setAnchorElAM(null); 

  } 


   async function CountCartItem(){
    user_id=JSON.parse(localStorage.getItem('USER_ID'))
     let body={
      'userid':user_id
     }
     var result = await postData('cart/countitem',body)
     if(result)
     {
       setCounter(result)
       
     }
     else {
       
     }
   }
   async function clearCartItems(){
    user_id=JSON.parse(localStorage.getItem('USER_ID'))
    let body={
     'userid':user_id
    }
    var result = await postData('cart/clearitem',body)
    if(result.RESULT)
    {
      window.location.reload(false);
      
    }
    else {
      
    }
  }
  

  // to get the name of all the category
  const readAllRecords=async()=>{
    var list=await getData('category/displayall') 
    setMList(list)   
    }
    // to get the name of all the Subcategory
const readAllSCRecords=async(categoryid)=>{
      let body={'categoryid':categoryid}
      var list=await postData('subcategory/displayByCategoryId',body) 
      setSCList(list)   
}
const setSubCategory=()=>{
  return getSClist.map((item,index)=>{

    return(
    <MenuItem onClick={(event)=>setView(<ProductAll CountCartItem={CountCartItem} subcategoryid={event.currentTarget.value} setViews={setViews} />)} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
       )})


} 
const setMainCategory=()=>{
return getMlist.map((item,index)=>{

  return(<Button value={item.categoryid} color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={(event)=>handleClick2(event)}>
  {item.categoryname}
</Button>)})}


function handleClick2(event) {
  
  readAllSCRecords(event.currentTarget.value)
  setAnchorEl(event.currentTarget);
  
}

const handleClose=() =>{
  setAnchorEl(null);
}
const check=()=>{
  if(!localStorage.getItem("US_USER"))
  {
    return(
   
      <Menu
           id="simple-menuAM"
           anchorEl={anchorElAM}
           keepMounted
           open={Boolean(anchorElAM)}
           onClose={handleCloseAM}
         >
           <MenuItem onClick={()=>handleClickAMMenu("USERLOGIN")} >Login</MenuItem>
           <MenuItem onClick={()=>handleClickAMMenu("REGISTRATION")} >Registration</MenuItem>
         </Menu>
    )
  }
  else
  { 
    return(
      <Menu
      id="simple-menuAM"
      anchorEl={anchorElAM}
      keepMounted
      open={Boolean(anchorElAM)}
      onClose={handleCloseAM}
    >
         <MenuItem onClick={()=>handleClickAMMenu("ACCOUNT STATUS")} >Account Status</MenuItem>
         <MenuItem onClick={()=>handleClickAMMenu("CHANGE PROFILE")} >Change Profile</MenuItem>
         <MenuItem onClick={()=>handleClickAMMenu("CLEAR CART")} >Clear Cart</MenuItem>
         <MenuItem onClick={()=>handleClickAMMenu("LOGOUT")} >Logout</MenuItem>
    </Menu>
    ) 
 }
 
}
function showCart()
{
setView(<ViewCart clearCartItems={clearCartItems} CountCartItem={CountCartItem} setViews={setViews}  />)

}

function cartBadges(){
  return(<Box display="flex" color="#fafafa">
  <Box m={1} color="#fafafa">
    <IconButton aria-label="cart" color="#fafafa" onClick={showCart}>
      <StyledBadge1 badgeContent={counter} color='primary'>
        <ShoppingCartIcon color="#fafafa" />
      </StyledBadge1>
    </IconButton>
  </Box> </Box>)
  }
  

function avatarMenu(){
  return(
   <div>
   <Avatar aria-controls="simple-menuAM" aria-haspopup="true" alt="user" src="yuna.png" className={classes.avatar} onClick={handleClickAM}/>
   {check()}
   </div>
 
  )
 
 
 }

 var user_id;
useEffect(()=>{
  readAllRecords() 
  user_id=JSON.parse(localStorage.getItem('USER_ID'))
  CountCartItem()
  
  
  },[])
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="default">
        <Toolbar>
          <div className={classes.sectionMobile}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          </div>
          <Typography variant="h6"><img src='logo.png' style={{height:'55px'}}/></Typography>
          <Typography className={classes.title} variant="h6" noWrap>
       {setMainCategory()}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       
       {setSubCategory()}
       
      </Menu>
          </Typography>
          
          <div style={{paddingRight:"4.1%"}}>{cartBadges()} </div>
          <div className={classes.sectionMobile}>{avatarMenu()}</div>
          <div style={{paddingRight:"4%"}}>{avatarMenu()}</div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {setMainCategory()}
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       
       {setSubCategory()}
       
           </Menu>
        </List>
      </Drawer>
      
      <Toolbar id="back-to-top-anchor" />
      {view}
      
      <br></br>
      <br></br>

 

      <div>
        <Footer/>
      
        </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
