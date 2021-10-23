import React from "react";
import Header from "../../components/header";
import {
  InputGroup,
  InputGroupText,
  Input,
  Col,
  Row,
  Button,
  Container,
  Label,
} from "reactstrap";
import "../Home/style.css";
import Swal from "sweetalert2";
import { Route, Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase, { db } from "../../config/firebase";
const ShowDetail = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [imageUrl, setimageUrl] = useState([]);
  const [bool, setBool] = useState(false);
  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("user-edit-id"));
    console.log(get);
    db.collection("user-details")
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          if (doc.id === get) {
            setData(doc.data());
            setimageUrl(doc.data().imageurl);
          }
        });
      });
  
  }, []);
//   console.log(imageUrl);
const edit = () => {
    setBool(true);
    console.log(imageUrl);
}


  return (
    <div>
      <Header />

      <div className="mt-4">
        <Container>
          {bool === false ? (
            <div>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <Input value={data.title} disabled placeholder="Title" />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <InputGroup>
                    <Input value={data.date} disabled type="date" />
                  </InputGroup>
                </Col>
              </Row>

              <Row className="py-4">
                <Col md={6}>
                  {" "}
                  <InputGroup>
                    <InputGroupText>@</InputGroupText>

                    <Input
                      value={data.description}
                      disabled
                      placeholder="Description"
                      type="textarea"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Button
                    className="btn-add-detail m-auto"
                    color="outline-primary"
                    onClick={edit}
                  >
                    EDIT
                  </Button>
                </Col>
              </Row>
              <Row>
                {imageUrl.map((item) => {
                  return (
                    <Col md={4} className="mt-4">
                      <img src={item} class="img-thumbnail" height={200} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          ) : (
            <div>
              <Row>
                <Col md={6}>
                  <InputGroup>
                    <Input value={data.title} placeholder="Title" />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <InputGroup>
                    <Input value={data.date} type="date" />
                  </InputGroup>
                </Col>
              </Row>

              <Row className="py-4">
                <Col md={6}>
                  {" "}
                  <InputGroup>
                    <InputGroupText>@</InputGroupText>

                    <Input
                      value={data.description}
                      placeholder="Description"
                      type="textarea"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Button
                    className="btn-add-detail m-auto"
                    color="outline-primary"
                  >
                    UPDATE
                  </Button>
                </Col>
              </Row>
              <Row>
                {imageUrl.map((item) => {
                  return (
                    <Col md={4} className="mt-4">
                      <img src={item} class="img-thumbnail" height={200} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};
export default ShowDetail;
