import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  form: {
    display: "grid",
  },
});

function SignInForm() {
  const classes = useStyles();
  return (
    <form action="" id="signin-form" className={classes.form}>
      <input type="text" placeholder="Enter your email" />
      <input type="text" placeholder="Enter your password" />
      <button>Signin</button>
    </form>
  );
}

export default SignInForm;
