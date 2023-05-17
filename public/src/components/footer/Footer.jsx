import React from "react";

import { withTranslate } from "react-redux-multilingual";
import { Typography } from "@material-ui/core";
const Footer = (props) => {
  const { translate, userData } = props;

  return (
    <div className="footer d-flex justify-content-center mt-4 footer-border-top">
      <Typography
        variant="h6"
        noWrap
        className="self-align-center"
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
      <nav class="navbar navbar-expand navbar-light">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withTranslate(Footer);
