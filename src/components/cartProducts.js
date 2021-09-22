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
const CartProduct = ({ item }) => {
  const classes = useStyle();
  return (
    <Card>
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
        <div className={classes.btns}>
          <div className={classes.quantityBtns}>
            <Button>-</Button>
            <Typography variant="body2">{item.quantity}</Typography>
            <Button>+</Button>
          </div>
          <Button color="secondary" variant="contained">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartProduct;
