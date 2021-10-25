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


function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  let history = useHistory();
  const loginUser = () => {
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
     
      localStorage.setItem("user-sign-in",JSON.stringify(userCredential.user.uid))
      history.push("/Index");
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Not a user",
        showConfirmButton: false,
        timer: 1500,
      });
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  };

  return (
 

      <Container>
        <br/>
        <br/>
          <h1 className="login-h1">SIGN-IN</h1>
          <Row>
          </Row>
        <div className="login-row m-auto">
          <Row >
            <Col md={12}>
              <Label>Email</Label>
              <InputGroup className="mt-2">
                <Input
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  type="email"
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
            <Col md={8}>
            not a user? <a href="/sign-up">click here</a> to register
            </Col>
            <Col md={4}>
              <Button color="outline-success" onClick={loginUser}>
                Login
              </Button>{" "}
            </Col>
          </Row>
        </div>
      </Container>

  );
}

export default SignIn;
