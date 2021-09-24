import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { commerce } from "../../lib/commerce";
import AddressForm from "./addressForm";
import Confirmation from "./confirmation";
import PaymentForm from "./paymentForm";

const steps = ["Shipping address", "Payment details"];

const useStyle = makeStyles({
  root: {
    width: "90%",
    maxWidth: "600px",
    padding: "1.5rem",
    margin: "2rem 0rem",
  },
});

const Checkout = ({ cart, handleEmptyCart }) => {
  //variables
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isDone, setIsDone] = useState(false);
  const classes = useStyle();

  //functions
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  //uesEffects
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch {}
    };
    generateToken();
  }, [cart]);

  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="h4" component="h2">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Confirmation
          setIsDone={setIsDone}
          isDone={isDone}
          shippingData={shippingData}
          handleEmptyCart={handleEmptyCart}
        ></Confirmation>
      ) : activeStep === 0 ? (
        checkoutToken ? (
          <AddressForm next={next} checkoutToken={checkoutToken}></AddressForm>
        ) : (
          <CircularProgress
            style={{ display: "block", margin: "auto" }}
          ></CircularProgress>
        )
      ) : (
        checkoutToken && (
          <PaymentForm
            backStep={backStep}
            nextStep={nextStep}
            checkoutToken={checkoutToken}
          ></PaymentForm>
        )
      )}
    </Paper>
  );
};

export default Checkout;
