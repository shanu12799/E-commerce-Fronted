

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm(props) {
  
  const [firstname,setfirstname]=React.useState('')
  const [lastname,setlastname]=React.useState('')
  const [address1,setaddress1]=React.useState('')
  const[address2,setaddress2]=React.useState('')
  const[city,setcity]=React.useState('')
  const[state,setstate]=React.useState('')
  const[country,setcountry]=React.useState('')
  const[zip,setzip]=React.useState('')
  const[data,setData]=React.useState([])

  // let Address={
  //       'firstname':firstname,
  //       'lastname':lastname,
  //       'address1':address1,
  //       'address2':address2,
  //       'city':city,
  //       'state':state,
  //       'country':country,
  //       'zip':zip
  //     }

React.useEffect(()=>{
   setData(props.data)
   
  },[])

  const setfirst=(event)=>{
    setfirstname(event.target.value)
    data.firstname=event.target.value
    // console.log('data: ',data.firstname)
  }
  const setlast=(event)=>{
    setlastname(event.target.value)
    data.lastname=event.target.value
    // console.log('data: ',data.firstname)
  }
  const setadd1=(event)=>{
    setaddress1(event.target.value)
    data.address1=event.target.value
    // console.log('data: ',data.firstname)
  }
  const setadd2=(event)=>{
    setaddress2(event.target.value)
    data.address2=event.target.value
    // console.log('data: ',data.firstname)
  }
  const setcy=(event)=>{
    setcity(event.target.value)
    data.city=event.target.value
    // console.log('data: ',data.firstname)
  }
  const setst=(event)=>{
    setstate(event.target.value)
    data.state=event.target.value
    // console.log('data: ',data.firstname)
  }
  const setcou=(event)=>{
    setcountry(event.target.value)
    data.country=event.target.value
    // console.log('data: ',data.firstname)
  }
  const setz=(event)=>{
    setzip(event.target.value)
    data.zip=event.target.value
    // console.log('data: ',data.firstname)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={firstname}
            onChange={(event)=>setfirst(event)}
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            value={lastname}
            onChange={(event)=>setlast(event)}
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            value={address1}
            onChange={(event)=>setadd1(event)}
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            value={address2}
            onChange={(event)=>setadd2(event)}
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            value={city}
            onChange={(event)=>setcy(event)}
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth 
          onChange={(event)=>setst(event)}
          value={state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            value={zip}
            onChange={(event)=>setz(event)}
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={country}
            onChange={(event)=>setcou(event)}
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}