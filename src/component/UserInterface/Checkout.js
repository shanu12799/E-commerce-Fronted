import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import {postData} from '../FetchServices'
import PaymentForm from './PaymentForm';
import Review from './Review';
import Badge from '@material-ui/core/Badge';
import otp from 'otp-generator'
import { withStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    // marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    // paddingTop:"80px"
    marginTop:"420px"
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  title2:{
    backgroundColor:'#FFFFFF',
    paddingTop:"20px"
    
},
cart:{
  marginLeft:"1100px",
 //  paddingTop:"20px"
 marginTop:"-12px"
  
},
title1:{
  color:'#000000',
  marginTop:'-17px',
  fontWeight:"bold",
  fontSize:'28px',
  paddingLeft:'18px'
   
},
}));


let  main={
  'firstname':'',
  'lastname':'',
  'address1':'',
  'address2':'',
  'city':'',
  'state':'',
  'country':'',
  'zip':'',
  'cardname':'',
  'cardnumber':'',
  'expdate':'',
  'cvv':''
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm data={main} />;
//     case 1:
//       return <PaymentForm data={main} />;
//     case 2:
//       return <Review data={main}  />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function Checkout(props) {
  const classes = useStyles();
  var v=otp.generate(8, { alphabets:false,upperCase: false, specialChars: false })
  const [activeStep, setActiveStep] = React.useState(0);
  const [cou,setCou]= React.useState(0);
  const addNewRecord=async()=>{
    let body={
    'firstname':main.firstname,
    'lastname':main.lastname,
    'address1':main.address1,
    'address2':main.address2,
    'city':main.city,
    'state':main.state,
    'country':main.country,
    'zip':main.zip,
    'cardname':main.cardname,
    'cardnumber':main.cardnumber,
    'expdate':main.expdate,
    'cvv':main.cvv
    }
    // formData.append('categoryIcon',categoryIcon.file)
    // const config={headers:{'content-type':'multipart/form-data'}}
     var result =await postData('Order/addNewRecord',body)
     if(result)
     {
      setActiveStep(activeStep + 1);
        alert("Record Submitted....")
      
     }
     else
     {
      //  alert("Failed to sumitted....")
      setActiveStep(activeStep + 1);
        alert("Record Submitted....")
        let user_id=JSON.parse(localStorage.getItem('USER_ID'))
        props.clearCartItems(user_id);
        props.CountCartItem(user_id);

     }
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  // const handlePlace = () => {
  //   alert("order palced")
  //   setActiveStep(activeStep + 1);
  // };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm data={main} />;
      case 1:
        return <PaymentForm data={main} />;
      case 2:
        return <Review data={main}  />;
      default:
        throw new Error('Unknown step');
    }
  }


  const handleBack = () => {
    setActiveStep(activeStep - 1);
    // alert(main.firstname)
  };
    
  

  return (
    <React.Fragment>
      <CssBaseline />
     
      <main className={classes.layout}>

        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{v}. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                   {activeStep ===  steps.length-1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addNewRecord}
                    className={classes.button}
                  >Place order
                    {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
                  </Button>
                   ):(<Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >Next
                    {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
                  </Button>)}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}