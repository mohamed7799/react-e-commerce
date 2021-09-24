import {
  InputLabel,
  Select,
  MenuItem,
  Typography,
  makeStyles,
  FormControl,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import FormInput from "./formInput";

const useStyle = makeStyles({
  form: {
    display: "grid",
    gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
    gap: "2rem",
  },
  btns: {
    display: "flex",
    justifyContent: "space-between",
    gridColumn: "1/3",
    "@media (max-width: 600px)": {
      gridColumn: "auto",
    },
  },
});

const AddressForm = ({ checkoutToken, next }) => {
  //variable
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();
  const classes = useStyle();

  //functions
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  //uesEffects
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
          className={classes.form}
        >
          <FormInput required name="firstName" label="First name" />
          <FormInput required name="lastName" label="Last name" />
          <FormInput required name="address1" label="Address line 1" />
          <FormInput required name="email" label="Email" />
          <FormInput required name="city" label="City" />
          <FormInput required name="zip" label="Zip / Postal code" />
          <FormControl>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {Object.entries(shippingCountries)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select
              value={shippingSubdivision}
              fullWidth
              onChange={(e) => setShippingSubdivision(e.target.value)}
            >
              {Object.entries(shippingSubdivisions)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Shipping Option</InputLabel>
            <Select
              value={shippingOption}
              fullWidth
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {shippingOptions
                .map((sO) => ({
                  id: sO.id,
                  label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                }))
                .map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <div className={classes.btns}>
            <Button
              component={Link}
              to="/cart"
              color="secondary"
              variant="contained"
            >
              Back
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
