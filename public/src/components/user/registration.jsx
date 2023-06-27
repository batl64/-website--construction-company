import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import "./registration.css";
import { respons } from "../../servises/index.js";
import { connect } from "react-redux";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import { TextField } from "@material-ui/core";

export class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PIB: "",
      login: "",
      password: "",
      PhoneNumber: "",
      Email: "",
      Role: "customer",
      City: "",
      Region: "",
      checkpassword: "",
      ErrorLogin: false,
      ErrorPassword: false,
      ErrorPIB: false,
      ErrorPhoneNumber: false,
      ErrorLongPhoneNumber: false,
      ErroEmail: false,
      ErrorRegion: false,
      ErrorCity: false,
      ErrorPasswordcheck: false,
      ErrorsLogin: false,
      ErrorsEmail: false,
    };
    this.changeVar = this.changeVar.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let {
      ErrorLogin,
      ErrorPassword,
      ErrorPIB,
      ErrorPhoneNumber,
      ErrorLongPhoneNumber,
      ErrorEmail,
      ErroRole,
      ErrorRegion,
      ErrorCity,
      ErrorPasswordcheck,
    } = this.state;
    this.state.login.length > 0 ? (ErrorLogin = false) : (ErrorLogin = true);
    this.state.password.length > 0
      ? (ErrorPassword = false)
      : (ErrorPassword = true);
    this.state.PIB.length > 0 ? (ErrorPIB = false) : (ErrorPIB = true);
    this.state.PhoneNumber.length > 0
      ? (ErrorPhoneNumber = false)
      : (ErrorPhoneNumber = true);
    this.state.PhoneNumber.length > 3 && this.state.PhoneNumber.length < 13
      ? (ErrorLongPhoneNumber = false)
      : (ErrorLongPhoneNumber = true);
    this.state.Email.length > 0 ? (ErrorEmail = false) : (ErrorEmail = true);
    this.state.Role.length > 0 ? (ErroRole = false) : (ErroRole = true);
    if (this.state.Role === "customer") {
      this.state.Region.length > 0
        ? (ErrorRegion = false)
        : (ErrorRegion = true);
      this.state.City.length > 0 ? (ErrorCity = false) : (ErrorCity = true);
      this.setState({
        ErrorRegion: ErrorRegion,
        ErrorCity: ErrorCity,
      });
    }
    this.state.checkpassword == this.state.password
      ? (ErrorPasswordcheck = false)
      : (ErrorPasswordcheck = true);

    this.setState({
      ErrorLogin: ErrorLogin,
      ErrorPassword: ErrorPassword,
      ErrorPIB: ErrorPIB,
      ErrorPhoneNumber: ErrorPhoneNumber,
      ErrorLongPhoneNumber: ErrorLongPhoneNumber,
      ErrorEmail: ErrorEmail,
      ErroRole: ErroRole,
      ErrorPasswordcheck: ErrorPasswordcheck,
    });

    if (
      !ErrorLogin &&
      !ErrorPassword &&
      !ErrorPIB &&
      !ErrorPhoneNumber &&
      !ErrorLongPhoneNumber &&
      !ErrorEmail &&
      !ErroRole &&
      !ErrorPasswordcheck
    ) {
      if (this.state.Role !== "customer" || (!ErrorRegion && !ErrorCity)) {
        this.Submit();
      }
    }
  }

  Submit() {
    const body = {
      PIB: this.state.PIB,
      Login: this.state.login,
      Password: this.state.password,
      PhoneNumber: this.state.PhoneNumber,
      Email: this.state.Email,
      Role: this.state.Role,
      City: this.state.City,
      Region: this.state.Region,
    };

    respons("post", `/${this.state.Role}`, JSON.stringify(body))
      .then((data) => {
        try {
          if (data) {
            this.props.history.push("/login");
          }
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        console.error(e);
        if (e.message === "user is login") {
          this.setState({
            ErrorsLogin: true,
          });
        }
        if (e.message === "user is email") {
          this.setState({
            ErrorsEmail: true,
          });
        }
      });
  }
  changeVar(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { translate } = this.props;
    const {
      ErrorLogin,
      ErrorPassword,
      ErrorPIB,
      ErrorLongPhoneNumber,
      ErrorEmail,
      ErrorPhoneNumber,
      ErroRole,
      ErrorRegion,
      ErrorCity,
      ErrorPasswordcheck,
      ErrorsLogin,
      ErrorsEmail,
      Role,
    } = this.state;

    if (this.props.isAuth) {
      if (this.props.location.state) {
        this.props.history.push(this.props.location.state.loc);
      } else {
        this.props.history.push("/userPage");
      }
    }
    return (
      <div className="registration-pagee">
        <Header {...this.props} className="header-reg" />
        <div className="registration">
          <div className="form-login rounded border border-dark margin-top back-color">
            <div className="title-registration my-3">
              <span>{translate("registration")}</span>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="py-3">
                <TextField
                  required
                  id="standard-basic"
                  label={translate("PIB")}
                  variant="outlined"
                  type="text"
                  name="PIB"
                  value={this.state.PIB}
                  onChange={this.changeVar}
                  className="form-control"
                />
              </div>
              {ErrorPIB && (
                <span className="text-danger">
                  {translate("error_RequirePIB")}
                </span>
              )}

              <div className="py-3">
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("login")}
                  variant="outlined"
                  type="text"
                  name="login"
                  value={this.login}
                  onChange={this.changeVar}
                  className="form-control"
                />
              </div>
              {ErrorLogin && (
                <span className="text-danger">
                  {translate("error_RequireLogin")}
                </span>
              )}
              {ErrorsLogin && (
                <span className="text-danger">
                  {translate("error_loginexist")}
                </span>
              )}

              <div className="py-3">
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("phoneNumber")}
                  variant="outlined"
                  type="number"
                  name="PhoneNumber"
                  value={this.PhoneNumber}
                  onChange={this.changeVar}
                  className="form-control"
                />
              </div>
              <div className="Error">
                {ErrorPhoneNumber && (
                  <span className="text-danger">
                    {translate("error_RequirePhoneNumber")}
                  </span>
                )}
                {ErrorLongPhoneNumber && (
                  <span className="text-danger">
                    {translate("error_RequireErrorLongPhoneNumber")}
                  </span>
                )}
              </div>

              <div className="py-3">
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("email")}
                  variant="outlined"
                  type="email"
                  name="Email"
                  value={this.Email}
                  onChange={this.changeVar}
                  className="form-control"
                />
              </div>
              {ErrorEmail && (
                <span className="text-danger">
                  {translate("error_RequireEmail")}
                </span>
              )}
              {ErrorsEmail && (
                <span className="text-danger">
                  {translate("error_emailexist")}
                </span>
              )}

              <div className="py-3">
                <span>{translate("role")}</span>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Role"
                    id="Role1"
                    value="customer"
                    onChange={this.changeVar}
                  />
                  <label className="form-check-lable" for="Role1">
                    {translate("customer")}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Role"
                    id="Role2"
                    value="contractor"
                    onChange={this.changeVar}
                  />
                  <label className="" for="Role1">
                    {translate("contractor")}
                  </label>
                </div>
                {ErroRole && (
                  <span className="text-danger">
                    {translate("error_RequireRole")}
                  </span>
                )}
              </div>
              {Role == "customer" && (
                <>
                  <div className="py-3">
                    <TextField
                      required
                      id="outlined-basic"
                      label={translate("region")}
                      variant="outlined"
                      type="text"
                      name="Region"
                      value={this.Region}
                      onChange={this.changeVar}
                      className="form-control"
                    />
                  </div>
                  {ErrorRegion && (
                    <span className="text-danger">
                      {translate("error_RequireRegion")}
                    </span>
                  )}

                  <div className="py-3">
                    <TextField
                      required
                      id="outlined-basic"
                      label={translate("city")}
                      variant="outlined"
                      type="text"
                      name="City"
                      value={this.City}
                      onChange={this.changeVar}
                      className="form-control"
                    />
                  </div>
                  {ErrorCity && (
                    <span className="text-danger">
                      {translate("error_RequireCity")}
                    </span>
                  )}
                </>
              )}
              <div className="py-3">
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("password")}
                  variant="outlined"
                  type="password"
                  name="password"
                  value={this.Password}
                  onChange={this.changeVar}
                  className="form-control"
                />
              </div>
              {ErrorPassword && (
                <span className="text-danger">
                  {translate("error_RequirePassword")}
                </span>
              )}

              <div className="py-3">
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("checkPassword")}
                  variant="outlined"
                  type="password"
                  name="checkpassword"
                  value={this.checkpassword}
                  onChange={this.changeVar}
                  className="form-control"
                />
              </div>
              {ErrorPasswordcheck && (
                <span className="text-danger">
                  {translate("error_RequirePasswordCheck")}
                </span>
              )}

              <input
                type="submit"
                className="btn btn-success my-3 w-100"
                value={translate("registr")}
              />
            </form>
          </div>
        </div>

        <Footer {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  language: state.Intl.locale,
  isAuth: state.user.isAuth,
  login: state.user.login,
});
export default connect(mapStateToProps)(withTranslate(login));
