import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Category from './Category'
import SubCategory from './SubCategory'
import CategoryDisplay from './CategoryDisplay'
import SubcategoryDisplay from './SubcategoryDisplay'
import Product from './Product'
import ProductDisplay from './ProductDisplay'
//import DisplayAllCategories from './DisplayAllCategories'
//import DisplayAllSubCategories from './DisplayAllSubCategories'


export default function mainListItems(props) 
{
    const handleClick=(view)=>{
        props.changeView(view)
    }
    return(
  <div>
    <ListItem button onClick={()=>handleClick(<Category/>)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Category"  />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<SubCategory/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Category" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<Product/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItem>
    <ListItem button onClick={()=>handleClick(<CategoryDisplay/>)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Display Category" />
    </ListItem>
    <ListItem button  onClick={()=>handleClick(<SubcategoryDisplay/>)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display SubCategory" />
    </ListItem>
    <ListItem button  onClick={()=>handleClick(<ProductDisplay/>)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Display Product" />
    </ListItem>
    <ListItem button onClick={()=>handleClick('Logout')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>)

}
