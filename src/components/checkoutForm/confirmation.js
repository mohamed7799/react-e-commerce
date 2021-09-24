import {
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Confirmation = ({ shippingData, setIsDone, handleEmptyCart, isDone }) => {
  //uesEffects
  useEffect(() => {
    setTimeout(() => {
      handleEmptyCart();
      setIsDone(true);
    }, 3000);
  }, []);

  return isDone ? (
    <>
      <Typography variant="h6" gutterBottom>
        {shippingData.firstName + " " + shippingData.lastName} Your purchase is
        done, Thank you for shopping
      </Typography>
      <Divider></Divider>
      <Button
        style={{ marginTop: "1rem" }}
        component={Link}
        to="/"
        color="secondary"
        variant="contained"
      >
        Back to store
      </Button>
    </>
  ) : (
    <CircularProgress
      style={{ display: "block", margin: "auto" }}
    ></CircularProgress>
  );
};

export default Confirmation;
