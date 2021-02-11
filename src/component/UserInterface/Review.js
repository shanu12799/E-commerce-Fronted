  
import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {postData} from '../FetchServices'
// import PaymentForm from './PaymentForm'
// import AddressForm from './AddressForm';


const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));
const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function priceRow(qty, unit) {
  return qty * unit;
} 

function createRow(id,key,desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { id,key,desc, qty, unit, price };
  }
  


export default function Review(props) {
  const classes = useStyles();
  const [getlist,setList]=React.useState([])

  let rows=readRowsForCart()
  function readRowsForCart()
{
    let rows=[]
  for(let i=0;i<getlist.length;i++)
  {
     
       let row=createRow(getlist[i].userid,getlist[i].cartid,getlist[i].itemname,getlist[i].quantity,getlist[i].itemprice)
       rows.push(row)
  }
  return rows
}


const readAllRecords=async(rec)=>{

    let body={
      'userid':rec
    }
    var list=await postData('cart/displaybyid',body) 
    if(list)
    {
        setList(list)
    }
    else{
      alert("network problem")
    }  
    }
    let rec;

useEffect(()=>{
    rec=JSON.parse(localStorage.getItem('USER_ID'))
    readAllRecords(rec)
  
   },[]) 

  const invoiceSubtotal = subtotal(readRowsForCart());
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  // let products=readRowsForCart()
   const addresses = [props.data.address1,props.data.city,props.data.state, props.data.zip, props.data.country];
  const payments = [
    { name: 'Card type', detail: 'VISA' },
    { name: 'Card holder', detail:props.data.firstname },
    { name: 'Card number', detail:props.data.cardnumber },
    { name: 'Expiry date', detail:props.data.expdate },
  ];


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {rows.map(row => (
          <ListItem className={classes.listItem} key={row.key}>
            <ListItemText primary={row.desc}  />
            <Typography variant="body2">{row.price}/-</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
          {ccyFormat(invoiceTotal)}/-
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{props.data.firstname} {props.data.lastname}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}