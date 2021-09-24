import {
  AppBar,
  Typography,
  Container,
  Button,
  Badge,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
const useStyle = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
  },
  cartButton: {
    cursor: "pointer",
    transition: ".5s",
    borderRadius: "unset",
    border: "none",

    background: "none",
    "&:hover": {
      color: "#0000009c",
      background: "none",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

const Navbar = ({ totalItems }) => {
  //variables
  const classes = useStyle();
  return (
    <AppBar position="static" color="inherit">
      <Container className={classes.root} maxWidth="lg">
        <Link className={classes.link} to="/">
          <Typography variant="h4" component="h1">
            E-commerce
          </Typography>
        </Link>

        <Link className={classes.link} to="/cart">
          <Button
            className={classes.cartButton}
            variant="outlined"
            color="inherit"
            endIcon={
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCartIcon></ShoppingCartIcon>
              </Badge>
            }
          >
            Cart
          </Button>
        </Link>
      </Container>
    </AppBar>
  );
};

export default Navbar;
