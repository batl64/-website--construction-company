import React from "react";
import { withTranslate } from "react-redux-multilingual";
import "../../../public/main.css";
import Header from "../../components/header/Header.jsx";

import Footer from "../../components/footer/Footer.jsx";

const MainPage = (props) => {
  const { translate, userData } = props;
  return (
    <div className="main-page">
      <Header {...props} />
      <div className="main">
        <div className="banner-start">
          <img
            src="../../../public/image/backgroundMain.jpg"
            className="image-background"
          />
          <span className="text-image ">
            <h1 className="text-center"> {translate("headerMainFirst")}</h1>
            <h2>{translate("headerMainSecond")}</h2>
            <div className="text-center">
              <a href="/registration" class="btn btn-dark mr-3">
                {translate("ButtonRegister")}
              </a>
              <a href="/registration" class="btn btn-dark text-center">
                {translate("ButtonAboutUs")}
              </a>
            </div>
          </span>
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default withTranslate(MainPage);
