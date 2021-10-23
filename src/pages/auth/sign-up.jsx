import "./style.css";
import Swal from "sweetalert2";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Table,
  Col,
  Row,
  Container,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import firebase, { db } from "../../config/firebase";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  let history = useHistory();
  const loginUser = () => {
    if (name != "" || email != "" || pass != "") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
          // Signed in
          // console.log(userCredential.user.uid);
          db.collection("users")
            .add({
              userid: userCredential.user.uid,
              name: name,
              email: email,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "User registered successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/")
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Feilds must not be empty",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    // if (name == username && pass == userPass) {
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "User Logged In",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   history.push("/index");
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "incorrect Username or Password!",
    //     footer: '<a href="">Why do I have this issue?</a>',
    //   });
    // }
  };

  return (
    <Container>
      <br />
      <br />
      <h1 className="sign-up-h1">SIGN-UP</h1>
      <Row></Row>
      <div className="sign-up-row m-auto">
        <Row>
          <Col md={12}>
            <Label>Username</Label>
            <InputGroup className="mt-2">
              <Input
                onChange={(event) => setName(event.target.value)}
                placeholder="username"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Label>Email</Label>

            <InputGroup className="mt-2">
              <Input
                type="Email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Label>Password</Label>

            <InputGroup className="mt-2">
              <Input
                type="password"
                onChange={(event) => setPass(event.target.value)}
                placeholder="Password"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Button color="outline-success" onClick={loginUser}>
              Login
            </Button>{" "}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default SignUp;
