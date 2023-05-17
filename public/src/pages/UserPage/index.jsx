import React from "react";
import { withTranslate } from "react-redux-multilingual";

const NotConfirmed = React.lazy(() => import("../Errors/NotConfirmed.jsx"));
const UserPageContractor = React.lazy(() =>
  import("../../components/user/Contractor/userPageContractor.jsx")
);
const UserPageCustomer = React.lazy(() =>
  import("../../components/user/Customer/UserPageCustomer.jsx")
);

const UserPage = (props) => {
  const { translate } = props;

  return (
    <div className="main-page">
      {props.getState().user.role === "contractor" && (
        <>
          {props.getState().user.confirm == 1 ? (
            <>
              <UserPageContractor {...props} />
            </>
          ) : (
            <>
              <NotConfirmed />
            </>
          )}
        </>
      )}
      {props.getState().user.role === "customer" && (
        <>
          <UserPageCustomer {...props} />
        </>
      )}
    </div>
  );
};

export default withTranslate(UserPage);
