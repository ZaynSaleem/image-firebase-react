import "../../App.css";
import "../Detail/style.css";
import Swal from "sweetalert2";
import { FaUserPlus, FaPlus, FaTrashAlt, FaRegEdit } from "react-icons/fa";

import {
  InputGroup,
  InputGroupText,
  Input,
  Table,
  Col,
  Row,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import Header from "../../components/header";
import { Route, Link , useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import firebase, { db } from "../../config/firebase";

const AddDetail = () => {
  let history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState([]);
  const [userId, setUserId] = useState("");
  const [urls, setUrls] = useState([]);
  const [bool, setBool] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  let arr = [];
  useEffect(() => {
    arr = [];
    let get = JSON.parse(localStorage.getItem("user-sign-in"));
    setUserId(get);
  }, []);

  const handleImage = (e) => {
    // console.log(e.target.files);
    // let imgArr = [];
    // let imgUrls = [];
    // let u = URL.createObjectURL(e.target.files[0].name);

    // console.log(u);
    for (let i = 0; i < e.target.files.length; i++) {
      // imgArr.push(e.target.files[i]);
      let newImage = e.target.files[i];
      setImage((previmg) => [...previmg, newImage]);
    }
    // console.log(imgArr);

    // console.log(imgUrls);
  };
  let i = 0;
  let num = Math.ceil(Math.random() * 100);
  // console.log(imagePreview);

  const addImage = () => {
    if (title === "" || description === "" || date === "" || !image.length ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please add data",
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    } 
    else{

   
    setBool(true);
    // console.log(image[i].name+""+image.length);
    let storageRef = firebase.storage().ref("images/" + image[i].name + num);
    storageRef.put(image[i]).then(function () {
      storageRef.getDownloadURL().then(function (url) {
        arr.push(url);
        if (i + 1 < image.length) {
          i++;
          addImage();
        } else {
          i = 0;
          console.log("added");
          console.log(arr);
        
          db.collection("user-details")
            .add({
              userid: userId,
              title: title,
              description: description,
              date: date,
              imageurl: arr,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Added details successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setBool(false);
          history.push("/Index")
        }
      });
    });
  }

  };

  const addDetail = () => {
    addImage();
    // if (arr.length) {

    //   console.log(arr);
    // }
  };

  let count = 0;
  return (
    <div className="App">
      <Header />

      <div className="mt-4">
        <Container>
          <div className="addDetailBox">
          <Row>
            <Col md={6}>
              <InputGroup>
              <InputGroupText>TITLE</InputGroupText>

                <Input
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title"
                />
              </InputGroup>
            </Col>

            <Col md={6}>
              <InputGroup>
              <InputGroupText>DATE</InputGroupText>

                <Input
                  type="date"
                  onChange={(event) => setDate(event.target.value)}
                  value={date}
                />
              </InputGroup>
            </Col>
          </Row>

          <Row className="py-4">
            <Col md={6}>
              {" "}
              <InputGroup>
                <InputGroupText>DESC</InputGroupText>

                <Input
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Description"
                  type="textarea"
                  value={description}
                />
              </InputGroup>
            </Col>

            <Col md={6}>
              <Label>
                <h6>Choose Image</h6>
              </Label>
              <InputGroup>
                <Input
                  type="file"
                  onChange={handleImage}
                  multiple
                  placeholder="choo"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {bool === false ? (
                <Button
                  onClick={addDetail}
                  className="btn-add-detail"
                  color="outline-success"
                >
                  Add
                </Button>
              ) : (
                <Button
                  className="btn-add-detail"
                  color="outline-success"
                  disabled
                >
                  Adding
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                </Button>
              )}
            </Col>
          </Row>
          {/* <Row>
            {image.length
              ? image.map((item, index) => {
                  console.log(item.name);
                  return (
                    <Col md={4}>
                      <img src={item.name} />
                    </Col>
                  );
                })
              : console.log("No Data")}
          </Row> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddDetail;
