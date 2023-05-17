import MaterialTable from "material-table";
import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { respons } from "../../servises";
import Swal from "sweetalert2";

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

export class admin extends Component {
  constructor(props) {
    super(props);
  }

  onRowDelete = (dat) => {
    respons("delete", "/admin", JSON.stringify(dat));
  };

  onRowUpdate = (dat) => {
    if (dat.PhoneNumber.length > 9 && 12 > dat.PhoneNumber.length) {
      respons("put", "/admin", JSON.stringify(dat));
    } else {
      Swal.fire(this.props.translate("errorNumberPhone"));
    }
  };

  onRowCreate = (dat) => {
    if (dat.PhoneNumber.length > 9 && 12 > dat.PhoneNumber.length) {
      const password = Math.random().toString(36).slice(2, 8);
      respons(
        "post",
        "/admin",
        JSON.stringify({ ...dat, Role: "admin", Password: password })
      ).then((data) => {
        if (data) {
          Swal.fire(this.props.translate("yourPassword") + password);
        }
      });
    } else {
      Swal.fire(this.props.translate("errorNumberPhone"));
    }
  };

  render() {
    const { translate } = this.props;
    const tableRef = React.createRef();

    const response = (query) => {
      const body = {
        orderDirection: query.orderDirection ? query.orderDirection : "desc",
        orederFild: query.orderBy ? query.orderBy.field : "Login",
        pageSize: query.pageSize ? query.pageSize : 5,
        pageNumber: query.page ? query.page : 0,
        search: query.search ? query.search : "",
        searchFields: ["PIB", "phoneNumber", "Email", "Login"],
      };

      return new Promise((res, rej) => {
        Promise.all([
          new Promise((res, rej) => {
            res(
              respons("get", "/admin?" + new URLSearchParams(body)).then(
                (data) => data
              )
            );
          }),
          new Promise((res, rej) => {
            res(respons("get", "/adminPage").then((data) => data));
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
          title={translate("administrator")}
          columns={[
            { title: translate("PIB"), field: "PIB" },
            { title: translate("phoneNumber"), field: "PhoneNumber" },
            { title: translate("email"), field: "Email" },
            { title: translate("loginAdmin"), field: "Login" },
          ]}
          data={response}
          editable={{
            onRowDelete: (dat) =>
              new Promise((res, rej) => {
                this.onRowDelete(dat);
                tableRef.current.onQueryChange();
                res();
              }),
            onRowUpdate: (dat) =>
              new Promise((res, rej) => {
                this.onRowUpdate(dat);
                tableRef.current.onQueryChange();
                res();
              }),
            onRowAdd: (dat) =>
              new Promise((res, rej) => {
                this.onRowCreate(dat);
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
    );
  }
}

export default withTranslate(admin);
