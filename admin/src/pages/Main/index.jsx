import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { withTranslate } from "react-redux-multilingual";
const Users = React.lazy(() => import("../../components/getinfo/users.jsx"));
const Administrator = React.lazy(() =>
  import("../../components/getinfo/administrator.jsx")
);
const Contractor = React.lazy(() =>
  import("../../components/getinfo/contractor.jsx")
);
const Customer = React.lazy(() =>
  import("../../components/getinfo/customer.jsx")
);
const Project = React.lazy(() =>
  import("../../components/getinfo/project.jsx")
);
const Setting = React.lazy(() =>
  import("../../components/setting/setting.jsx")
);

const MainPage = (props) => {
  const { translate } = props;
  return (
    <div className="main-page">
      <Tabs
        variant="pills"
        defaultActiveKey="users"
        id="admin-tab"
        className="mb-3"
        justify
        {...props}
      >
        <Tab eventKey="users" title={translate("users")}>
          <Users {...props} />
        </Tab>
        <Tab eventKey="administrator" title={translate("administrator")}>
          <Administrator {...props} />
        </Tab>
        <Tab eventKey="contractor" title={translate("contractor")}>
          <Contractor {...props} />
        </Tab>
        <Tab eventKey="customer" title={translate("customer")}>
          <Customer {...props} />
        </Tab>
        <Tab eventKey="project" title={translate("project")}>
          <Project {...props} />
        </Tab>

        <Tab eventKey="setting" title={translate("setting")}>
          <Setting {...props} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default withTranslate(MainPage);
