import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
} from "@react-pdf/renderer";
import { respons } from "../../servises";

const Pdf = (props) => {
  const [project, setProject] = useState(null);
  const [list, setList] = useState(null);
  const [material, setMaterial] = useState(null);
  const [object, setObject] = useState(null);
  const [load, setLoad] = useState(true);

  const statusText = {
    0: props.translate("settingProject"),
    1: props.translate("waitCheck"),
    2: props.translate("seachContractor"),
    3: props.translate("bulding"),
    4: props.translate("waitClosing"),
    5: props.translate("projectClosing"),
  };
  useEffect(async () => {
    await respons(
      "get",
      "/projectDeteils?" + new URLSearchParams({ id: props.match.params.id })
    ).then((data) => {
      setProject(data);
    });

    const body = {
      orderDirection: "desc",
      orederFild: "Project_ID",
      pageSize: 15,
      pageNumber: 0,
      search: "",
      searchFields: [
        "Project_ID",
        "DateCreation",
        "TypeWork",
        "ScopeWork",
        "PlaceConstructionWorks",
        "ApproximateConstructionEstimate",
      ],
      pojectId: props.match.params.id,
    };

    await respons(
      "get",
      "/listconstructionworksProject?" + new URLSearchParams(body)
    ).then((data) => setList(data));

    const responseBuildingmaterials = {
      orderDirection: "desc",
      orederFild: "Project_ID",
      pageSize: 15,
      pageNumber: 0,
      search: "",
      searchFields: [
        "ID",
        "Project_ID",
        "DataCreation",
        "buildingMaterials",
        "cost",
        "supplierBuildingMaterials",
        "volume",
      ],
      pojectId: props.match.params.id,
    };

    await respons(
      "get",
      "/buildingmaterials?" + new URLSearchParams(responseBuildingmaterials)
    ).then((data) => setMaterial(data));

    const responseObject = {
      orderDirection: "desc",
      orederFild: "Project_ID",
      pageSize: 15,
      pageNumber: 0,
      search: "",
      searchFields: [
        "DataCreation",
        "nameConstruction",
        "description",
        "FullBuldingAdress",
      ],
      pojectId: props.match.params.id,
    };

    await respons(
      "get",
      "/constructionprojects?" + new URLSearchParams(responseObject)
    ).then((data) => setObject(data));

    setLoad(false);
  }, []);

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "../../../public/fonts/Roboto/Roboto-Regular.ttf",
        fontStyle: "normal",
        fontWeight: "normal",
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: "12px",
      paddingLeft: "75px",
      paddingRight: "56px",
      paddingTop: "56px",
      paddingBottom: "56px",
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableHeader: {
      backgroundColor: "#f0f0f0",
      fontWeight: "bold",
    },
    tableCell: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      padding: 5,
    },
    tableCellObject: {
      width: "33.33%",
      borderStyle: "solid",
      borderWidth: 1,
      padding: 5,
    },
  });
  const { translate } = props;

  return (
    <Document>
      {!load && (
        <>
          <Page size="A4" style={styles.page}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Roboto",
              }}
            >{`Звіт`}</Text>
            <Text
              style={{
                marginTop: "10px",
                textAlign: "center",
                fontFamily: "Roboto",
              }}
            >
              {`Звіт зроблений: ${new Date().toLocaleDateString()} року`}
            </Text>
            <Text
              style={{
                marginTop: "10px",
                textAlign: "center",
                fontFamily: "Roboto",
              }}
            >
              {`Коротка інформація про проект`}
            </Text>
            {project.fullNameContactor && (
              <>
                <Text>
                  {translate("fullNameContractor")}:{project.fullNameContactor}
                </Text>
              </>
            )}
            {project.EmailContactor && project.phoneNumberContactor && (
              <>
                <Text>
                  {translate("phoneNumberContactor")}:
                  {project.phoneNumberContactor}
                </Text>
                <Text>
                  {translate("EmailContactor")}:{project.EmailContactor}
                </Text>
              </>
            )}
            {project.LoginCustomer && (
              <>
                <Text>
                  {translate("fullNameCustomer")}:{project.fullNameCustomer}
                </Text>
              </>
            )}
            {project.EmailCustomer && project.phoneNumberCustomer && (
              <>
                <Text>
                  {translate("phoneNumberCustomer")}:
                  {project.phoneNumberCustomer}
                </Text>
                <Text>
                  {translate("EmailCustomer")}:{project.EmailCustomer}
                </Text>
              </>
            )}
            {project.fullNameAdministrator && (
              <>
                <Text>
                  {translate("fullNameAdministrator")}:
                  {project.fullNameAdministrator}
                </Text>
              </>
            )}
            {(project.phoneNumberAdmin || project.EmailAdmin) && (
              <>
                <Text>
                  {translate("phoneNumberAdmin")}:{project.phoneNumberAdmin}
                </Text>
                <Text>
                  {translate("EmailAdmin")}:{project.EmailAdmin}
                </Text>
              </>
            )}
            <>
              <Text>
                {translate("CommonApproximateConstructionEstimate")}:
                {project.CommonApproximateConstructionEstimate}
              </Text>
              <Text>
                {translate("Status")}:{statusText[props.Status]}
              </Text>
            </>
            <>
              <Text>
                {translate("FullBuldingAdress")}:{project.FullBuldingAdress}
              </Text>
              {project.ProjectClosingDate && (
                <Text>
                  {translate("ProjectClosingDate")}:{project.ProjectClosingDate}
                </Text>
              )}
              <Text
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                Список бідівельних робіт
              </Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Тип роботи</Text>
                  <Text style={styles.tableCell}>Об'єм роботи</Text>
                  <Text style={styles.tableCell}>Місце будівельних робіт</Text>
                  <Text style={styles.tableCell}>
                    Кошторис будівельних робіт
                  </Text>
                </View>
                {list.map((item) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.TypeWork}</Text>
                    <Text style={styles.tableCell}>{item.ScopeWork}</Text>
                    <Text style={styles.tableCell}>
                      {item.PlaceConstructionWorks}
                    </Text>
                    <Text style={styles.tableCell}>
                      {item.ApproximateConstructionEstimate}
                    </Text>
                  </View>
                ))}
              </View>
              <Text
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                Будівельні матеріали
              </Text>

              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Тип роботи</Text>
                  <Text style={styles.tableCell}>Об'єм роботи</Text>
                  <Text style={styles.tableCell}>Місце будівельних робіт</Text>
                  <Text style={styles.tableCell}>
                    Кошторис будівельних робіт
                  </Text>
                </View>
                {material.map((item) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>
                      {item.buildingMaterials}
                    </Text>
                    <Text style={styles.tableCell}>{item.volume}</Text>
                    <Text style={styles.tableCell}>
                      {item.supplierBuildingMaterials}
                    </Text>
                    <Text style={styles.tableCell}>{item.cost}</Text>
                  </View>
                ))}
              </View>
              <Text
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                Об'єкти будівництва
              </Text>

              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCellObject}>Об'єкт будівництва</Text>
                  <Text style={styles.tableCellObject}>Опис Об'єкту</Text>
                  <Text style={styles.tableCellObject}>
                    Повна адреса об'єкту
                  </Text>
                </View>
                {object.map((item) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCellObject}>
                      {item.nameConstruction}
                    </Text>
                    <Text style={styles.tableCellObject}>
                      {item.description}
                    </Text>
                    <Text style={styles.tableCellObject}>
                      {item.FullBuldingAdress}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          </Page>
        </>
      )}
    </Document>
  );
};

export default Pdf;
