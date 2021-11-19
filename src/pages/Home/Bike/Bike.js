import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import useAuth from '../../../hooks/useAuth/useAuth';


const Bike = ({bike, goSingle, }) => {
  const {user} = useAuth();
  const addtocart = product => {
    product.email = user?.email;
    const addCart = [product.id]
    const addedCart = JSON.parse(localStorage.getItem("cart-items"));
    console.log(addedCart)
    if(addedCart){
      const exsist = addedCart.find(exit => exit === product.id);
      
      if(exsist){
        window.alert("Already Added to Cart")
      }
      if(!exsist){
        const newCart = [...addedCart, product.id];
        localStorage.setItem("cart-items", JSON.stringify(newCart));
      }
    }else{
      localStorage.setItem("cart-items", JSON.stringify(addCart));
    }
    // axios.post("http://localhost:5000/addtocart", product)
    // .then(res => {
    //   if(res.status === 200){
    //     window.alert("Product added to cart")
    //     console.log("Already Added")
    //   }else{
    //     window.alert("Product Already added to cart")
    //   }
    // })
  };
  return (
    <>
      <Grid item xs={4} sm={4} md={4} >
      <Card>
      <CardMedia
        component="img"
        height="240"
        image={bike?.img}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {bike?.name}
        </Typography>
        <Typography variant="h6" color="error.main" sx={{ fontWeight: 'bold' }}>
          ${bike?.price}
        </Typography>
        <Rating
         sx={{my:1}}
        name="product-rating"
        value={bike?.ratings}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      </CardContent>
      <CardActions sx={{pb:2}}>
        <Button onClick={()=> goSingle(`/details/${bike?._id}`)} variant="outlined" size="small">Detail</Button>
        <Button onClick={()=> addtocart(bike)} variant="contained" size="small">Add to Cart</Button>
      </CardActions>
    </Card>
      </Grid>
    </>
  );
};

export default Bike;