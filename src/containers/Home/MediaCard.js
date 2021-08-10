import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { clientContext } from '../../contexts/ClientContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media:{
      backgroundSize:'contain'
  }
});

export default function ImgMediaCard({product}) {
  const classes = useStyles();
  const {addAndDeleteProductInCart,checkProductInCart} = useContext(clientContext)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={product.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
                {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <Typography gutterBottom component="h4">
                {product.price} som
          </Typography>
        <Button variant="contained" color="primary">
          Buy
        </Button>
        <IconButton variant="contained" color={checkProductInCart(product.id) ? "secondary" : 'primary'} onClick={() => addAndDeleteProductInCart(product)}>
            <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}
