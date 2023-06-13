import React, { Component } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { setUserData, Loguot } from "../../redux/auth-reducer.js";
import { withTranslate } from "react-redux-multilingual";
import "../../../public/main.css";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElUser: null,
      language: "en",
    };
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  componentDidMount = () => {
    this.setState({ language: localStorage.getItem("locale") });
  };
  changeLanguage = (evenet, data) => {
    this.setState({ language: evenet.target.value });
    localStorage.setItem("locale", evenet.target.value);
    this.props.Intl.changelanguage(evenet.target.value);
    location.reload();
  };
  render() {
    const { translate, userData } = this.props;

    const settings = [{ name: "PersonalCabinet", href: "/userPage" }];

    const handleOpenUserMenu = (event) => {
      this.setState({ anchorElUser: event.currentTarget });
    };

    const handleCloseUserMenu = () => {
      this.setState({ anchorElUser: null });
    };

    const Logout = () => {
      this.props.setUserData("", "", "", "", "");
      localStorage.removeItem("tokenn");
      Loguot();
      userData.isAuth = null;
    };
    return (
      <>
        <div
          className={
            "header " + (this.props.className ? this.props.className : "")
          }
        >
          <div className="nav">
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters className="d-flex">
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
                    {this.props?.setting?.nameSite}
                  </Typography>

                  <Box
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                    <nav class="navbar navbar-expand navbar-light">
                      <div class="collapse navbar-collapse">
                        <ul class="navbar-nav">
                          <li class="nav-item">
                            <a class="nav-link text-light" href="/about">
                              {translate("about")}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </Box>
                  <div className="ml-auto mr-3">
                    <select
                      className="form-control h-100 select"
                      value={this.state.language}
                      onChange={this.changeLanguage}
                    >
                      <option value="en">en</option>
                      <option value="ua">ua</option>
                    </select>
                  </div>
                  {userData?.isAuth ? (
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={
                              this.props?.userData?.login
                                ? this.props?.userData?.login
                                : "User"
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={this.state.anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(this.state.anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem
                            key={setting.name}
                            onClick={handleCloseUserMenu}
                          >
                            <Typography
                              textAlign="center"
                              component="a"
                              className="text-dark tab-list"
                              href={setting.href}
                            >
                              {this.props?.setting?.nameSite}
                            </Typography>
                          </MenuItem>
                        ))}
                        <MenuItem
                          key="Logout"
                          onClick={() => {
                            handleCloseUserMenu();
                            Logout();
                          }}
                        >
                          <Typography
                            textAlign="center"
                            className="text-dark tab-list"
                          >
                            {translate("Logout")}
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  ) : (
                    <div className="header-color-text">
                      <div className="registration">
                        <a
                          className="tab-link text-light"
                          href={"/registration"}
                        >
                          {translate("signUp")}
                        </a>
                      </div>
                      <div className="login">
                        <a className="tab-link text-light" href={"/login"}>
                          {translate("signIn")}
                        </a>
                      </div>
                    </div>
                  )}
                </Toolbar>
              </Container>
            </AppBar>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  Intl: state.Intl,
  language: state.Intl.locale,
  isAuth: state.user.isAuth,
});
export default connect(mapStateToProps, { setUserData })(withTranslate(Header));
