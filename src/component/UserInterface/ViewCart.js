import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {postData} from '../FetchServices'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import StripeCheckout from 'react-stripe-checkout'
import{ toast }from 'react-toastify'



const TAX_RATE = 0.07;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id,key,desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { id,key,desc, qty, unit, price };
}


function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

toast.configure();

export default function ViewCart(props) {
  toast.configure();
  const classes = useStyles();
  const [getlist,setList]=React.useState([])
  // const [cou,setCou]=React.useState([])
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
const handleRemove=async(key,id)=>{
    let body={
        'userid':id,
        'cartid':key
        
      }
      var result=await postData('cart/deletebyid',body)
      if(result.RESULT)
      {
          alert("item deleted successfully")
          readAllRecords(id)
         props.CountCartItem(id);
      } 
      else
      {
          alert("error")
      }
  
  }
  async function handelToken(token){
    // console.log({token,addresses})
    var result=await postData('cart/checkout',{token,invoiceTotal})
    // const {status}=result.status
    if(result.status){
      alert('sucess! check emails for details')
      let user_id=JSON.parse(localStorage.getItem('USER_ID'))
        props.clearCartItems(user_id);
        window.location.reload(false);
    }
    else{
      alert("oppps something wrong")
    }


  }
  const handleAdd=async(key,id)=>{
    let body={
        'userid':id,
        'cartid':key
        
      }
      var result=await postData('cart/checkquantity',body)
      if(result)
      {
        //   alert(result.RESULT[0].quantity)
          var qty =result.RESULT[0].quantity
          var q=parseInt(qty)+1;
          let body={
            'userid':id,
            'cartid':key,
            'quantity':q
            
          }
          var result=await postData('cart/Addbyid',body)
          if(result){  
          readAllRecords(id)
          }
          else{
              alert("fail")
          }

      } 
      else
      {
          alert("error")
      }
  
  }
  const handleSub=async(key,id)=>{
    
    let body={
        'userid':id,
        'cartid':key
        
      }
      var result=await postData('cart/checkquantity',body)
      if(result.RESULT)
      {
        var qty =result.RESULT[0].quantity
        if(qty<2)
        {
            alert("you can remove this item")
            return
        }
        var q=parseInt(qty)-1;
        alert(q)
        let body={
          'userid':id,
          'cartid':key,
          'quantity':q
          
        }
        var result=await postData('cart/Subtractbyid',body)
        if(result){
        alert("successful")    
        readAllRecords(id)
        }
        else{
            alert("fail")
        }

      } 
      else
      {
          alert("error")
      }
  
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
function handleShopping()
{
 props.setViews("CATEGORYALL",) 
}
  function handlePayment(){
  props.setViews("PAYMENT",)
  
  }
  return (
    (rows.length!=0)?(
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Edit</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Qty.</TableCell>
            <TableCell align="center">@</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.desc} >

            
              <TableCell><DeleteIcon onClick={()=>handleRemove(row.key,row.id)}/></TableCell> 
              <TableCell align="center">{row.desc}</TableCell>
              <TableCell align="center"><AddIcon onClick={()=>handleAdd(row.key,row.id)}/>{row.qty}<RemoveIcon onClick={()=>handleSub(row.key,row.id)}/></TableCell>
             
              <TableCell align="center">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <div>
    <br></br><br></br><br></br>
        <center>
    <Button variant="contained"  onClick={handleShopping} color="primary" className={classes.button}>
    Continue Shopping...
   </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   // <Button variant="contained" color="secondary"  onClick={handlePayment} className={classes.button}>
   // Proceed To Payment...
   // </Button>
    <StripeCheckout
   stripeKey="pk_test_IVU1pdNtHRVOAqi6sWJBmH4x00yKhYD2uE"
   token={handelToken}
   billingAddress
   shippingAddress
   amount={ccyFormat(invoiceTotal)}
   /> 
   </center>
   </div>
   </div>
   ):
   (<div>   <Button variant="contained"  onClick={handleShopping} color="primary" className={classes.button}>
   Continue Shopping...
  </Button>
   Cart is Empty</div>
   )
  );
}