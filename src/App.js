import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Products from "./components/products/products";
import Cart from "./components/cart/cart";
import { commerce } from "./lib/commerce";
import Checkout from "./components/checkoutForm/checkout";

const useStyle = makeStyles({
  loadingFlag: {
    display: "flex",
    flex: "2.5",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    "& img": {
      display: "block",
      width: "5%",
    },
  },
  section: {
    backgroundColor: "#00000017",
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function App() {
  //variable
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loadingFlag, setLoadingFlag] = useState(true);
  const classes = useStyle();
  //functions
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => setCart(await commerce.cart.retrieve());

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, quantity);
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  //uesEffects
  useEffect(() => {
    fetchProducts().then(() => setLoadingFlag(false));
    fetchCart();
  }, []);

  return (
    <Router>
      <main>
        <Navbar totalItems={cart.total_items}></Navbar>
        <section className={classes.section}>
          <Switch>
            <Route exact path="/">
              {loadingFlag && (
                <div className={classes.loadingFlag}>
                  <img
                    src="https://c.tenor.com/5o2p0tH5LFQAAAAi/hug.gif"
                    alt="loading gif"
                  />
                </div>
              )}
              {products && !loadingFlag && (
                <Products
                  products={products}
                  handleAddToCart={handleAddToCart}
                ></Products>
              )}
            </Route>
            <Route path="/cart">
              <Cart
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleUpdateCart={handleUpdateCart}
                cart={cart}
              ></Cart>
            </Route>

            <Route path="/checkout">
              <Checkout
                handleEmptyCart={handleEmptyCart}
                cart={cart}
              ></Checkout>
            </Route>
          </Switch>
        </section>
      </main>
    </Router>
  );
}

export default App;
