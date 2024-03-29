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
import Swal from "sweetalert2";

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

export class OpenProject extends Component {
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
              respons(
                "get",
                "/getprojectBySearchContractor?" + new URLSearchParams(body)
              ).then((data) => data)
            );
          }),
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/getprojectBySearchContractorPage?" + new URLSearchParams(body)
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
          ]}
          actions={[
            {
              icon: tableIcons.Check,
              tooltip: translate("offer"),
              onClick: (event, rowData) => {
                Swal.mixin({
                  confirmButtonText: translate("next"),
                  showCancelButton: true,
                  progressSteps: ["1", "2"],
                })
                  .queue([
                    {
                      title: translate("priceYou"),
                      input: "number",
                      text: translate("ApproximateConstructionEstimateOffered"),
                      showCancelButton: true,
                      inputValidator: (value) => {
                        if (
                          rowData.CommonApproximateConstructionEstimate < value
                        ) {
                          return translate("more");
                        }
                      },
                    },

                    {
                      input: "text",
                      title: translate("comentYou"),
                      text: translate("coment"),
                      showCancelButton: true,
                      inputValidator: (value) => {
                        if (!value) {
                          return "Поле не може бути порожнім!";
                        }
                      },
                    },
                  ])
                  .then((data) => {
                    const body = {
                      Project_ID: rowData.ID,
                      User_ID: this.props.getState().user.userId,
                      ContractorSuggestedPrice: data.value[0],
                      description: data.value[1],
                    };
                    respons(
                      "post",
                      "/offeredcontractors",
                      JSON.stringify(body)
                    );
                    tableRef.current.onQueryChange();
                    window.location.reload();
                  });
              },
            },
            {
              icon: tableIcons.Deteils,
              tooltip: translate("Deteils"),
              onClick: (event, rowData) => {
                this.props.history.push(`Deteils/${rowData.ID}`);
              },
            },
          ]}
          data={response}
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

export default withTranslate(OpenProject);
