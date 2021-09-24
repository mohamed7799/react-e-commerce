import { Container, Typography, makeStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartProduct from "./cartProducts";

const useStyle = makeStyles({
  root: {
    padding: "2rem 1rem",
  },
  cartItems: {
    display: "grid",
    gap: "1.5rem",
    justifyContent: "center",
    gridTemplateColumns: "repeat( auto-fit, minmax(250px, 280px) )",
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

const Cart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCart,
}) => {
  //variables
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
        <Button onClick={handleEmptyCart} variant="contained" color="secondary">
          Clear Cart
        </Button>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
      </div>
      {cart.line_items.length ? (
        <section className={classes.cartItems}>
          {cart.line_items.map((item) => (
            <CartProduct
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCart={handleUpdateCart}
              key={item.id}
              item={item}
            ></CartProduct>
          ))}
        </section>
      ) : (
        <Typography
          style={{ marginTop: "1rem" }}
          variant="h6"
          color="textSecondary"
        >
          Your cart is empty go to the main page and start adding items
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
