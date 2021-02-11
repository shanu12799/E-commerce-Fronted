import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import Recaptcha from 'react-recaptcha'
import {postData} from '../FetchServices'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserRegitration(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const[verified,setverified]=React.useState(false)
  var callback = function () {
    console.log("captcha succssfully loded")
  };
  var verifyCallback = function (response) {
    setverified(true)
  };


  const RegisterUser=async(data)=>{
    console.log(data)
    if(verified)
    {
                let body={'firstname':data.firstName,
                            'lastname':data.lastName,
                            'email':data.email,
                            'phonenumber':data.phonenumber,
                            'password':data.password,
                            
                }
              let result=await postData('users/addNewRecord',body)
              if(result.RESULT)
                { 
                  alert('registration successfully')
                    props.setViews('USERLOGIN',data.email)
                }
                else{
                  alert(result.error)
                }
    }
    else{
      alert("please verifiy that you are a human")
    }
 }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(RegisterUser)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                inputRef={register({ required: true })}
                autoFocus
              />
              {errors.firstName && errors.firstName.type==="required"&&(
                <p color="red"> First Name is required</p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                inputRef={register({ required: true })}
                autoComplete="lname"
              />
               {errors.lastName && errors.lastName.type==="required"&&(
                <p color="red"> Last Name is required</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                inputRef={register({ required: true,pattern:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/})}
                autoComplete="email"
              />
             
              {errors.email && errors.email.type==="required"&&(
                <p color="red">email is required</p>
              )}
              {errors.email && errors.email.type==="pattern"&&(
                <p color="red">email is invalid</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="phonenumber"
                label="Phone number"
                name="phonenumber"
                autoComplete="number"
                inputRef={register({ required: true,minLength:10,maxLength:10 })}
              />
              {errors.phonenumber && errors.phonenumber.type==="required"&&(
                <p color="red">phonenumber is required</p>
              )}
              {errors.phonenumber && errors.phonenumber.type==="minLength"&&(
                <p color="red">phonenumber should be 10 digit</p>
              )}
              {errors.phonenumber && errors.phonenumber.type==="maxLength"&&(
                <p color="red">phonenumber should be 10 digit</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={register({ required: true,minLength:4 })}
                autoComplete="current-password"
              />
              {errors.password && errors.password.type==="required"&&(
                <p color="red">Password is required</p>
              )}
              {errors.password && errors.password.type==="minLength"&&(
                <p color="red">Password should be more then 4 charcter</p>
              )}
            </Grid>
            <Grid item xs={12}>
            <Recaptcha
                  sitekey="6Lev7fIUAAAAALLTTqMsj0qaGjz65VNuLsZGROVN"
                  render="explicit"
                  onloadCallback={callback}
                  verifyCallback={verifyCallback}
             />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}