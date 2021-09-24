import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyle = makeStyles({
  btns: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
});

const PaymentForm = ({ checkoutToken, backStep, nextStep }) => {
  //variable
  const classes = useStyle();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summery
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="subtitle2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
      <Divider></Divider>
      <div className={classes.btns}>
        <Button onClick={backStep} color="secondary" variant="contained">
          Back
        </Button>
        <Button onClick={nextStep} color="primary" variant="contained">
          Pay
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;
