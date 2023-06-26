import MaterialTable from "material-table";
import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { respons } from "../../../servises";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Deteils from "@material-ui/icons/LibraryAdd";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Deteils: forwardRef((props, ref) => <Deteils {...props} ref={ref} />),
};

export class project extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { translate } = this.props;
    const tableRef = React.createRef();

    const response = (query) => {
      const body = {
        orderDirection: query.orderDirection ? query.orderDirection : "desc",
        orederFild: query.orderBy ? query.orderBy.field : "LoginCustomer",
        pageSize: query.pageSize ? query.pageSize : 5,
        pageNumber: query.page ? query.page : 0,
        search: query.search ? query.search : "",
        searchFields: [
          "LoginCustomer",
          "LoginContactor",
          "LoginAdministrator",
          "CommonApproximateConstructionEstimate",
          "ProjectClosingDate",
          "FullBuldingAdress",
          "Status",
        ],
        id: this.props.getState().user.userId,
      };

      return new Promise((res, rej) => {
        Promise.all([
          new Promise((res, rej) => {
            res(
              respons("get", "/projectCont?" + new URLSearchParams(body)).then(
                (data) => data
              )
            );
          }),
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/projectContPage?" + new URLSearchParams(body)
              ).then((data) => data)
            );
          }),
        ]).then((data) => {
          res({
            data: data[0],
            page: query.page,
            totalCount: data[1][0].pagesNumber,
          });
        });
      });
    };

    return (
      <div className="users m-4">
        <MaterialTable
          icons={tableIcons}
          tableRef={tableRef}
          title={translate("project")}
          columns={[
            {
              title: translate("loginCustomer"),
              field: "LoginCustomer",
              editable: "never",
            },
            {
              title: translate("loginAdmin"),
              field: "LoginAdministrator",
              editable: "never",
            },
            {
              title: translate("EmailAdmin"),
              field: "AdminEmail",
              editable: "never",
            },
            {
              title: translate("CustomerEmail"),
              field: "CustomerEmail",
              editable: "never",
            },
            {
              title: translate("PhoneCustomer"),
              field: "PhoneCustomer",
              editable: "never",
            },
            {
              title: translate("CommonApproximateConstructionEstimate"),
              field: "CommonApproximateConstructionEstimate",
              type: "numeric",
              editable: "never",
              type: "currency",
              currencySetting: { currencyCode: "UAH" },
            },
            {
              title: translate("ProjectClosingDate"),
              field: "ProjectClosingDate",
              editable: "never",
              type: "datetime",
            },
            {
              title: translate("FullBuldingAdress"),
              field: "FullBuldingAdress",
              editable: "never",
            },
            {
              title: translate("Status"),
              field: "Status",
              lookup: {
                0: translate("settingProject"),
                1: translate("waitCheck"),
                2: translate("seachContractor"),
                3: translate("bulding"),
                4: translate("waitClosing"),
                5: translate("projectClosing"),
              },
            },
          ]}
          data={response}
          actions={[
            {
              icon: tableIcons.Deteils,
              tooltip: translate("Deteils"),
              onClick: (event, rowData) => {
                this.props.history.push(`Deteils/${rowData.ID}`);
              },
            },
          ]}
          localization={{
            body: {
              addTooltip: translate("addTooltip"),
              editTooltip: translate("editTooltip"),
              deleteTooltip: translate("deleteTooltip"),
              editRow: {
                deleteText: translate("deleteText"),
                cancelTooltip: translate("deleteTooltipDelete"),
                saveTooltip: translate("saveTooltip"),
              },
            },
            header: {
              actions: translate("actions"),
            },
            pagination: {
              firstTooltip: translate("firstTooltip"),
              lastTooltip: translate("lastTooltip"),
              nextTooltip: translate("nextTooltip"),
              previousTooltip: translate("previousTooltip"),
            },
            toolbar: {
              exportTitle: translate("export"),
              searchTooltip: translate("search"),
              searchPlaceholder: translate("search"),
            },
          }}
          options={{
            sorting: true,
            search: true,
            exportButton: true,
            actionsColumnIndex: -1,
          }}
        />
      </div>
    );
  }
}

export default withTranslate(project);
