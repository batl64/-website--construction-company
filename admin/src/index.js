import React, { Suspense } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { respons } from "./servises/index.js";

import "../public/main.css";
const Routs = React.lazy(() => import("./routs.js"));
const NotFound = React.lazy(() => import("./pages/Errors/NotFound.jsx"));
import LinearProgress from "@material-ui/core/LinearProgress";
import "bootstrap/dist/css/bootstrap.css";

class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {
        userId: "",
        email: "",
        login: "",
        role: "",
        isAuth: false,
      },
      load: true,
    };

    const body = {
      token: localStorage.getItem("tokenn"),
    };
    this.setState({ load: true });
    (async () => {
      const data = await respons("post", "/auth", JSON.stringify(body));
      this.setState({
        userData: {
          userId: data.userId,
          email: data.email,
          login: data.login,
          role: data.role,
          isAuth: true,
        },
        load: false,
      });
    })();
  }

  render() {
    return (
      <div
        className="mx-auto d-flex flex-column backgrond-main"
        id="root-children-container"
      >
        <Suspense fallback={<LinearProgress />}>
          {this.state.load ? (
            <LinearProgress />
          ) : (
            <>
              <Routs userData={this.state.userData} />
            </>
          )}
        </Suspense>
      </div>
    );
  }
}

render(
  <BrowserRouter>
    <Route path={"/"}>{withRouter(Root)}</Route>
  </BrowserRouter>,
  document.getElementById("root")
);
