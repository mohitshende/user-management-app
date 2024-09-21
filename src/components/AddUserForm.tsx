import React from "react";
import { Form, Field } from "react-final-form";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { User } from "../types";

interface AddUserFormProps {
  addUser: (user: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ addUser }) => {
  const fetchRandomUser = async (
    setFieldValue: <F extends keyof User>(
      name: F,
      value?: User[F] | undefined
    ) => void
  ) => {
    const { data } = await axios.get(
      "https://random-data-api.com/api/v2/users"
    );
    const newUser: User = {
      username: data.username,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
    };
    setFieldValue("username", newUser.username);
    setFieldValue("firstName", newUser.firstName);
    setFieldValue("lastName", newUser.lastName);
    setFieldValue("email", newUser.email);
  };

  const validate = (values: User) => {
    const errors: Partial<User> = {};
    if (!values.username) errors.username = "Username is required";
    if (!values.firstName) errors.firstName = "First Name is required";
    if (!values.lastName) errors.lastName = "Last Name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  return (
    <Form
      onSubmit={(values, form) => {
        addUser(values as User);
        form.reset();
        // Reset each field after submission
        form.resetFieldState("username");
        form.resetFieldState("firstName");
        form.resetFieldState("lastName");
        form.resetFieldState("email");
      }}
      validate={validate}
      render={({ handleSubmit, form, submitting, hasValidationErrors }) => (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Field name="username">
            {({ input, meta }) => (
              <TextField
                {...input}
                label="Username *"
                aria-label="Username input"
                sx={{ flexGrow: 1 }}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="firstName">
            {({ input, meta }) => (
              <TextField
                {...input}
                label="First Name *"
                aria-label="First name input"
                sx={{ flexGrow: 1 }}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="lastName">
            {({ input, meta }) => (
              <TextField
                {...input}
                label="Last Name *"
                aria-label="Last name input"
                sx={{ flexGrow: 1 }}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="email">
            {({ input, meta }) => (
              <TextField
                {...input}
                label="Email *"
                aria-label="Email input"
                sx={{ flexGrow: 1 }}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            aria-label="Submit new user"
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            disabled={hasValidationErrors || submitting} // Disable if submitting
          >
            Add User
          </Button>
          <Button
            type="button"
            variant="outlined"
            aria-label="Generate new user"
            onClick={() => fetchRandomUser(form.change)}
          >
            Generate
          </Button>
        </Box>
      )}
    />
  );
};

export default AddUserForm;
