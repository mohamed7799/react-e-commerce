import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import CartProduct from "./cartProducts";

const useStyle = makeStyles({
  root: {
    padding: "2rem 1rem",
  },
  cartItems: {
    display: "grid",
    gap: "1.5rem",
    justifyContent: "center",
    gridTemplateColumns: "repeat( auto-fit, minmax(250px, 350px) )",
    padding: "2rem 1rem",
  },
  cartDetailes: {
    marginTop: "1rem",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
    "@media (max-width: 600px)": {
      justifyContent: "center",
    },
  },
  subtotal: {
    marginRight: "auto",
    "@media (max-width: 600px)": {
      margin: "0",
      width: "100%",
      textAlign: "center",
    },
  },
});

const Cart = ({ cart }) => {
  const classes = useStyle();
  return (
    <Container className={classes.root} maxWidth="md">
      <Typography variant="h4" component="h2">
        Your Shopping Cart
      </Typography>
      <div className={classes.cartDetailes}>
        <Typography className={classes.subtotal} variant="h5">
          SubTotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <Button variant="contained" color="secondary">
          Clear Cart
        </Button>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </div>
      <section className={classes.cartItems}>
        {cart.line_items.map((item) => (
          <CartProduct key={item.id} item={item}></CartProduct>
        ))}
      </section>
    </Container>
  );
};

export default Cart;
