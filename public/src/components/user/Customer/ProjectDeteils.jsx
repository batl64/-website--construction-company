import MaterialTable from "material-table";
import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { respons } from "../../../servises";
import "./Customer.css";
import { forwardRef } from "react";
import Message from "../../message/message.jsx";

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
import { withRouter } from "react-router-dom";
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

export class projectDeteils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Status: 0,
      idSend: null,
      infoDetails: null,
    };
  }

  componentDidMount() {
    respons(
      "get",
      "/projectStatus?" +
        new URLSearchParams({ id: this.props.match.params.id })
    ).then((data) => {
      this.setState({ Status: data.Status });
    });

    respons(
      "get",
      "/projectDeteils?" +
        new URLSearchParams({ id: this.props.match.params.id })
    ).then((data) => {
      this.setState({ idSend: data.contractorUserId, infoDetails: data });
    });
  }

  sendCheck = () => {
    respons(
      "put",
      "/projectCkeck",
      JSON.stringify({ id: this.props.match.params.id, status: 1 })
    )
      .then((data) => {
        if (data) {
          this.props.history.push("/userPage");
        }
      })
      .catch((e) => {
        Swal.fire({
          showConfirmButton: true,
          text: this.props.translate("FillInList"),
        });
        console.error(e);
      });
  };
  sendClose = () => {
    respons(
      "put",
      "/projectCkeck",
      JSON.stringify({ id: this.props.match.params.id, status: 4 })
    );
    this.props.history.push("/userPage");
  };

  onRowDelete = (dat) => {
    const body = {
      id: dat.ID,
    };
    respons("delete", "/offeredcontractors", JSON.stringify(body));
  };

  onRowCreateList = (dat) => {
    if (
      dat.ApproximateConstructionEstimate ===
        parseInt(dat.ApproximateConstructionEstimate, 10) &&
      dat.ApproximateConstructionEstimate > 0
    ) {
      respons(
        "post",
        "/listconstructionworks",
        JSON.stringify({ ...dat, pojectId: this.props.match.params.id })
      );
    } else {
      Swal.fire(this.props.translate("errorNumber"));
    }
  };

  onRowDeleteList = (dat) => {
    const body = {
      id: dat.TypeworkID,
    };
    respons("delete", "/typeconstructionworks", JSON.stringify(body));
  };

  onRowUpdateList = (dat) => {
    if (
      dat.ApproximateConstructionEstimate ===
        parseInt(dat.ApproximateConstructionEstimate, 10) &&
      dat.ApproximateConstructionEstimate > 0
    ) {
      respons("put", "/typeconstructionworks", JSON.stringify(dat));
    } else {
      Swal.fire(this.props.translate("errorNumber"));
    }
  };

  onConfirm = (dat) => {
    respons("put", "/projectConfirm", JSON.stringify(dat));
  };

  render() {
    const { translate } = this.props;
    const tableRef = React.createRef();

    const response = (query) => {
      const body = {
        orderDirection: query.orderDirection ? query.orderDirection : "desc",
        orederFild: query.orderBy ? query.orderBy.field : "Project_ID",
        pageSize: query.pageSize ? query.pageSize : 5,
        pageNumber: query.page ? query.page : 0,
        search: query.search ? query.search : "",
        searchFields: [
          "Project_ID",
          "LoginContractor",
          "LoginAdministrator",
          "ContractorSuggestedPrice",
        ],
        pojectId: this.props.match.params.id,
      };

      return new Promise((res, rej) => {
        Promise.all([
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/offeredcontractorsUser?" + new URLSearchParams(body)
              ).then((data) => data)
            );
          }),
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/offeredcontractorsUserPage?" + new URLSearchParams(body)
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

    const responseListWork = (query) => {
      const body = {
        orderDirection: query.orderDirection ? query.orderDirection : "desc",
        orederFild: query.orderBy ? query.orderBy.field : "Project_ID",
        pageSize: query.pageSize ? query.pageSize : 5,
        pageNumber: query.page ? query.page : 0,
        search: query.search ? query.search : "",
        searchFields: [
          "Project_ID",
          "DateCreation",
          "TypeWork",
          "ScopeWork",
          "PlaceConstructionWorks",
          "ApproximateConstructionEstimate",
        ],
        pojectId: this.props.match.params.id,
      };

      return new Promise((res, rej) => {
        Promise.all([
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/listconstructionworksProject?" + new URLSearchParams(body)
              ).then((data) => data)
            );
          }),
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/listconstructionworksProjectPage?" + new URLSearchParams(body)
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
      <div className="users">
        {(this.state.Status == 0 || this.state.Status == 3) && (
          <div className="button-send">
            {this.state.Status == 0 && (
              <button
                className="btn btn-primary check"
                onClick={this.sendCheck}
              >
                {translate("sendToCheck")}
              </button>
            )}
            {this.state.Status == 3 && (
              <button
                className="btn btn-primary check"
                onClick={this.sendClose}
              >
                {translate("sendClose")}
              </button>
            )}
          </div>
        )}
        {this.state.Status == 2 && (
          <div className="m-4">
            <MaterialTable
              icons={tableIcons}
              tableRef={tableRef}
              title={translate("offerredContractor")}
              columns={[
                {
                  title: translate("loginContractor"),
                  field: "LoginContractor",
                  editable: "never",
                  align: "center",
                },
                {
                  title: translate("CustomerEmail"),
                  field: "CustomerEmail",
                  editable: "never",
                  align: "center",
                },
                {
                  title: translate("CustomerPhone"),
                  field: "CustomerPhone",
                  editable: "never",
                  align: "center",
                },
                {
                  title: translate("contractorSuggestedPrice"),
                  field: "ContractorSuggestedPrice",
                  editable: "never",
                  type: "currency",
                  currencySetting: { currencyCode: "UAH" },
                  align: "center",
                },
              ]}
              data={response}
              actions={[
                {
                  icon: tableIcons.Check,
                  tooltip: translate("confirmation"),
                  onClick: (event, rowData) => {
                    new Promise((res, rej) => {
                      this.onConfirm(rowData);
                      tableRef.current.onQueryChange();
                      this.props.history.push("/");
                      res();
                    });
                  },
                },
              ]}
              editable={{
                onRowDelete: (dat) =>
                  new Promise((res, rej) => {
                    this.onRowDelete(dat);
                    tableRef.current.onQueryChange();
                    res();
                  }),
              }}
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
                actionsColumnIndex: -1,
              }}
            />
          </div>
        )}
        <div className="m-4">
          <MaterialTable
            icons={tableIcons}
            tableRef={tableRef}
            title={translate("listWork")}
            columns={[
              {
                title: translate("TypeWork"),
                field: "TypeWork",
                align: "center",
              },
              {
                title: translate("ScopeWork"),
                field: "ScopeWork",
                align: "center",
              },
              {
                title: translate("PlaceConstructionWorks"),
                field: "PlaceConstructionWorks",
                align: "center",
              },
              {
                title: translate("ApproximateConstructionEstimate"),
                field: "ApproximateConstructionEstimate",
                align: "center",
                type: "numeric",
                type: "currency",
                currencySetting: { currencyCode: "UAH" },
              },
            ]}
            data={responseListWork}
            editable={{
              isDeletable: (rowData) => {
                if (this.state.Status > 1) {
                  return false;
                } else {
                  return true;
                }
              },
              isEditable: (rowData) => {
                if (this.state.Status > 1) {
                  return false;
                } else {
                  return true;
                }
              },
              onRowDelete: (dat) =>
                new Promise((res, rej) => {
                  this.onRowDeleteList(dat);
                  tableRef.current.onQueryChange();
                  res();
                }),
              onRowUpdate: (dat) =>
                new Promise((res, rej) => {
                  this.onRowUpdateList(dat);
                  tableRef.current.onQueryChange();
                  res();
                }),
              onRowAdd: (dat) =>
                new Promise((res, rej) => {
                  this.onRowCreateList(dat);
                  tableRef.current.onQueryChange();
                  res();
                }),
            }}
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
              actionsColumnIndex: -1,
            }}
          />
        </div>
        <Message {...this.props} {...this.state} />
      </div>
    );
  }
}

export default withRouter(withTranslate(projectDeteils));
