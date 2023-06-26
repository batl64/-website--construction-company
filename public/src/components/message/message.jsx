import React, { useEffect, useRef, useState } from "react";
import { Avatar, Container, Grid, TextField } from "@material-ui/core";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { respons } from "../../servises";
import Swal from "sweetalert2";

const Message = (props) => {
  const { translate, userData } = props;

  return (
    <div className="mt-5 mx-4">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">First tab content</Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Message;
