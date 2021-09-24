import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item__image: {
    height: "250px",
    backgroundSize: "70%",
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityBtns: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      fontSize: "1.2rem",
    },
  },
});
const CartProduct = ({ item, handleUpdateCart, handleRemoveFromCart }) => {
  //variables
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
            {item.line_total.formatted_with_symbol}
          </Typography>
        </div>
        <div className={classes.btns}>
          <div className={classes.quantityBtns}>
            <Button
              onClick={() =>
                handleUpdateCart(item.id, { quantity: --item.quantity })
              }
            >
              -
            </Button>
            <Typography variant="body2">{item.quantity}</Typography>
            <Button
              onClick={() =>
                handleUpdateCart(item.id, { quantity: ++item.quantity })
              }
            >
              +
            </Button>
          </div>
          <Button
            onClick={() => handleRemoveFromCart(item.id)}
            color="secondary"
            variant="contained"
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartProduct;
