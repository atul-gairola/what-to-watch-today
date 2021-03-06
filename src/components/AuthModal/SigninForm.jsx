import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useAuth } from "../../contexts/AuthContext";

const useStyles = createUseStyles((theme) => ({
  form: {
    display: "grid",
    gridGap: 20,
    marginTop: 10,
    "& label": {
      color: theme.color.main,
    },
    "& > div": {
      display: "grid",
      gridGap: 5,
    },
  },
  input: {
    borderRadius: "7px 7px 0 0",
    padding: "7px 10px",
    fontSize: "1rem",
    border: "none",
    width: "100%",
    borderBottom: "5px solid rgba(0,0,0,0.5)",
  },
  error: {
    fontSize: ".9rem",
    color: theme.color.error,
  },
  submitButton: {
    padding: theme.button.padding,
    fontSize: "1rem",
    borderRadius: theme.button.borderRadius,
    fontWeight: 600,
    color: theme.color.secondary,
    background: theme.color.main,
    border: "none",
    margin: "40px 0",
  },
}));

function SignInForm({setOpenModal}) {
  const classes = useStyles();
  const theme = useTheme();
  const { login } = useAuth();

  const validateSchema = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please enter your email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Please enter a valid email.";
    }

    if (!values.password) {
      errors.password = "Please enter your password.";
    } else if (values.password.length < 8) {
      errors.password =
        "Your password length should be greater than 8 characters.";
    }

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await login(values.email, values.password);
      return setOpenModal(false);
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
  };

  function ShowError({ msg }) {
    return (
      <div className={classes.error}>
        <span>{msg}</span>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={validateSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors, touched, values }) => {
        return (
          <Form className={classes.form}>
            <div>
              <label>Email</label>
              <Field
                type="email"
                className={classes.input}
                name="email"
                style={
                  errors.email && touched.email
                    ? { borderBottomColor: theme.color.error }
                    : touched.email && {
                        borderBottomColor: theme.color.success,
                      }
                }
                placeholder="Enter your email"
              />
              <ErrorMessage name="email">
                {(msg) => <ShowError msg={msg} />}
              </ErrorMessage>
            </div>
            <div>
              <label>Password</label>
              <Field
                type="password"
                name="password"
                className={classes.input}
                placeholder="Enter your password"
                style={
                  errors.password && touched.password
                    ? { borderBottomColor: theme.color.error }
                    : touched.password && {
                        borderBottomColor: theme.color.success,
                      }
                }
              />
              <ErrorMessage name="password">
                {(msg) => <ShowError msg={msg} />}
              </ErrorMessage>
            </div>
            <button
              type="submit"
              className={classes.submitButton}
              disabled={isSubmitting}
            >
              Login
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignInForm;
