import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm(props) {
  const[cardname,setcardname]=React.useState('')
  const[cardnumber,setcardnumber]=React.useState('')
  const[expdate,setexpdate]=React.useState('')
  const[cvv,setcvv]=React.useState('')
  const[data,setData]=React.useState([])
  // let Payment={
  //        'cardname':'',
  //        'cardnumber':'',
  //        'expdate':'',
  //        'cvv':''
  //       }


React.useEffect(()=>{
  setData(props.data)
},[])    


const setcardn=(event)=>{
  setcardname(event.target.value)
  data.cardname=event.target.value
  // console.log('data: ',data.firstname)
}

const setcardnum=(event)=>{
  setcardnumber(event.target.value)
  data.cardnumber=event.target.value
  // console.log('data: ',data.firstname)
}

const setex=(event)=>{
  setexpdate(event.target.value)
  data.expdate=event.target.value
  // console.log('data: ',data.firstname)
}

const setcv=(event)=>{
  setcvv(event.target.value)
  data.cvv=event.target.value
  // console.log('data: ',data.firstname)
}


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" value={cardname}  onChange={(event)=>setcardn(event)} label="Name on card" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" value={cardnumber}  onChange={(event)=>setcardnum(event)} label="Card number" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" value={expdate}  onChange={(event)=>setex(event)} label="Expiry date" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            value={cvv}
            onChange={(event)=>setcv(event)}
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}