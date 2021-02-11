import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Copyright() {
  return (
    <Typography variant="body2" color="#FFFFFF"align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  
  item:{
      color:"#FFFFFF"
  },
  title:{
    color:"#FFFFFF"
},
lowerfooter:{
    color:"#FFFFFF"
},
footer: {
      backgroundColor:'#000000',
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


const footers = [
  {
    title: 'Men Clothing',
    description: ['Shirts', 'pants', 'jackets', 'jeans'],
  },
  {
    title: 'Women Clothing',
    description: ['kurti', 'jeans', 'shirt', 'shorts',],
  },
  {
    title: 'travel',
    description: ['Bags'],
  },
  {
    title: 'Kids',
    description: ['jeans'],
  },
];
const UpperFooter = [
    {
      title: 'Customer Service',
      description: ['Contact Us', 'track Order', 'Return order', 'cancel Order'],
    },
    {
      title: 'Company',
      description: ['About Us', 'We are hiring', 'Terms & condition', 'privacy Policy','Blog'],
    },
    {
      title: 'Connect With Us ',
      description: [' Facebook', "Instagram"],
    },
  ];
export default function Pricing() {
  const classes = useStyles();

  return (
      <div style={{backgroundColor:"#FFFFFF"}}>
    <React.Fragment>
      <CssBaseline />
      
      {/* Footer */}
      <Container maxWidth="xl" component="footer" className={classes.footer}>
      <Grid container spacing={4} justify="space-evenly">
          {UpperFooter.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h5"  gutterBottom className={classes.title}>
             {footer.title}
             
              </Typography>
              
              <ul>
              
                {footer.description.map((item) => (
                  <li key={item}>
                    <Typography variant="subtitle1" className={classes.item} color="#FFFFFF">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      <hr></hr>
      <Container maxWidth="xl" style={{marginLeft:45}}>
        <Grid container spacing={10} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h5"  gutterBottom className={classes.title}>
             {footer.title}
             
              </Typography>
              
              <ul>
              
                {footer.description.map((item) => (
                  <li key={item}>
                    <Typography variant="subtitle1" className={classes.item} color="#FFFFFF">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        </Container>
        <br></br>
        <br></br>
        <Grid container maxWidth="xl" spacing={4}  >
            <Typography className={classes.lowerfooter} variant="h5">
                <br></br>
            Avira THE NEW AGE ONLINE SHOPPING EXPERIENCE.
          </Typography>
          <Typography className={classes.lowerfooter} variant="h6">
                <br></br>
                Founded in 2012, Avira is a lifestyle fashion brand that makes creative, distinctive fashion for the trendy, contemporary Indian. Avira was created on the principle of creating impact through innovation, honesty and thoughtfulness.
               <p>
                 With a team of 400 members, and 2mn products sold till date. We like to experiment freely, which allows us to balance creativity and relatability, and our innovative designs. Our range of products is always fresh and up-to-date, and we clock sales of over 1 lakh products a month. Our innovation focus extends to our operations as well. We are vertically integrated, manufacture our own products, and cut out the middleman wherever possible. This direct-to-consumer model allows us to create high-quality fashion at affordable prices. A thoughtful brand, we actively attempt to minimize our environmental footprint and maximize our social impact. These efforts are integrated right into our day-to-day operations, from rainwater harvesting to paper packaging to employee benefits. To create an accessible, affordable and thoughtful experience of online shopping in India.</p>
                 <Typography className={classes.lowerfooter} variant="h5">
                <br></br>
            
                  ONLINE SHOPPING AT Avira IS HASSLE-FREE, CONVENIENT AND SUPER-EXCITING!
          </Typography>
          <p>
Online Shopping has always been a fun and exciting task for most and more so when the shopping mall is none other than your own house. We have all had days when we have planned trips to the clothing store in advance, dreaming about what we would buy once we get there. Now we wouldnt think twice before indulging in some online shopping. Well, cut to todays time and age, you can do all this from the comfort of your home while enjoying many online shopping offers, right from amazing deals and discounts to one of the most robust user interface amongst most online shopping sites in India, with many shopping filters to make your shopping experience truly hassle free. This in our own words is what we call Avira.com.</p>
<p>Avira, THE place to be when it comes to the coolest in online fashion, offers you fine, high-quality merchandise go ahead and indulge in a bit of online shopping for men and womens fashion. So browse through the exciting categories we have on offer from mens fashion to basic mens clothing as well as wide variety in womenswear and womens clothes to the amazing range of accessories, fill up your carts and get fast home delivery for all orders. All of this topped with our exclusive online shopping offers makes for an exciting, irresistible and uber cool combo! You can even gift some to your near and dear ones while being absolutely certain that it will put a smile on their faces.</p>
<Typography className={classes.lowerfooter} variant="h5">
                <br></br>
            
                  
Avira.COM: THE QUIRKIEST ONLINE SHOPPING SITES OF ALL!
          </Typography>
          <p>
Online fashion is definitely more accessible with Avira.com. Explore the latest collections in Marvel t-shirts including avengers t-shirts and captain America t-shirts in official merchandise. Apart from these, quirkiest of T-shirts that you wont find on any online shopping sites in India are showcased at Avira.com. If your wardrobe has been longing for a cool overhaul then Avira.com will certainly be your best bet amongst all online shopping sites. Also, take a tour of our Avira blog to stay abreast with the latest runway trends and be a trendsetter among your immediate circles. What we wear speaks volumes of us they say. But what if what you wore actually spoke what your mood was! Havent we all wondered where we could get those quirky t-shirts and sport them with confidence? Sure otherwise getting them made or even buying them from otherwise expensive online shopping sites for clothes may cost you substantially but with Avira.com, you will understand that you do not have to spend a fortune on online fashion to look great. Sliders, joggers, sweatshirts, bag and bag packs and so much more are just some of the other items you can grab hold of here.</p>

          </Typography>
        </Grid>
        
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
    </div>
  );
}