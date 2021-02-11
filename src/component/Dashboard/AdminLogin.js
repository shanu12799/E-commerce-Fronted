import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {postData} from '../FetchServices'
import { useForm } from 'react-hook-form';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminLogin(props) {
  const classes = useStyles();
   const { register, handleSubmit, errors } = useForm();
   const checkLogin=async(data)=>{
     console.log(data)
     let body={'adminid':data.email,
                'password':data.password  
    }
   let result=await postData('admin/checkadminlogin',body)
   //alert (result.RESULT)
   if(result.RESULT)
   { 
     console.log(result)
     localStorage.setItem('ADMIN',JSON.stringify(result.RESULT))
     props.history.replace({pathname:'/Dashboard'})
   }
   else{
      alert(result.msg)
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
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(checkLogin)}>
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            id="email"
            label="Admin"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true })}
          />
          {errors.email && <div>email is required</div>}
          <TextField
            variant="outlined"
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
          />
          {errors.password && <div>password is required</div>}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            // onClick={checkLogin}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          </form>
        
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}