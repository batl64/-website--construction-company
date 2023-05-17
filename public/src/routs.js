import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { __RouterContext as RouterContext } from "react-router-dom";
import { RouterToUrlQuery } from "react-url-query";
import { withRouter, Redirect } from "react-router-dom";
//redux
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {
  IntlReducer as Intl,
  IntlProvider,
  IntlActions,
} from "react-redux-multilingual";
import { Provider } from "react-redux";
import authRedux from "./redux/auth-reducer.js";
import LinearProgress from "@material-ui/core/LinearProgress";
import translete from "./translate.js";
import OpenProjectDetails from "./components/user/Contractor/OpenProjectDetails.jsx";

const Registration = React.lazy(() =>
  import("./components/user/registration.jsx")
);
const Login = React.lazy(() => import("./components/user/login.jsx"));
const Tab = React.lazy(() => import("./components/tab/TabBar.jsx"));
const MainPage = React.lazy(() => import("./pages/Main/index.jsx"));
const About = React.lazy(() => import("./pages/About/index.jsx"));
const UserPage = React.lazy(() => import("./pages/UserPage/index.jsx"));
const ProjectDeteils = React.lazy(() =>
  import("./components/user/Customer/ProjectDeteils.jsx")
);
const NotFound = React.lazy(() => import("./pages/Errors/NotFound.jsx"));
import { respons } from "./servises";

class Routs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: { nameSite: "", about: "" },
    };
    let mainTranslations = Object.assign({}, translete);
    const reducers = combineReducers(
      Object.assign({}, { Intl }, { user: authRedux })
    );

    const changelanguage = (language) => {
      store.dispatch(IntlActions.setLocale(language));
    };
    let language = "en";

    if (
      localStorage.getItem("locale") !== "undefined" &&
      localStorage.getItem("locale") !== null
    ) {
      language = localStorage.getItem("locale");
    }

    const store = createStore(reducers, {
      user: this.props.userData,
      Intl: {
        locale: language,
        changelanguage: changelanguage,
      },
    });

    this.state = {
      mainTranslations,
      store,
      language,
    };
  }
  componentDidMount = async () => {
    (async () => {
      let lan = "en";
      if (
        localStorage.getItem("locale") !== "undefined" &&
        localStorage.getItem("locale") !== null
      ) {
        lan = localStorage.getItem("locale");
      }
      const [result] = await Promise.all([
        respons(
          "get",
          "/setting?" + new URLSearchParams({ language: lan })
        ).then((data) => data),
      ]);

      this.setState({
        setting: {
          nameSite: result[0].siteName,
          about: result[0].about,
        },
      });
    })();
  };
  render() {
    const { mainTranslations, store } = this.state;

    return (
      <Provider store={store}>
        <IntlProvider translations={mainTranslations}>
          <RouterToUrlQuery routerContext={RouterContext}>
            <Suspense fallback={<LinearProgress />}>
              <Switch>
                <Route
                  exact
                  path={"/login"}
                  render={() => <Login {...this.props} />}
                />
                <Route
                  exact
                  path={"/registration"}
                  render={() => <Registration {...this.props} />}
                />
                <Route
                  exact
                  path={"/about"}
                  render={() => (
                    <About {...store} {...this.props} {...this.state} />
                  )}
                />
                <Route
                  exact
                  path={"/"}
                  render={(props) => <MainPage {...store} {...this.props} />}
                />
                {store.getState().user.isAuth ? (
                  <>
                    <Tab {...store.getState()} />
                    <Route
                      exact
                      path={"/userPage"}
                      render={(props) => (
                        <UserPage {...store} {...this.props} />
                      )}
                    />
                    <Route
                      exact
                      path={"/projectDeteils/:id"}
                      render={(props) => (
                        <ProjectDeteils {...store} {...this.props} />
                      )}
                    />
                    <Route
                      exact
                      path={"/Deteils/:id"}
                      render={(props) => (
                        <OpenProjectDetails {...store} {...this.props} />
                      )}
                    />
                  </>
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { loc: this.props.location },
                    }}
                  />
                )}
              </Switch>
            </Suspense>
          </RouterToUrlQuery>
        </IntlProvider>
      </Provider>
    );
  }
}

export default withRouter(Routs);
