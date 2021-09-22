import { makeStyles, Container } from "@material-ui/core";

import Product from "./product";

const useStyle = makeStyles({
  root: {
    display: "grid",
    gap: "1.5rem",
    justifyContent: "center",
    gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
    padding: "2rem 1rem",
  },
});

const Products = ({ products, handleAddToCart }) => {
  const classes = useStyle();
  return (
    <Container maxWidth="lg" className={classes.root}>
      {products.map((item) => (
        <Product
          handleAddToCart={handleAddToCart}
          key={item.id}
          item={item}
        ></Product>
      ))}
    </Container>
  );
};

export default Products;
