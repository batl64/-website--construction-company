import MaterialTable from "material-table";
import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { respons } from "../../servises";
import { Tab, Tabs } from "react-bootstrap";
import { forwardRef } from "react";
import "./index.css";

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
import Report from "../pdf/pdfReport.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
      load: true,
      idSend: null,
      infoDetails: null,
      statusText: {
        0: this.props.translate("settingProject"),
        1: this.props.translate("waitCheck"),
        2: this.props.translate("seachContractor"),
        3: this.props.translate("bulding"),
        4: this.props.translate("waitClosing"),
        5: this.props.translate("projectClosing"),
      },
    };
  }

  async componentDidMount() {
    await respons(
      "get",
      "/projectStatus?" +
        new URLSearchParams({ id: this.props.match.params.id })
    ).then((data) => {
      this.setState({ Status: data.Status });
    });

    await respons(
      "get",
      "/projectDeteils?" +
        new URLSearchParams({ id: this.props.match.params.id })
    ).then((data) => {
      this.setState({ idSend: data.contractorUserId, infoDetails: data });
    });
    this.setState({ load: false });
  }

  onRowDelete = (dat) => {
    const body = {
      id: dat.Id,
    };
    respons("delete", "/offeredcontractors", JSON.stringify(body));
  };

  onRowUpdate = (dat) => {
    respons("put", "/offeredcontractors", JSON.stringify(dat));
  };

  ToCheck = () => {
    respons(
      "put",
      "/project",
      JSON.stringify({
        ID: this.props.match.params.id,
        Status: 2,
        idAdmin: this.props.userData.userId,
      })
    ).then((data) => {
      this.props.history.push("/");
    });
  };
  Close = () => {
    respons(
      "put",
      "/project",
      JSON.stringify({
        ID: this.props.match.params.id,
        Status: 5,
        idAdmin: this.props.userData.userId,
      })
    );
    this.props.history.push("/");
  };

  ToBack = () => {
    respons(
      "put",
      "/project",
      JSON.stringify({
        iIDd: this.props.match.params.id,
        Status: 0,
        idAdmin: this.props.userData.userId,
      })
    ).then((data) => {
      this.props.history.push("/");
    });
  };
  render() {
    const { translate } = this.props;
    const tableRef = React.createRef();
    const tableRefInfoList = React.createRef();
    const tableRefInfoObject = React.createRef();
    const tableRefInfoBuildMaterials = React.createRef();

    /*
    setInterval(() => {
      tableRefInfoBuildMaterials.current.onQueryChange();
      tableRefInfoObject.current.onQueryChange();
      tableRef.current.onQueryChange();
      tableRefInfoList.current.onQueryChange();
    }, 36000);
*/
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

    const responseBuildingmaterials = (query) => {
      const body = {
        orderDirection: query.orderDirection ? query.orderDirection : "desc",
        orederFild: query.orderBy ? query.orderBy.field : "Project_ID",
        pageSize: query.pageSize ? query.pageSize : 5,
        pageNumber: query.page ? query.page : 0,
        search: query.search ? query.search : "",
        searchFields: [
          "ID",
          "Project_ID",
          "DataCreation",
          "buildingMaterials",
          "cost",
          "supplierBuildingMaterials",
        ],
        pojectId: this.props.match.params.id,
      };

      return new Promise((res, rej) => {
        Promise.all([
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/buildingmaterials?" + new URLSearchParams(body)
              ).then((data) => data)
            );
          }),
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/buildingmaterialsPage?" + new URLSearchParams(body)
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
    const responseObject = (query) => {
      const body = {
        orderDirection: query.orderDirection ? query.orderDirection : "desc",
        orederFild: query.orderBy ? query.orderBy.field : "Project_ID",
        pageSize: query.pageSize ? query.pageSize : 5,
        pageNumber: query.page ? query.page : 0,
        search: query.search ? query.search : "",
        searchFields: [
          "DataCreation",
          "nameConstruction",
          "description",
          "FullBuldingAdress",
        ],
        pojectId: this.props.match.params.id,
      };

      return new Promise((res, rej) => {
        Promise.all([
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/constructionprojects?" + new URLSearchParams(body)
              ).then((data) => data)
            );
          }),
          new Promise((res, rej) => {
            res(
              respons(
                "get",
                "/constructionprojectsPage?" + new URLSearchParams(body)
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
      <>
        {!this.state.load && (
          <div className="users">
            <div className="mb-3">
              {(this.state.Status == 1 || this.state.Status == 4) && (
                <div className="button-send">
                  {this.state.Status == 1 && (
                    <button
                      className="btn btn-primary check"
                      onClick={this.ToCheck}
                    >
                      {translate("ToCheck")}
                    </button>
                  )}
                  {this.state.Status == 1 && (
                    <button
                      className="ml-2 btn btn-primary check"
                      onClick={this.ToBack}
                    >
                      {translate("ToBack")}
                    </button>
                  )}
                  {this.state.Status == 4 && (
                    <button
                      className="btn btn-primary check"
                      onClick={this.Close}
                    >
                      {translate("Close")}
                    </button>
                  )}
                </div>
              )}
            </div>
            <Tabs
              variant="pills"
              defaultActiveKey="infoProject"
              id="user-tab"
              className="mb-3 tab-size"
              justify
              {...this.props}
            >
              <Tab eventKey="infoProject" title={translate("infoProject")}>
                <div className="m-4">
                  {this.state.infoDetails.LoginContactor &&
                    this.state.infoDetails.fullNameContactor && (
                      <div className="ml-3 my-3 row">
                        <span className="flex-50-row">
                          <b> {translate("loginContractor")}</b>:
                          {this.state.infoDetails.LoginContactor}
                        </span>
                        <span className="flex-50-row">
                          <b> {translate("fullNameContractor")}</b>:
                          {this.state.infoDetails.fullNameContactor}
                        </span>
                      </div>
                    )}
                  {this.state.infoDetails.EmailContactor &&
                    this.state.infoDetails.phoneNumberContactor && (
                      <div className="ml-3 my-3 row">
                        <span className="flex-50-row">
                          <b> {translate("phoneNumberContactor")}</b>:
                          {this.state.infoDetails.phoneNumberContactor}
                        </span>
                        <span className="flex-50-row">
                          <b> {translate("EmailContactor")}</b>:
                          {this.state.infoDetails.EmailContactor}
                        </span>
                      </div>
                    )}
                  {this.state.infoDetails.LoginCustomer &&
                    this.state.infoDetails.fullNameCustomer && (
                      <div className="ml-3 my-3 row">
                        <span className="flex-50-row">
                          <b> {translate("loginCustomer")}</b>:
                          {this.state.infoDetails.LoginCustomer}
                        </span>
                        <span className="flex-50-row">
                          <b> {translate("fullNameCustomer")}</b>:
                          {this.state.infoDetails.fullNameCustomer}
                        </span>
                      </div>
                    )}
                  {this.state.infoDetails.EmailCustomer &&
                    this.state.infoDetails.phoneNumberCustomer && (
                      <div className="ml-3 my-3 row">
                        <span className="flex-50-row">
                          <b> {translate("phoneNumberCustomer")}</b>:
                          {this.state.infoDetails.phoneNumberCustomer}
                        </span>
                        <span className="flex-50-row">
                          <b> {translate("EmailCustomer")}</b>:
                          {this.state.infoDetails.EmailCustomer}
                        </span>
                      </div>
                    )}
                  {this.state.infoDetails.LoginAdmin &&
                    this.state.infoDetails.fullNameAdministrator && (
                      <div className="ml-3 my-3  row">
                        <span className="flex-50-row">
                          <b> {translate("loginAdmin")}</b>:
                          {this.state.infoDetails.LoginAdmin}
                        </span>
                        <span className="flex-50-row">
                          <b> {translate("fullNameAdministrator")}</b>:
                          {this.state.infoDetails.fullNameAdministrator}
                        </span>
                      </div>
                    )}
                  {(this.state.infoDetails.phoneNumberAdmin ||
                    this.state.infoDetails.EmailAdmin) && (
                    <div className="ml-3 my-3  row">
                      <span className="flex-50-row">
                        <b> {translate("phoneNumberAdmin")}</b>:
                        {this.state.infoDetails.phoneNumberAdmin}
                      </span>
                      <span className="flex-50-row">
                        <b> {translate("EmailAdmin")}</b>:
                        {this.state.infoDetails.EmailAdmin}
                      </span>
                    </div>
                  )}
                  <div className="ml-3 my-3  row">
                    <span className="flex-50-row">
                      <b>
                        {translate("CommonApproximateConstructionEstimate")}
                      </b>
                      :
                      {
                        this.state.infoDetails
                          .CommonApproximateConstructionEstimate
                      }
                    </span>
                    <span className="flex-50-row">
                      <b> {translate("Status")}</b>:
                      {this.state.statusText[this.state.infoDetails.Status]}
                    </span>
                  </div>
                  <div className="ml-3 my-3  row">
                    <span className="flex-50-row">
                      <b> {translate("FullBuldingAdress")}</b>:
                      {this.state.infoDetails.FullBuldingAdress}
                    </span>
                    {this.state.infoDetails.ProjectClosingDate && (
                      <span className="flex-50-row">
                        <b>{translate("ProjectClosingDate")}</b>:
                        {this.state.infoDetails.ProjectClosingDate}
                      </span>
                    )}
                  </div>
                  {this.state.infoDetails.description && (
                    <div className="ml-3 my-3  row">
                      <span className="flex-50-row">
                        <b> {translate("descriptionProject")}</b>:
                        {this.state.infoDetails.description}
                      </span>
                    </div>
                  )}
                  {this.state.infoDetails.contractDoc && (
                    <div className="ml-3 my-3  row">
                      <span className="flex-50-row">
                        <b> {translate("contractDoc")}</b>:
                        <a
                          style={{ cursor: "pointer" }}
                          href={
                            process.env.BACKEND +
                            "/file?" +
                            new URLSearchParams({
                              contractDoc: this.state.infoDetails.contractDoc,
                            })
                          }
                        >
                          {translate("download")}
                        </a>
                      </span>
                    </div>
                  )}
                  <div className="btn btn-primary text-white ">
                    <PDFDownloadLink
                      className="text-white text-none-decorate"
                      fileName="Report.pdf"
                      document={<Report {...this.props} {...this.state} />}
                    >
                      {translate("report")}
                    </PDFDownloadLink>
                  </div>
                </div>
              </Tab>

              {this.state.Status == 2 && (
                <Tab
                  eventKey="offerredContractor"
                  title={translate("offerredContractor")}
                >
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
                        },
                        {
                          title: translate("descriptionProject"),
                          field: "description",
                          editable: "never",
                        },
                        {
                          title: translate("loginAdmin"),
                          field: "LoginAdministrator",
                          editable: "never",
                        },
                        {
                          title: translate("contractorSuggestedPrice"),
                          field: "ContractorSuggestedPrice",
                          editable: "never",
                          type: "currency",
                          currencySetting: { currencyCode: "UAH" },
                        },
                      ]}
                      data={response}
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
                        exportButton: true,
                        actionsColumnIndex: -1,
                      }}
                    />
                  </div>
                </Tab>
              )}
              <Tab eventKey="ListWork" title={translate("ListWork")}>
                <div className="m-4">
                  <MaterialTable
                    icons={tableIcons}
                    tableRef={tableRefInfoList}
                    title={translate("ListWork")}
                    columns={[
                      {
                        title: translate("DateCreation"),
                        field: "DateCreation",
                        editable: "never",
                        type: "datetime",
                      },
                      {
                        title: translate("TypeWork"),
                        field: "TypeWork",
                        editable: "never",
                      },
                      {
                        title: translate("ScopeWork"),
                        field: "ScopeWork",
                        editable: "never",
                      },
                      {
                        title: translate("PlaceConstructionWorks"),
                        field: "PlaceConstructionWorks",
                        editable: "never",
                      },
                      {
                        title: translate("ApproximateConstructionEstimate"),
                        field: "ApproximateConstructionEstimate",
                        editable: "never",
                        type: "currency",
                        currencySetting: { currencyCode: "UAH" },
                      },
                    ]}
                    data={responseListWork}
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
                      exportButton: true,
                      actionsColumnIndex: -1,
                    }}
                  />
                </div>
              </Tab>
              <Tab
                eventKey="buildingmaterials"
                title={translate("buildingmaterials")}
              >
                <div className="m-4">
                  <MaterialTable
                    icons={tableIcons}
                    tableRef={tableRefInfoBuildMaterials}
                    title={translate("buildingmaterialsList")}
                    columns={[
                      {
                        title: translate("buildingmaterialName"),
                        field: "buildingMaterials",
                        align: "center",
                      },
                      {
                        title: translate("volume"),
                        field: "volume",
                        align: "center",
                      },
                      {
                        title: translate("supplierBuildingMaterials"),
                        field: "supplierBuildingMaterials",
                        align: "center",
                      },
                      {
                        title: translate("cost"),
                        field: "cost",
                        align: "center",
                        type: "numeric",
                        type: "currency",
                        currencySetting: { currencyCode: "UAH" },
                      },
                    ]}
                    data={responseBuildingmaterials}
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
                      exportButton: true,
                      actionsColumnIndex: -1,
                    }}
                  />
                </div>
              </Tab>
              <Tab
                eventKey="constructionprojects"
                title={translate("constructionprojects")}
              >
                <div className="m-4">
                  <MaterialTable
                    icons={tableIcons}
                    tableRef={tableRefInfoObject}
                    title={translate("constructionprojects")}
                    columns={[
                      {
                        title: translate("nameConstruction"),
                        field: "nameConstruction",
                        align: "center",
                      },
                      {
                        title: translate("description"),
                        field: "description",
                        align: "center",
                      },
                      {
                        title: translate("FullBuldingAdress"),
                        field: "FullBuldingAdress",
                        align: "center",
                      },
                    ]}
                    data={responseObject}
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
                          this.onRowDeleteObject(dat);
                          tableRefInfoObject.current.onQueryChange();
                          res();
                        }),
                      onRowUpdate: (dat) =>
                        new Promise((res, rej) => {
                          this.onRowUpdateObject(dat);
                          tableRefInfoObject.current.onQueryChange();
                          res();
                        }),
                      onRowAdd: (dat) =>
                        new Promise((res, rej) => {
                          if (this.state.Status < 1) {
                            this.onRowCreateObject(dat);
                            tableRefInfoObject.current.onQueryChange();
                            res();
                          } else {
                            Swal.fire({
                              showConfirmButton: true,
                              text: this.props.translate("StatusNotCreate"),
                            });
                            rej();
                          }
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
                      exportButton: true,
                      actionsColumnIndex: -1,
                    }}
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(withTranslate(projectDeteils));
