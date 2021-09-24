import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();
  return (
    <Controller
      render={({ field }) => (
        <TextField {...field} label={label} required={required} />
      )}
      control={control}
      name={name}
      defaultValue=""
    />
  );
};

export default FormInput;
