import MaterialTable from "material-table";
import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { respons, upload } from "../../../servises";
import "./Customer.css";
import { forwardRef } from "react";
import Message from "../../message/messageProject.jsx";
import { Tab, Tabs } from "react-bootstrap";

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
import Pdf from "../../pdf/pdf.jsx";
import Report from "../../pdf/pdfReport.jsx";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import Footer from "../../../components/footer/Footer.jsx";

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
      load: true,
      doc: false,
      blob: null,
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
    this.setState({ Status: 4 });
    Swal.fire({
      showConfirmButton: true,
      text: this.props.translate("CloseInfo"),
    });
  };
  sendCancelClose = () => {
    respons(
      "put",
      "/projectCkeck",
      JSON.stringify({ id: this.props.match.params.id, status: 3 })
    );

    this.setState({ Status: 3 });
    Swal.fire({
      showConfirmButton: true,
      text: this.props.translate("CloseCancelInfo"),
    });
  };
  sendBack = () => {
    respons(
      "put",
      "/projectCkeck",
      JSON.stringify({ id: this.props.match.params.id, status: 0 })
    );
    this.setState({ Status: 0 });
    Swal.fire({
      showConfirmButton: true,
      text: this.props.translate("ProjectBack"),
    });
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

  onRowCreateObject = (dat) => {
    respons(
      "post",
      "/constructionprojects",
      JSON.stringify({ ...dat, Project_ID: this.props.match.params.id })
    );
  };
  onRowUpdateObject = (dat) => {
    respons("put", "/constructionprojects", JSON.stringify(dat));
  };
  onRowDeleteObject = (dat) => {
    const body = {
      id: dat.ID,
    };
    respons("delete", "/constructionprojects", JSON.stringify(body));
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
    this.setState({ doc: true });
  };
  componentDidUpdate() {
    if (this.state.doc) {
      const file = new File([this.state.blob], "filename.pdf", {
        type: "application/pdf",
      });
      const formData = new FormData();
      formData.append("file", file);
      upload(
        "post",
        "/upload?" + new URLSearchParams({ id: this.props.match.params.id }),
        formData
      );
    }
  }

  render() {
    const { translate } = this.props;
    const tableRef = React.createRef();
    const tableRefInfoList = React.createRef();
    const tableRefInfoObject = React.createRef();
    const tableRefInfoBuildMaterials = React.createRef();
    /* 
    setInterval(() => {
      if (tableRefInfoBuildMaterials.current) {
        tableRefInfoBuildMaterials.current.onQueryChange();
      }
      if (tableRefInfoObject.current) {
        tableRefInfoObject.current.onQueryChange();
      }
      if (tableRef.current) {
        tableRef.current.onQueryChange();
      }
      if (tableRefInfoList.current) {
        tableRefInfoList.current.onQueryChange();
      }
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
            {(this.state.Status == 0 ||
              this.state.Status == 3 ||
              this.state.Status == 4 ||
              this.state.Status == 2) && (
              <div className="button-send mb-3">
                {this.state.Status == 0 && (
                  <button
                    className="btn btn-primary check"
                    onClick={this.sendCheck}
                  >
                    {translate("sendToCheck")}
                  </button>
                )}
                {this.state.Status == 3 && (
                  <>
                    <button
                      className="btn btn-primary check"
                      onClick={this.sendClose}
                    >
                      {translate("sendClose")}
                    </button>
                  </>
                )}
                {this.state.Status == 4 && (
                  <>
                    <button
                      className="btn btn-primary check"
                      onClick={this.sendCancelClose}
                    >
                      {translate("sendCancelClose")}
                    </button>
                  </>
                )}
                {this.state.doc && (
                  <>
                    <BlobProvider
                      document={<Pdf {...this.props} {...this.state} />}
                    >
                      {({ blob, url, loading, error }) => {
                        if (this.state.blob !== blob) {
                          this.setState({ blob: blob });
                        }
                        return null;
                      }}
                    </BlobProvider>
                    <button
                      className="btn btn-primary check"
                      onClick={this.sendBack}
                    >
                      {translate("sendBack")}
                    </button>
                  </>
                )}
              </div>
            )}

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
                      {this.state.statusText[this.state.Status]}
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
                          align: "center",
                        },
                        {
                          title: translate("descriptionProjectOffer"),
                          field: "description",
                          editable: "never",
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
                </Tab>
              )}
              <Tab eventKey="listWork" title={translate("listWork")}>
                <div className="m-4">
                  <MaterialTable
                    icons={tableIcons}
                    tableRef={tableRefInfoList}
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
                          tableRefInfoList.current.onQueryChange();
                          res();
                        }),
                      onRowUpdate: (dat) =>
                        new Promise((res, rej) => {
                          this.onRowUpdateList(dat);
                          tableRefInfoList.current.onQueryChange();
                          res();
                        }),
                      onRowAdd: (dat) =>
                        new Promise((res, rej) => {
                          if (this.state.Status < 1) {
                            this.onRowCreateList(dat);
                            tableRefInfoList.current.onQueryChange();
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
              {this.state.Status > 2 && (
                <Tab eventKey="chat" title={translate("chatInContractor")}>
                  <Message {...this.props} {...this.state} />
                </Tab>
              )}
            </Tabs>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(withTranslate(projectDeteils));
