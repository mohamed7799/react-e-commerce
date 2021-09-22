import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Products from "./components/products";
import Cart from "./components/cart";
import { commerce } from "./lib/commerce";

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
  },
});

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loadingFlag, setLoadingFlag] = useState(true);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => setCart(await commerce.cart.retrieve());

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    //commerce.cart.empty().then((response) => console.log(response));
    fetchProducts().then(() => setLoadingFlag(false));
    fetchCart();
  }, []);

  const classes = useStyle();

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
              <Cart cart={cart}></Cart>
            </Route>
          </Switch>
        </section>
      </main>
    </Router>
  );
}

export default App;
