import React, { useEffect, useRef, useState } from "react";
import { Avatar, Container, Grid, TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
import { respons } from "../../servises";
import Swal from "sweetalert2";

const Message = (props) => {
  const { translate, userData } = props;
  const [value, setValue] = useState("");
  const [message, setMessage] = useState();
  const ref = useRef();
  useEffect(() => {
    getMes();
    setInterval(() => {
      getMes();
    }, 18000);
  }, []);

  const getMes = () => {
    respons(
      "get",
      "/messageByproject?" + new URLSearchParams({ id: props.match.params.id })
    )
      .then((data) => {
        setMessage(data);
      })
      .then(() => {
        ref.current.scrollTop = ref.current?.scrollHeight;
      });
  };

  const sendMessage = async () => {
    if (value.length > 0) {
      respons(
        "post",
        "/message",
        JSON.stringify({
          text: value,
          userReceiverId: props.idSend,
          userAuthorId: props.userData.userId,
          projectId: props.match.params.id,
        })
      ).then((res) => {
        getMes();
      });
      setValue("");
    } else {
      Swal.fire(translate("errorMessageText"));
    }
  };
  return (
    <>
      {props.idSend && props.Status > 2 && (
        <Container>
          <Grid
            container
            justify="center"
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div
              ref={ref}
              style={{
                width: "80%",
                height: "70vh",
                border: "1px solid gray",
                overflowY: "auto",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              {message?.map((mes) => (
                <div
                  style={{
                    margin: "10px",
                  }}
                >
                  <Grid
                    container
                    style={{
                      justifyContent:
                        mes.userAuthorId == props.userData.userId
                          ? "end"
                          : "start",
                    }}
                  >
                    <div
                      style={{
                        order:
                          mes.userAuthorId == props.userData.userId ? 3 : 2,
                        alignSelf: "center",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      {mes.userAuthorId !== props.userData.userId
                        ? mes.Author + ": "
                        : ""}
                      {mes.text}
                    </div>
                    <Avatar
                      style={{
                        order:
                          mes.userAuthorId == props.userData.userId ? 3 : 1,
                      }}
                    />
                  </Grid>
                </div>
              ))}
            </div>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="flex-end"
              style={{
                width: "80%",
              }}
            >
              <TextField
                fullWidth
                rowsMax={2}
                variant="outlined"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <Button
                style={{
                  marginTop: "2rem",
                }}
                onClick={sendMessage}
              >
                {translate("send")}
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Message;
