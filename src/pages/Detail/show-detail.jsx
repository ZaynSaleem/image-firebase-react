import React from "react";
import Header from "../../components/header";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Col,
  Row,
  Button,
  Container,
  Label,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  CardImgOverlay,
  CardHeader,
} from "reactstrap";
import "../Home/style.css";
import Swal from "sweetalert2";
import { Route, Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase, { db } from "../../config/firebase";
import { FaTrashAlt, FaRegEdit, FaRegWindowClose } from "react-icons/fa";

const ShowDetail = () => {
  let history = useHistory();
  let arr = [];

  // const [data, setData] = useState([]);
  const [imageUrl, setimageUrl] = useState([]);
  const [bool, setBool] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState([]);
  const [btnBool, setBtnBool] = useState(false);
  useEffect(() => {
    let get = JSON.parse(localStorage.getItem("user-edit-id"));
    setId(get);
    console.log(get);
    db.collection("user-details")
      .get()
      .then((querysnapshot) => {
        querysnapshot.forEach((doc) => {
          if (doc.id === get) {
            setTitle(doc.data().title);
            setDate(doc.data().date);
            setDescription(doc.data().description);
            setimageUrl(doc.data().imageurl);
          }
        });
      });
    // arr.push(imageUrl);
  }, []);

  // console.log(imageUrl);
  const edit = () => {
    setBool(true);
    // console.log(imageUrl);
  };

  let i = 0;
  let num = Math.ceil(Math.random() * 100);

  const update = () => {
    if (title === "" || description === "" || date === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please add data",
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    } else {
      setBtnBool(true);
      if (image && image.length) {
        let storageRef = firebase
          .storage()
          .ref("images/" + image[i].name + num);
        storageRef.put(image[i]).then(function () {
          storageRef.getDownloadURL().then(function (url) {
            arr.push(url);
            if (i + 1 < image.length) {
              i++;
              update();
            } else {
              i = 0;
              console.log("added");
              console.log(arr);
              setimageUrl((prevurl) => [...prevurl, url]);
              db.collection("user-details")
                .doc(id)
                .update({
                  title: title,
                  description: description,
                  date: date,
                  imageurl: arr,
                })
                .then(() => {
                  // console.log("Document successfully updated!");
                  setBtnBool(false);
                  setBool(false);

                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Details updated",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                });
            }
          });
        });
      } else {
        db.collection("user-details")
          .doc(id)
          .update({
            title: title,
            description: description,
            date: date,
          })
          .then(() => {
            setBool(false);
            setBtnBool(false);

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Details updated",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      }
    }
  };

  const dltImg = (dlt) => {
    console.log(dlt);

    var desertRef = firebase.storage().refFromURL(dlt);
    desertRef
      .delete()
      .then(function () {
        console.log("Image Deleted Successfully");
      })
      .catch(function (error) {
        console.log(error + "Not Found !");
      });

    let dupdata = [...imageUrl];
    let updated = dupdata.filter((x) => {
      return x != dlt;
    });
    console.log(updated);
    setimageUrl(updated);
    db.collection("user-details").doc(id).update({
      imageurl: updated,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Image Deleted",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const dltAll = () => {
    if (imageUrl && imageUrl.length) {
      for (let i = 0; i < imageUrl.length; i++) {
        var desertRef = firebase.storage().refFromURL(imageUrl[i]);
        desertRef
          .delete()
          .then(function () {
            console.log("Image Deleted Successfully");
          })
          .catch(function (error) {
            console.log(error + "Not Found !");
          });
      }
    }

    db.collection("user-details")
      .doc(id)
      .delete()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Data Deleted",
          showConfirmButton: false,
          timer: 1000,
        });
        history.push("/Index");
      });
  };

  const handleImage = (e) => {
    if (image && image.length) {
      setImage([]);
    }
    for (let i = 0; i < e.target.files.length; i++) {
      let newImage = e.target.files[i];
      // console.log(newImage);
      // setImage
      setImage((previmg) => [...previmg, newImage]);
    }
  };

  return (
    <div>
      <Header />

      <div className="mt-4">
        <Container>
          <div className="showDetailBox">
            {bool === true ? (
              <Row>
                <Col md={6}>
                  <h4>USER DETAIL</h4>
                </Col>
                <Col md={6}>
                  <Button
                    disabled
                    color="outline-danger"
                    onClick={() => dltAll()}
                    className="dltAll"
                  >
                    Delete All
                  </Button>

                  {btnBool === false ? (
                    <Button
                      className="btn-add-detail ms-auto"
                      color="outline-success"
                      onClick={update}
                    >
                      UPDATE
                    </Button>
                  ) : (
                    <Button
                      className="btn-add-detail"
                      color="outline-success"
                      disabled
                    >
                      updating
                      <span className="spinner-border spinner-border-sm ms-2"></span>
                    </Button>
                  )}
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md={6}>
                  <h4>USER DETAIL</h4>
                </Col>
                <Col md={6}>
                  <Button
                    color="outline-danger"
                    onClick={() => dltAll()}
                    className="dltAll"
                  >
                    Delete All
                  </Button>

                  <Button
                    className="btn-add-detail"
                    color="outline-primary"
                    onClick={edit}
                  >
                    EDIT
                  </Button>
                </Col>
              </Row>
            )}
            {bool === false ? (
              <div className="showDetailInput mt-4">
                <Row>
                  <Col>
                    <InputGroup>
                      <InputGroupText>TITLE</InputGroupText>
                      <Input value={title} disabled placeholder="Title" />
                    </InputGroup>
                  </Col>

                  <Col md="auto">
                    <InputGroup>
                      <InputGroupText>DATE</InputGroupText>
                      <Input value={date} disabled type="date" />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    {" "}
                    <InputGroup>
                      <InputGroupText>DESC</InputGroupText>

                      <Input
                        value={description}
                        disabled
                        placeholder="Description"
                        type="textarea"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  {imageUrl && imageUrl.length ? (
                    imageUrl.map((item) => {
                      return (
                        <Col md={3}>
                          <div className="mt-4">
                            <Card>
                              <CardImg
                                top
                                width="100%"
                                height="150px"
                                src={item}
                                alt="Card image cap"
                              />
                              <CardImgOverlay>
                                <Button
                                  disabled
                                  color="danger"
                                  className="dltImg"
                                >
                                  <span>X</span>
                                </Button>
                              </CardImgOverlay>
                            </Card>
                          </div>
                        </Col>
                      );
                    })
                  ) : (
                    <Col>
                      <h5>No Image</h5>
                    </Col>
                  )}
                </Row>
              </div>
            ) : (
              <div className="showDetailInput">
                <Row>
                  <Col>
                    <InputGroup>
                      <InputGroupText>TITLE</InputGroupText>

                      <Input
                        // value={data.title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Title"
                      />
                    </InputGroup>
                  </Col>

                  <Col md="auto">
                    <InputGroup>
                      <InputGroupText>DATE</InputGroupText>
                      <Input
                        // value={data.date}
                        onChange={(event) => setDate(event.target.value)}
                        type="date"
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    {" "}
                    <InputGroup>
                      <InputGroupText>DESC</InputGroupText>

                      <Input
                        // value={data.description}
                        placeholder="Description"
                        type="textarea"
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </InputGroup>
                  </Col>

                  <Col md="auto" className="mt-2 fileSelect">
                    <InputGroup>
                      <Input type="file" onChange={handleImage} multiple />
                    </InputGroup>
                  </Col>
                </Row>

                <Row>
                  <Row>
                    {imageUrl.map((item) => {
                      arr.push(item);
                      return (
                        <Col md={3} className="mt-3">
                          <Card>
                            <CardImg
                              top
                              width="100%"
                              height="150px"
                              src={item}
                              alt="Card image cap"
                            />
                            <CardImgOverlay>
                              <Button color="danger" className="dltImg">
                                <span>X</span>
                              </Button>
                            </CardImgOverlay>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Row>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};
export default ShowDetail;
