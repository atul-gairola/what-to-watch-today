import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useMediaQuery } from "react-responsive";

import { scrollToTop } from "../../../utils";

const useStyles = createUseStyles((theme) => ({
  section: {
    background: theme.color.main,
    color: theme.color.secondary,
    padding: "100px 50px",
    display: "grid",
    justifyItems: "center",
    "& > h2": {
      textAlign: "center",
      marginBottom: 50,
    },
    textAlign: "center",
    "& > p": {
      maxWidth: "50%",
    },
    "&  button": {
      color: theme.color.main,
      background: theme.color.secondary,
      border: "none",
      padding: theme.button.padding,
      borderRadius: theme.button.borderRadius,
      fontWeight: theme.button.fontWeight,
      marginTop: 50,
    },
  },
}));

function InfoSection() {
  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.mobile})`,
  });



  return (
    <section className={classes.section}>
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium
        faucibus facilisis. Nulla finibus dapibus nisi, sed sodales ex pretium
        id. Nullam vel odio vitae justo molestie iaculis ac at tellus. Nullam
        sit amet pulvinar felis, ac elementum dolor. Ut ultrices molestie diam
        et suscipit. Nunc dictum leo ac leo egestas lobortis. Aenean quis urna
        eleifend, consequat erat et, luctus libero. Vivamus et massa lacinia,
        sollicitudin mauris ut, luctus sapien.. Morbi ultricies tortor lacus, et
        consectetur mi tincidunt nec.
      </p>
      <button onClick={scrollToTop}>Alright, let's do this.</button>
    </section>
  );
}

export default InfoSection;
