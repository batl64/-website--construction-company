import React, { Component, useEffect } from "react";
import { withTranslate } from "react-redux-multilingual";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "../../../public/main.css";

export class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="self-align-center">
        <Header {...this.props} />
        <div
          class="About"
          dangerouslySetInnerHTML={{ __html: this.props.setting?.about }}
        ></div>
        <Footer {...this.props} />
      </div>
    );
  }
}
export default withTranslate(About);
