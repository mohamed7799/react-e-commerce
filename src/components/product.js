import {
  Card,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const useStyle = makeStyles({
  root: {
    borderRadius: "10px",
    boxShadow: "0px 0px 10px 0px #0000002e",
    display: "flex",
    flexDirection: "column",
  },
  itemTitle: { display: "flex", justifyContent: "space-between" },
  item__image: {
    height: "250px",
    backgroundSize: "70%",
  },

  addToCard: {
    marginTop: "auto",
    alignSelf: "end",
    justifySelf: "flex-end",
    display: "block",
    transition: ".5s",
    "&:hover": {
      color: "black",
      background: "none",
    },
  },
});

const Product = ({ item, handleAddToCart }) => {
  const classes = useStyle();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.item__image} image={item.media.source} />
      <CardContent>
        <div className={classes.itemTitle}>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {item.price.formatted_with_symbol}
          </Typography>
        </div>

        <Typography
          dangerouslySetInnerHTML={{ __html: item.description }}
          variant="body2"
          color="textSecondary"
          component="p"
        />
      </CardContent>

      <IconButton
        onClick={() => handleAddToCart(item.id, 1)}
        className={classes.addToCard}
      >
        <ShoppingCartIcon />
      </IconButton>
    </Card>
  );
};

export default Product;
