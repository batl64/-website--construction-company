import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { setUserData } from "../../redux/auth-reducer.js";
import Settings from "@material-ui/icons/Settings";
import "./TabBar.css";

export class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
    };
    this.changeLanguage = this.changeLanguage.bind(this);
  }
  changeLanguage = (evenet, data) => {
    this.setState({ language: evenet.target.value });
    localStorage.setItem("locale", evenet.target.value);
    this.props.Intl.changelanguage(evenet.target.value);
  };

  componentDidMount = () => {
    this.setState({ language: localStorage.getItem("locale") });
  };
  render() {
    const { translate } = this.props;

    const Logout = () => {
      this.props.setUserData("", "", "", "", "");
      localStorage.removeItem("tokenn");
      this.props.history.push("/");
    };
    return (
      <div className="tab mx-5 my-4 px-4 border-bottom border-dark tab-user-page">
        <div className="tab-user">
          <div className="user">
            <span>{this.props.user.email}</span>
            <span> {this.props.user.login}</span>
          </div>
          <a href="/userInfo" className="setting-user">
            <Settings />
          </a>
        </div>
        <a className="main-link" href={"/userPage"}>
          {translate("userPages")}
        </a>
        <div className="left language">
          <select
            className="form-control h-100 select"
            value={this.state.language}
            onChange={this.changeLanguage}
          >
            <option value="en">en</option>
            <option value="ua">ua</option>
          </select>
          <a className="btn btn-primary" href="/" onClick={Logout}>
            {translate("logout")}
          </a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  Intl: state.Intl,
  language: state.Intl.locale,
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, { setUserData })(withTranslate(TabBar));
